import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return secret;
};

export const generateToken = (user: AuthUser): string =>
  jwt.sign(user, getSecret(), { expiresIn: "7d" });

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.auth_token;
  if (!token) {
    return next(new AppError(401, "Authentication required"));
  }

  try {
    const user = jwt.verify(token, getSecret()) as AuthUser;
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    next();
  } catch {
    next(new AppError(401, "Invalid or expired token"));
  }
};

export const requireAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  authenticate(req, _res, (err) => {
    if (err) return next(err);
    if (!req.user?.isAdmin)
      return next(new AppError(403, "Admin access required"));
    next();
  });
};
