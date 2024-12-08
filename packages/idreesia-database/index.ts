import { PrismaClient } from '@prisma/client';
export {
  Prisma,
  type User,
  type Account,
} from '@prisma/client';

export const prisma = new PrismaClient();
