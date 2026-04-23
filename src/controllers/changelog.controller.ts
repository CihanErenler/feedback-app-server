import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/AppError";

export const getChangelog = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const getChangelogEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const createChangelogEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { version, title, body, date } = req.body;
    if (!version || !title || !body || !date) throw new AppError(StatusCodes.BAD_REQUEST, "version, title, body and date are required");
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const updateChangelogEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const deleteChangelogEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not implemented");
  } catch (err) {
    next(err);
  }
};
