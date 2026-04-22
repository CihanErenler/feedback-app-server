import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/auth";
import { AppError } from "../utils/AppError";
import { findUserByEmail, createUser } from "../services/auth.service";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) throw new AppError(400, "Email and password are required");

    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new AppError(401, "Invalid credentials");
    }

    const token = generateToken({ id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    next(err);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body as { name: string; email: string; password: string };
    if (!name || !email || !password) throw new AppError(400, "Name, email and password are required");

    const existing = await findUserByEmail(email);
    if (existing) throw new AppError(409, "Email already in use");

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, passwordHash });

    const token = generateToken({ id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin });
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    next(err);
  }
};

export const me = (req: Request, res: Response) => {
  res.json({ user: req.user });
};
