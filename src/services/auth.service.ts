import type { User } from "../types/models";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return null;
};

export const createUser = async (data: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<User | null> => {
  return null;
};
