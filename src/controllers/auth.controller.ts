import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/AppError";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) throw new AppError(400, "Email and password are required");
    throw new AppError(501, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body as { name: string; email: string; password: string };
    if (!name || !email || !password) throw new AppError(400, "Name, email and password are required");
    await bcrypt.hash(password, 10);
    throw new AppError(501, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const me = (req: Request, res: Response) => {
  res.json({ user: req.user });
};
