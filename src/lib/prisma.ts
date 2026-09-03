import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Auto-configure SQLite WAL mode and busy_timeout to prevent SQLITE_BUSY locking
if (process.env.DATABASE_URL?.startsWith('file:')) {
  prisma.$queryRawUnsafe(`PRAGMA journal_mode = WAL;`).catch(() => {});
  prisma.$queryRawUnsafe(`PRAGMA busy_timeout = 10000;`).catch(() => {});
}
