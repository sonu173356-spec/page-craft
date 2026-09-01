import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest, isAdminRole } from '@/lib/auth';
import { createSystemBackup, getBackupLogs } from '@/lib/backup';
import { recordActivityLog } from '@/lib/logger';
import { validateCsrfOrigin } from '@/lib/csrf';

export async function GET(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isAdminRole(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const backups = await getBackupLogs();
  return NextResponse.json({ backups });
}

export async function POST(req: NextRequest) {
  if (!validateCsrfOrigin(req)) {
    return NextResponse.json({ error: 'CSRF Origin Validation Failed' }, { status: 403 });
  }

  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isAdminRole(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const backup = await createSystemBackup(user.email);

    await recordActivityLog({
      userId: user.userId,
      userEmail: user.email,
      userRole: user.role,
      action: 'DATABASE_BACKUP_CREATED',
      details: `Triggered manual database backup "${backup.backupName}"`,
    });

    return NextResponse.json({ success: true, backup });
  } catch (err: any) {
    return NextResponse.json({ error: 'Error generating backup' }, { status: 500 });
  }
}
