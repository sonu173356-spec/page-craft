import prisma from './prisma';

export interface BackupRecord {
  id: string;
  backupName: string;
  backupType: 'MANUAL' | 'AUTOMATED';
  size: string;
  status: 'SUCCESS' | 'FAILED';
  downloadUrl: string;
  createdBy: string;
  createdAt: string;
}

export const inMemoryBackups: BackupRecord[] = [
  {
    id: 'bk-101',
    backupName: 'PageCraft_DB_Full_Backup_2026-08-06.json',
    backupType: 'AUTOMATED',
    size: '2.4 MB',
    status: 'SUCCESS',
    downloadUrl: '#download-backup-101',
    createdBy: 'System Scheduler Routine',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'bk-102',
    backupName: 'PageCraft_DB_Metadata_Backup_2026-08-07.json',
    backupType: 'MANUAL',
    size: '2.8 MB',
    status: 'SUCCESS',
    downloadUrl: '#download-backup-102',
    createdBy: 'admin@thepagecraft.com',
    createdAt: new Date().toISOString(),
  },
];

export async function createSystemBackup(createdBy: string = 'Super Admin'): Promise<BackupRecord> {
  const newBackup: BackupRecord = {
    id: `bk-${Date.now()}`,
    backupName: `PageCraft_Full_Backup_${new Date().toISOString().split('T')[0]}_${Date.now().toString().slice(-4)}.json`,
    backupType: 'MANUAL',
    size: '3.1 MB',
    status: 'SUCCESS',
    downloadUrl: `#download-backup-${Date.now()}`,
    createdBy,
    createdAt: new Date().toISOString(),
  };

  inMemoryBackups.unshift(newBackup);

  try {
    if (prisma && prisma.backupLog) {
      await prisma.backupLog.create({
        data: {
          backupName: newBackup.backupName,
          backupType: newBackup.backupType,
          size: newBackup.size,
          status: newBackup.status,
          downloadUrl: newBackup.downloadUrl,
          createdBy,
        },
      });
    }
  } catch (err) {
    console.warn('Backup database log warning:', err);
  }

  return newBackup;
}

export async function getBackupLogs(): Promise<BackupRecord[]> {
  let list = [...inMemoryBackups];
  try {
    if (prisma && (prisma as any).backupLog) {
      const dbLogs = await (prisma as any).backupLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
      if (dbLogs && dbLogs.length > 0) {
        list = dbLogs.map((b: any) => ({
          id: b.id,
          backupName: b.backupName,
          backupType: (b.backupType as any) || 'MANUAL',
          size: b.size,
          status: (b.status as any) || 'SUCCESS',
          downloadUrl: b.downloadUrl || '#download',
          createdBy: b.createdBy,
          createdAt: b.createdAt.toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn('Backup log fetch fallback to memory:', err);
  }
  return list;
}
