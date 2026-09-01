import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest, isAuthorOrAdmin } from '@/lib/auth';
import { createGoogleDriveBookHierarchy } from '@/lib/googleDrive';
import { recordActivityLog } from '@/lib/logger';
import { validateCsrfOrigin } from '@/lib/csrf';

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
    const { bookTitle } = body;

    if (!bookTitle || typeof bookTitle !== 'string') {
      return NextResponse.json({ error: 'Valid bookTitle is required' }, { status: 400 });
    }

    const driveFolder = await createGoogleDriveBookHierarchy(String(bookTitle).slice(0, 150));

    await recordActivityLog({
      userId: user.userId,
      userEmail: user.email,
      userRole: user.role,
      action: 'GOOGLE_DRIVE_FOLDERS_CREATED',
      details: `Generated hierarchical Google Drive folder structure for "${bookTitle}"`,
    });

    return NextResponse.json({ success: true, driveFolder });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error generating Drive folders' }, { status: 500 });
  }
}
