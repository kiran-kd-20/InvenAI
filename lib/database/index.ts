import { PrismaClient } from '@prisma/client';

// Global declaration for TypeScript
declare global {
  var __prisma: PrismaClient | undefined;
}

// Prevent multiple instances of Prisma Client in development
const prisma = globalThis.__prisma || new PrismaClient({
  log: ['query', 'error', 'warn'],
});

if (process.env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma;
}

export default prisma;

// Export commonly used types
export type {
  Product,
  Inventory,
  Sale,
  Forecast,
  Replenishment,
  Recommendation,
  ExternalFactor,
} from '@prisma/client';

// Connection helper
export async function connectDB() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

// Disconnect helper
export async function disconnectDB() {
  await prisma.$disconnect();
}