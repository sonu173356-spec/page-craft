import { NextRequest, NextResponse } from 'next/server';
import { recordActivityLog } from '@/lib/logger';
import prisma from '@/lib/prisma';

export interface DIYBookProject {
  id: string;
  userId?: string;
  authorEmail: string;
  authorName: string;
  packageId: string;
  packageName: string;
  
  // Step 1: Book Info
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

  // Step 2: Book Specs
  trimSize: string; // e.g. "5x8", "6x9"
  pageCount: number;
  paperType: string; // "Cream" | "White"
  binding: string; // "Paperback" | "Hardcover"
  interiorType: string; // "Black & White" | "Full Color"
  coverType: string; // "Matte" | "Glossy"

  // Step 3: Cover
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

  // Step 4: Interior Manuscript
  manuscriptFileName?: string;
  manuscriptFileSize?: number;
  manuscriptFileUrl?: string;
  manuscriptPageCount?: number;
  manuscriptStatus?: 'uploaded' | 'validated' | 'warning';
  manuscriptIssues?: string[];

  // Step 5: Simple Editor Chapters
  chapters?: { id: string; title: string; content: string; wordCount: number }[];

  // Status & Meta
  progress: number;
  currentStep: number;
  status: 'Draft' | 'In Progress' | 'Ready for Review' | 'Submitted' | 'Under Review' | 'Approved' | 'In Production' | 'Published';
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

// In-memory persistent author project store
export const IN_MEMORY_PROJECTS: DIYBookProject[] = [
  {
    id: 'proj-001',
    authorEmail: 'author@pagecraft.com',
    authorName: 'Eleanor Vance',
    packageId: 'professional',
    packageName: 'Professional Publishing Plan',
    title: 'The Silent Echo of Whispers',
    subtitle: 'A Tale of Memories and Lost Solitude',
    penName: 'E. V. Vance',
    description: 'A poetic and emotional journey navigating personal grief, resilience, and rediscovery in the quiet highlands.',
    genre: 'Literary Fiction',
    language: 'English',
    isbn: '978-93-84729-10-4',
    edition: '1st Edition',
    copyrightHolder: 'Eleanor Vance 2026',
    publisherName: 'Page Craft Publishing',
    trimSize: '5x8',
    pageCount: 220,
    paperType: 'Cream',
    binding: 'Paperback',
    interiorType: 'Black & White',
    coverType: 'Matte',
    coverMode: 'template',
    coverTemplate: 'literary',
    coverFrontImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop',
    coverTitleFont: 'Playfair Display',
    coverFontSize: 28,
    coverFontColor: '#FDFAF6',
    coverBgColor: '#8B1A1A',
    coverAlignment: 'center',
    spineWidthMm: 12.5,
    manuscriptFileName: 'The_Silent_Echo_Manuscript_Final.pdf',
    manuscriptFileSize: 3450000,
    manuscriptFileUrl: '/uploads/sample_manuscript.pdf',
    manuscriptPageCount: 220,
    manuscriptStatus: 'validated',
    chapters: [
      { id: 'ch-1', title: 'Chapter 1: The Mountain Wind', content: 'The fog rolled across the heather before dawn, draping the quiet valley in a blanket of silence...', wordCount: 1850 },
      { id: 'ch-2', title: 'Chapter 2: Letters Unopened', content: 'On the mahogany writing desk lay seven envelopes, their wax seals still unbroken after three decades...', wordCount: 2140 },
    ],
    progress: 95,
    currentStep: 6,
    status: 'Ready for Review',
    validationResults: {
      titleCheck: true,
      authorCheck: true,
      pageSizeCheck: true,
      trimSizeCheck: true,
      coverResolutionCheck: true,
      spineCheck: true,
      bleedCheck: true,
      isReadyForSubmission: true,
    },
    lastSavedAt: new Date().toISOString(),
    createdAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'proj-002',
    authorEmail: 'author@pagecraft.com',
    authorName: 'Eleanor Vance',
    packageId: 'starter',
    packageName: 'Starter Publishing Plan',
    title: 'Midnight Verses & Shadows',
    subtitle: 'Contemporary Poetry Collection',
    penName: 'E. V. Vance',
    description: 'Anthology of short free-verse poems written under the starlit skies of the Himalayas.',
    genre: 'Poetry',
    language: 'English',
    isbn: '978-93-84729-11-1',
    edition: '1st Edition',
    copyrightHolder: 'Eleanor Vance 2026',
    publisherName: 'Page Craft Publishing',
    trimSize: '5x8',
    pageCount: 110,
    paperType: 'White',
    binding: 'Paperback',
    interiorType: 'Black & White',
    coverType: 'Glossy',
    coverMode: 'template',
    coverTemplate: 'minimalist',
    coverFrontImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
    coverTitleFont: 'Cinzel',
    coverFontSize: 24,
    coverFontColor: '#1A1A2E',
    coverBgColor: '#FDFAF6',
    coverAlignment: 'center',
    spineWidthMm: 6.2,
    manuscriptFileName: 'Midnight_Verses_Draft.pdf',
    manuscriptFileSize: 1200000,
    manuscriptPageCount: 110,
    manuscriptStatus: 'validated',
    chapters: [
      { id: 'ch-1', title: 'Part I: Starlight', content: 'We are but cosmic dust drifting in nocturnal oceans of quiet wonder...', wordCount: 950 },
    ],
    progress: 70,
    currentStep: 4,
    status: 'In Progress',
    validationResults: {
      titleCheck: true,
      authorCheck: true,
      pageSizeCheck: true,
      trimSizeCheck: true,
      coverResolutionCheck: true,
      spineCheck: true,
      bleedCheck: true,
      isReadyForSubmission: true,
    },
    lastSavedAt: new Date().toISOString(),
    createdAt: '2026-08-03T12:00:00.000Z',
  },
];

// GET: Fetch all projects or single project by id
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const projectId = url.searchParams.get('id');
  const email = url.searchParams.get('email');

  if (projectId) {
    const found = IN_MEMORY_PROJECTS.find((p) => p.id === projectId);
    if (!found) {
      return NextResponse.json({ error: 'Book project not found' }, { status: 404 });
    }
    return NextResponse.json({ project: found });
  }

  if (email) {
    const normalized = email.trim().toLowerCase();
    const userProjects = IN_MEMORY_PROJECTS.filter(
      (p) =>
        p.authorEmail.toLowerCase() === normalized ||
        (normalized.includes('author') && p.authorEmail.includes('author')) ||
        (normalized.includes('eleanor') && p.authorEmail.includes('author'))
    );
    return NextResponse.json({ projects: userProjects });
  }

  return NextResponse.json({ projects: IN_MEMORY_PROJECTS });
}

// POST: Save or autosave a DIY Book Project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      authorEmail = 'author@pagecraft.com',
      authorName = 'Author',
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

    const updatedProject: DIYBookProject = {
      id: projectId,
      authorEmail: String(authorEmail).trim().toLowerCase(),
      authorName,
      packageId,
      packageName,
      title,
      subtitle,
      penName: penName || authorName,
      description,
      genre,
      language,
      isbn: isbn || `978-93-${Math.floor(100000 + Math.random() * 900000)}`,
      edition,
      copyrightHolder: copyrightHolder || `${authorName} 2026`,
      publisherName,
      trimSize,
      pageCount: Number(pageCount) || 150,
      paperType,
      binding,
      interiorType,
      coverType,
      coverMode,
      coverTemplate,
      coverFrontImage,
      coverBackImage,
      coverFullJacket,
      coverTitleFont,
      coverFontSize,
      coverFontColor,
      coverBgColor,
      coverAlignment,
      spineWidthMm,
      manuscriptFileName,
      manuscriptFileSize,
      manuscriptFileUrl,
      manuscriptPageCount: Number(manuscriptPageCount) || Number(pageCount) || 150,
      manuscriptStatus,
      manuscriptIssues,
      chapters,
      progress: Math.min(100, Math.max(10, progress)),
      currentStep,
      status,
      validationResults: validationResults || {
        titleCheck: Boolean(title && title.length > 2),
        authorCheck: Boolean(authorName && authorName.length > 2),
        pageSizeCheck: true,
        trimSizeCheck: true,
        coverResolutionCheck: true,
        spineCheck: true,
        bleedCheck: true,
        isReadyForSubmission: Boolean(title && authorName),
      },
      reviewNotes,
      lastSavedAt: new Date().toISOString(),
      submittedAt: status === 'Submitted' || status === 'Under Review' ? new Date().toISOString() : undefined,
      createdAt: existingIndex >= 0 ? IN_MEMORY_PROJECTS[existingIndex].createdAt : new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      IN_MEMORY_PROJECTS[existingIndex] = updatedProject;
    } else {
      IN_MEMORY_PROJECTS.unshift(updatedProject);
    }

    // Attempt DB log
    try {
      await recordActivityLog({
        userId: 'author',
        userEmail: updatedProject.authorEmail,
        userRole: 'AUTHOR',
        action: status === 'Submitted' ? 'BOOK_SUBMITTED_FOR_REVIEW' : 'DIY_PROJECT_SAVED',
        details: `DIY Book "${updatedProject.title}" (${updatedProject.id}) ${status === 'Submitted' ? 'submitted for editorial review' : 'autosaved'}. Package: ${updatedProject.packageName}`,
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
        userAgent: req.headers.get('user-agent') || 'Browser',
      });
    } catch (logErr) {
      console.warn('Logging warning:', logErr);
    }

    return NextResponse.json({
      success: true,
      message: status === 'Submitted' ? 'Book project submitted for review!' : 'Book project saved successfully.',
      project: updatedProject,
    });
  } catch (err: any) {
    console.error('Project save error:', err);
    return NextResponse.json({ error: err.message || 'Failed to save project' }, { status: 500 });
  }
}

// DELETE: Delete project
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const projectId = url.searchParams.get('id');

  if (!projectId) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
  }

  const idx = IN_MEMORY_PROJECTS.findIndex((p) => p.id === projectId);
  if (idx === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const removed = IN_MEMORY_PROJECTS.splice(idx, 1);
  return NextResponse.json({ success: true, message: 'Project deleted', removed: removed[0] });
}
