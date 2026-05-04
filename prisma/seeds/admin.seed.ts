import bcrypt from "bcryptjs";
import { prisma } from "../../src/lib/prisma";

const email = "admin@admin.com";
const password = "admin123";
const name = "Admin";

const existing = await prisma.user.findUnique({ where: { email } });

if (existing) {
  console.log(`Admin already exists: ${email}`);
} else {
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, email, passwordHash, isAdmin: true },
  });
  console.log(`Admin created — email: ${email} | password: ${password}`);
}

await prisma.$disconnect();
