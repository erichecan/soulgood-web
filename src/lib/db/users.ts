import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

const PASSWORD_SALT_ROUNDS = 10;

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function createUserWithPassword(input: {
  email: string;
  name: string;
  password: string;
}) {
  const passwordHash = await bcrypt.hash(input.password, PASSWORD_SALT_ROUNDS);
  return prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      passwordHash,
    },
  });
}

export async function verifyPassword(user: { passwordHash: string | null }, password: string) {
  if (!user.passwordHash) return false;
  return bcrypt.compare(password, user.passwordHash);
}

export async function linkGoogleAccount(userId: string, googleId: string) {
  return prisma.user.update({ where: { id: userId }, data: { googleId } });
}

export function createGoogleUser(input: { email: string; name: string | null; googleId: string }) {
  return prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      googleId: input.googleId,
    },
  });
}
