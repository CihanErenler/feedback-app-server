import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/AppError";
import {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from "../services/tags.service";

export const getTags = async (_req: Request, res: Response) => {
  const tags = await getAllTags();
  res.json(tags);
};

export const getTag = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const tag = await getTagById(req.params.id);
  if (!tag) return next(new AppError(StatusCodes.NOT_FOUND, "Tag not found"));
  res.json({ tag });
};

export const createTagHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name } = req.body as { name?: string };
  if (!name)
    return next(new AppError(StatusCodes.BAD_REQUEST, "Name is required"));
  const tag = await createTag(name);
  res.status(StatusCodes.CREATED).json({ tag });
};

export const updateTagHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name } = req.body as { name?: string };
  if (!name)
    return next(new AppError(StatusCodes.BAD_REQUEST, "Name is required"));
  const tag = await updateTag(req.params.id, name);
  res.json({ tag });
};

export const deleteTagHandler = async (req: Request, res: Response) => {
  await deleteTag(req.params.id);
  res.status(StatusCodes.NO_CONTENT).send();
};
