import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/AppError";
import type { PostType, PostStatus } from "../types/models";
import { getAllPosts, getPostById } from "../services/posts.service";
import type { PostFilters } from "../services/posts.service";

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { search, status, type, tags, sort, limit, cursor } =
    req.query as PostFilters;

  const filters = {
    search,
    status: status as PostStatus[] | undefined,
    type: type as PostType[] | undefined,
    tags,
    sort,
  };

  const posts = await getAllPosts(filters, limit, cursor);

  const hasNextPage = posts.length > (limit || 5);
  const data = hasNextPage ? posts.slice(0, -1) : posts;
  const nextCursor = hasNextPage ? data[data.length - 1].id : null;

  res.status(StatusCodes.OK).json({ data, hasNextPage, nextCursor });
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, type } = req.body as {
      title: string;
      description: string;
      type: PostType;
      tags?: string[];
    };
    if (!title || !description || !type)
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "title, description and type are required",
      );
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const votePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body } = req.body as { body: string };
    if (!body) throw new AppError(StatusCodes.BAD_REQUEST, "body is required");
    throw new AppError(StatusCodes.NOT_IMPLEMENTED, "Not implemented");
  } catch (err) {
    next(err);
  }
};
