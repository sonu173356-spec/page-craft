import prisma from './prisma';

export interface LogActionParams {
  userId?: string;
  userEmail: string;
  userRole: string;
  action: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
}

export const inMemoryActivityLogs: Array<LogActionParams & { id: string; createdAt: string }> = [
  {
    id: 'log-101',
    userEmail: 'admin@thepagecraft.com',
    userRole: 'SUPER_ADMIN',
    action: 'SYSTEM_INITIALIZED',
    details: 'Page Craft Enterprise Operations Engine started',
    ipAddress: '127.0.0.1',
    userAgent: 'Internal System Engine',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'log-102',
    userEmail: 'admin@thepagecraft.com',
    userRole: 'SUPER_ADMIN',
    action: 'ROYALTY_PAYOUT_PROCESSED',
    details: 'Processed ₹15,46,900 100% net royalty payout for Marcus Sterling',
    ipAddress: '127.0.0.1',
    userAgent: 'Chrome Operations Desk',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export async function recordActivityLog(params: LogActionParams) {
  const newLog = {
    id: `log-${Date.now()}`,
    ...params,
    createdAt: new Date().toISOString(),
  };

  inMemoryActivityLogs.unshift(newLog);

  try {
    if (prisma && prisma.activityLog) {
      await prisma.activityLog.create({
        data: {
          userId: params.userId,
          userEmail: params.userEmail,
          userRole: params.userRole,
          action: params.action,
          details: params.details,
          ipAddress: params.ipAddress || '127.0.0.1',
          userAgent: params.userAgent || 'Page Craft System',
        },
      });
    }
  } catch (err) {
    console.warn('Database activity log warning:', err);
  }

  return newLog;
}

export async function getActivityLogs(searchQuery?: string) {
  let logs = [...inMemoryActivityLogs];
  try {
    if (prisma && (prisma as any).activityLog) {
      const dbLogs = await (prisma as any).activityLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
      });
      if (dbLogs && dbLogs.length > 0) {
        logs = dbLogs.map((l: any) => ({
          id: l.id,
          userId: l.userId || undefined,
          userEmail: l.userEmail,
          userRole: l.userRole,
          action: l.action,
          details: l.details || undefined,
          ipAddress: l.ipAddress || undefined,
          userAgent: l.userAgent || undefined,
          createdAt: l.createdAt.toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn('Database log fetch fallback to memory:', err);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    logs = logs.filter(l => 
      l.userEmail.toLowerCase().includes(q) ||
      l.action.toLowerCase().includes(q) ||
      (l.details && l.details.toLowerCase().includes(q))
    );
  }

  return logs;
}
