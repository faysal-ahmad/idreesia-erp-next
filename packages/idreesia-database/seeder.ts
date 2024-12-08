import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export type PrismaType = typeof prisma;

export async function main() {
  // Check if the root user already exists
  const rootUser = await prisma.user.findFirst({
    where: {
      email: 'erp-admin@idreesia.com'
    }
  });

  if (!rootUser) {
    // Root user was not found so create it
    const passwordHash = await bcrypt.hash('password', 10);
    await prisma.user.create({
      data: {
        name: 'ERP Admin',
        email: 'erp-admin@idreesia.com',
        emailVerified: new Date(),
        passwordHash,
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
