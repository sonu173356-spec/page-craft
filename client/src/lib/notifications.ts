import prisma from './prisma';

export interface InternalNotification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export const inMemoryNotifications: InternalNotification[] = [
  {
    id: 'nt-1',
    title: 'New Manuscript Submitted',
    message: '"Shadows of Eldoria" submitted by Jessica Wong for publishing review desk.',
    type: 'info',
    isRead: false,
    link: '/admin/internal-dashboard?menu=Books',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'nt-2',
    title: 'Payment Received',
    message: '₹24,999 package checkout completed by Author Ramesh Kumar.',
    type: 'success',
    isRead: false,
    link: '/admin/internal-dashboard?menu=Orders',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'nt-3',
    title: 'Google Drive Folder Generated',
    message: 'Created hierarchical folders for book "The Silent Echo" in Google Drive.',
    type: 'success',
    isRead: true,
    link: '/admin/internal-dashboard?menu=Books',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export async function createNotification(params: Omit<InternalNotification, 'id' | 'isRead' | 'createdAt'>) {
  const newNotif: InternalNotification = {
    id: `nt-${Date.now()}`,
    ...params,
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  inMemoryNotifications.unshift(newNotif);

  try {
    if (prisma && prisma.notification) {
      await prisma.notification.create({
        data: {
          userId: params.userId,
          title: params.title,
          message: params.message,
          type: params.type,
          link: params.link,
          isRead: false,
        },
      });
    }
  } catch (err) {
    console.warn('Database notification warning:', err);
  }

  return newNotif;
}

export async function getNotifications() {
  let list = [...inMemoryNotifications];
  try {
    if (prisma && (prisma as any).notification) {
      const dbNotifs = await (prisma as any).notification.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
      if (dbNotifs && dbNotifs.length > 0) {
        list = dbNotifs.map((n: any) => ({
          id: n.id,
          userId: n.userId || undefined,
          title: n.title,
          message: n.message,
          type: (n.type as any) || 'info',
          isRead: n.isRead,
          link: n.link || undefined,
          createdAt: n.createdAt.toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn('Notification fetch fallback to memory:', err);
  }

  const unreadCount = list.filter(n => !n.isRead).length;
  return { notifications: list, unreadCount };
}

export async function markNotificationAsRead(id: string) {
  const item = inMemoryNotifications.find(n => n.id === id);
  if (item) item.isRead = true;

  try {
    if (prisma && prisma.notification) {
      await prisma.notification.update({
        where: { id },
        data: { isRead: true },
      });
    }
  } catch (err) {
    console.warn('Mark read db warning:', err);
  }
}
