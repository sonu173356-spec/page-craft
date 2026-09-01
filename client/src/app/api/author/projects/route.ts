import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest, isAuthorOrAdmin, isAdminRole } from '@/lib/auth';
import { recordActivityLog } from '@/lib/logger';
import { validateCsrfOrigin } from '@/lib/csrf';

export interface DIYBookProject {
  id: string;
  userId: string;
  authorEmail: string;
  authorName: string;
  packageId: string;
  packageName: string;
  title: string;
  subtitle?: string;
  penName?: string;
  description: string;
  genre: string;
  language: string;
  isbn?: string;
  edition?: string;
  copyrightHolder?: string;
  publisherName?: string;
  trimSize: string;
  pageCount: number;
  paperType: string;
  binding: string;
  interiorType: string;
  coverType: string;
  coverMode: 'template' | 'upload';
  coverTemplate?: string;
  coverFrontImage?: string;
  coverBackImage?: string;
  coverFullJacket?: string;
  coverTitleFont?: string;
  coverFontSize?: number;
  coverFontColor?: string;
  coverBgColor?: string;
  coverAlignment?: 'left' | 'center' | 'right';
  spineWidthMm?: number;
  manuscriptFileName?: string;
  manuscriptFileSize?: number;
  manuscriptFileUrl?: string;
  manuscriptPageCount?: number;
  manuscriptStatus?: 'uploaded' | 'validated' | 'warning';
  manuscriptIssues?: string[];
  chapters?: { id: string; title: string; content: string; wordCount: number }[];
  progress: number;
  currentStep: number;
  status:
    | 'Draft'
    | 'In Progress'
    | 'Ready for Review'
    | 'Submitted'
    | 'Under Review'
    | 'Approved'
    | 'In Production'
    | 'Published';
  validationResults?: {
    titleCheck: boolean;
    authorCheck: boolean;
    pageSizeCheck: boolean;
    trimSizeCheck: boolean;
    coverResolutionCheck: boolean;
    spineCheck: boolean;
    bleedCheck: boolean;
    isReadyForSubmission: boolean;
  };
  reviewNotes?: string;
  lastSavedAt: string;
  submittedAt?: string;
  createdAt: string;
}

// In-memory isolated store for author DIY projects
export const IN_MEMORY_PROJECTS: DIYBookProject[] = [];

// GET: Fetch projects for authenticated author only
export async function GET(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isAuthorOrAdmin(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const url = new URL(req.url);
  const projectId = url.searchParams.get('id');

  const sessionEmail = user.email.toLowerCase().trim();
  const sessionUserId = user.userId;
  const isSuperOrAdmin = isAdminRole(user.role);

  if (projectId) {
    const found = IN_MEMORY_PROJECTS.find((p) => p.id === projectId);
    if (!found) {
      return NextResponse.json({ error: 'Book project not found' }, { status: 404 });
    }

    // Access control: Only author owner or administrator may view
    if (!isSuperOrAdmin && found.userId !== sessionUserId && found.authorEmail.toLowerCase() !== sessionEmail) {
      return NextResponse.json({ error: 'Forbidden. You do not have access to this project.' }, { status: 403 });
    }

    return NextResponse.json({ project: found });
  }

  // List projects belonging strictly to this authenticated user (or all if administrator)
  const userProjects = isSuperOrAdmin
    ? IN_MEMORY_PROJECTS
    : IN_MEMORY_PROJECTS.filter(
        (p) => p.userId === sessionUserId || p.authorEmail.toLowerCase() === sessionEmail
      );

  return NextResponse.json({ projects: userProjects });
}

// POST: Save or submit a DIY Book Project (Enforces authenticated user ownership)
export async function POST(req: NextRequest) {
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json({ error: 'CSRF Origin Validation Failed' }, { status: 403 });
  }

  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isAuthorOrAdmin(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      id,
      packageId = 'professional',
      packageName = 'Professional Publishing Plan',
      title = 'Untitled Book Project',
      subtitle = '',
      penName = '',
      description = '',
      genre = 'Fiction',
      language = 'English',
      isbn = '',
      edition = '1st Edition',
      copyrightHolder = '',
      publisherName = 'Page Craft Publishing',
      trimSize = '5x8',
      pageCount = 150,
      paperType = 'Cream',
      binding = 'Paperback',
      interiorType = 'Black & White',
      coverType = 'Matte',
      coverMode = 'template',
      coverTemplate = 'literary',
      coverFrontImage = '',
      coverBackImage = '',
      coverFullJacket = '',
      coverTitleFont = 'Playfair Display',
      coverFontSize = 26,
      coverFontColor = '#FDFAF6',
      coverBgColor = '#8B1A1A',
      coverAlignment = 'center',
      spineWidthMm = 9.5,
      manuscriptFileName = '',
      manuscriptFileSize = 0,
      manuscriptFileUrl = '',
      manuscriptPageCount = 150,
      manuscriptStatus = 'validated',
      manuscriptIssues = [],
      chapters = [],
      progress = 20,
      currentStep = 1,
      status = 'Draft',
      validationResults,
      reviewNotes = '',
    } = body;

    const projectId = id || `proj-${Date.now().toString(36)}`;
    const existingIndex = IN_MEMORY_PROJECTS.findIndex((p) => p.id === projectId);

    // If updating an existing project, verify ownership
    if (existingIndex >= 0) {
      const existing = IN_MEMORY_PROJECTS[existingIndex];
      const isOwner =
        existing.userId === user.userId ||
        existing.authorEmail.toLowerCase() === user.email.toLowerCase();
      if (!isOwner && !isAdminRole(user.role)) {
        return NextResponse.json({ error: 'Forbidden. You do not own this project.' }, { status: 403 });
      }
    }

    const sanitizedTitle = String(title).slice(0, 200).trim() || 'Untitled Book Project';
    const sanitizedAuthorName = user.name;
    const sanitizedEmail = user.email.toLowerCase().trim();

    const updatedProject: DIYBookProject = {
      id: projectId,
      userId: user.userId,
      authorEmail: sanitizedEmail,
      authorName: sanitizedAuthorName,
      packageId: String(packageId).slice(0, 50),
      packageName: String(packageName).slice(0, 100),
      title: sanitizedTitle,
      subtitle: subtitle ? String(subtitle).slice(0, 200) : '',
      penName: penName ? String(penName).slice(0, 100) : sanitizedAuthorName,
      description: description ? String(description).slice(0, 2000) : '',
      genre: String(genre).slice(0, 50),
      language: String(language).slice(0, 50),
      isbn: isbn ? String(isbn).slice(0, 30) : undefined,
      edition: edition ? String(edition).slice(0, 50) : '1st Edition',
      copyrightHolder: copyrightHolder ? String(copyrightHolder).slice(0, 100) : `${sanitizedAuthorName} 2026`,
      publisherName: publisherName ? String(publisherName).slice(0, 100) : 'Page Craft Publishing',
      trimSize: String(trimSize).slice(0, 20),
      pageCount: Number(pageCount) || 150,
      paperType: String(paperType).slice(0, 30),
      binding: String(binding).slice(0, 30),
      interiorType: String(interiorType).slice(0, 30),
      coverType: String(coverType).slice(0, 30),
      coverMode: coverMode === 'upload' ? 'upload' : 'template',
      coverTemplate: coverTemplate ? String(coverTemplate).slice(0, 50) : 'literary',
      coverFrontImage: coverFrontImage ? String(coverFrontImage).slice(0, 500) : '',
      coverBackImage: coverBackImage ? String(coverBackImage).slice(0, 500) : '',
      coverFullJacket: coverFullJacket ? String(coverFullJacket).slice(0, 500) : '',
      coverTitleFont: coverTitleFont ? String(coverTitleFont).slice(0, 50) : 'Playfair Display',
      coverFontSize: Number(coverFontSize) || 26,
      coverFontColor: coverFontColor ? String(coverFontColor).slice(0, 20) : '#FDFAF6',
      coverBgColor: coverBgColor ? String(coverBgColor).slice(0, 20) : '#8B1A1A',
      coverAlignment: ['left', 'center', 'right'].includes(coverAlignment) ? coverAlignment : 'center',
      spineWidthMm: Number(spineWidthMm) || 9.5,
      manuscriptFileName: manuscriptFileName ? String(manuscriptFileName).slice(0, 200) : '',
      manuscriptFileSize: Number(manuscriptFileSize) || 0,
      manuscriptFileUrl: manuscriptFileUrl ? String(manuscriptFileUrl).slice(0, 500) : '',
      manuscriptPageCount: Number(manuscriptPageCount) || Number(pageCount) || 150,
      manuscriptStatus: ['uploaded', 'validated', 'warning'].includes(manuscriptStatus) ? manuscriptStatus : 'validated',
      manuscriptIssues: Array.isArray(manuscriptIssues) ? manuscriptIssues.slice(0, 10) : [],
      chapters: Array.isArray(chapters) ? chapters.slice(0, 50) : [],
      progress: Math.min(100, Math.max(10, Number(progress) || 10)),
      currentStep: Number(currentStep) || 1,
      status: ['Draft', 'In Progress', 'Ready for Review', 'Submitted', 'Under Review', 'Approved', 'In Production', 'Published'].includes(status)
        ? status
        : 'Draft',
      validationResults: validationResults || {
        titleCheck: Boolean(sanitizedTitle.length > 1),
        authorCheck: Boolean(sanitizedAuthorName.length > 1),
        pageSizeCheck: true,
        trimSizeCheck: true,
        coverResolutionCheck: true,
        spineCheck: true,
        bleedCheck: true,
        isReadyForSubmission: Boolean(sanitizedTitle && sanitizedAuthorName),
      },
      reviewNotes: reviewNotes ? String(reviewNotes).slice(0, 1000) : '',
      lastSavedAt: new Date().toISOString(),
      submittedAt: status === 'Submitted' || status === 'Under Review' ? new Date().toISOString() : undefined,
      createdAt: existingIndex >= 0 ? IN_MEMORY_PROJECTS[existingIndex].createdAt : new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      IN_MEMORY_PROJECTS[existingIndex] = updatedProject;
    } else {
      IN_MEMORY_PROJECTS.unshift(updatedProject);
    }

    await recordActivityLog({
      userId: user.userId,
      userEmail: user.email,
      userRole: user.role,
      action: status === 'Submitted' ? 'BOOK_SUBMITTED_FOR_REVIEW' : 'DIY_PROJECT_SAVED',
      details: `DIY Book "${updatedProject.title}" (${updatedProject.id}) saved.`,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      userAgent: req.headers.get('user-agent') || 'Browser',
    });

    return NextResponse.json({
      success: true,
      message: status === 'Submitted' ? 'Book project submitted for review!' : 'Book project saved successfully.',
      project: updatedProject,
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}

// DELETE: Delete project (Enforce owner authorization)
export async function DELETE(req: NextRequest) {
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json({ error: 'CSRF Origin Validation Failed' }, { status: 403 });
  }

  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const projectId = url.searchParams.get('id');

  if (!projectId) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
  }

  const idx = IN_MEMORY_PROJECTS.findIndex((p) => p.id === projectId);
  if (idx === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const existing = IN_MEMORY_PROJECTS[idx];
  const isOwner =
    existing.userId === user.userId ||
    existing.authorEmail.toLowerCase() === user.email.toLowerCase();

  if (!isOwner && !isAdminRole(user.role)) {
    return NextResponse.json({ error: 'Forbidden. You do not own this project.' }, { status: 403 });
  }

  const removed = IN_MEMORY_PROJECTS.splice(idx, 1);
  return NextResponse.json({ success: true, message: 'Project deleted', removed: removed[0] });
}
