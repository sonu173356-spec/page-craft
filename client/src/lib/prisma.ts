import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient | null };

function getPrismaInstance(): PrismaClient | null {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) return null;

    return new PrismaClient({
      ...(dbUrl.startsWith('prisma://') ? { accelerateUrl: dbUrl } : {}),
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    } as any);
  } catch (err) {
    return null;
  }
}

export const prisma = globalForPrisma.prisma !== undefined ? globalForPrisma.prisma : getPrismaInstance();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
