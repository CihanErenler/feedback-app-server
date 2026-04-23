import { prisma } from "#lib/prisma.js";
import type { UserModel as User } from "../../generated/prisma/models/User.js";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (data: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<User> => {
  return prisma.user.create({ data });
};
