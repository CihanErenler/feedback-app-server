import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import type { PostType } from "../types/models";

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(501, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(501, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, type } = req.body as { title: string; description: string; type: PostType; tags?: string[] };
    if (!title || !description || !type) throw new AppError(400, "title, description and type are required");
    throw new AppError(501, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(501, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(501, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const votePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(501, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(501, "Not implemented");
  } catch (err) {
    next(err);
  }
};

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req.body as { body: string };
    if (!body) throw new AppError(400, "body is required");
    throw new AppError(501, "Not implemented");
  } catch (err) {
    next(err);
  }
};
