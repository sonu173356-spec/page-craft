import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { createGoogleDriveBookHierarchy } from '@/lib/googleDrive';
import { recordActivityLog } from '@/lib/logger';

export async function POST(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { bookTitle } = body;

    if (!bookTitle) {
      return NextResponse.json({ error: 'bookTitle is required' }, { status: 400 });
    }

    const driveFolder = await createGoogleDriveBookHierarchy(bookTitle);

    await recordActivityLog({
      userId: user.userId,
      userEmail: user.email,
      userRole: user.role,
      action: 'GOOGLE_DRIVE_FOLDERS_CREATED',
      details: `Generated hierarchical Google Drive folder structure for "${bookTitle}"`,
    });

    return NextResponse.json({ success: true, driveFolder });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error generating Drive folders' }, { status: 500 });
  }
}
