import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { createSystemBackup, getBackupLogs } from '@/lib/backup';
import { recordActivityLog } from '@/lib/logger';

export async function GET(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const backups = await getBackupLogs();
  return NextResponse.json({ backups });
}

export async function POST(req: NextRequest) {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const backup = await createSystemBackup(user.email);

    await recordActivityLog({
      userId: user.userId,
      userEmail: user.email,
      userRole: user.role,
      action: 'DATABASE_BACKUP_CREATED',
      details: `Triggered manual database & file metadata backup "${backup.backupName}"`,
    });

    return NextResponse.json({ success: true, backup });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error generating backup' }, { status: 500 });
  }
}
