import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/auth";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/AppError";
import { findUserByEmail, createUser } from "#services/auth.service.js";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password)
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Email and password are required",
      );

    const user = await findUserByEmail(email);

    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const userToSend = {
      name: user.name,
      email: user.email,
      id: user.id,
      isAdmin: user.isAdmin,
    };
    const token = generateToken(userToSend);

    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(StatusCodes.OK).json({ user: userToSend });
  } catch (err) {
    next(err);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };
    if (!name || !email || !password) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Name, email and password are required",
      );
    }

    const user = await findUserByEmail(email);

    if (user) {
      throw new AppError(
        StatusCodes.CONFLICT,
        "User with this email already exists",
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await createUser({ name, email, passwordHash });

    res.status(StatusCodes.CREATED).json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

export const me = (req: Request, res: Response) => {
  res.json({ user: req.user });
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.NO_CONTENT).send();
};
