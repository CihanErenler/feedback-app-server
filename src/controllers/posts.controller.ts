import { Request, Response, NextFunction } from "express";
import { AppError, param } from "../utils/AppError";
import type { PostType, PostStatus } from "../types/models";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  votePost,
} from "../services/posts.service";
import { getCommentsByPostId, createComment } from "../services/comments.service";

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, status, type, tags, sort } = req.query as Record<string, string>;

    const posts = await getAllPosts({
      search,
      sort,
      status: status ? (status.split(",") as PostStatus[]) : undefined,
      type: type ? (type.split(",") as PostType[]) : undefined,
      tags: tags ? tags.split(",") : undefined,
    });

    res.json({ posts, total: posts.length });
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await getPostById(param(req.params.id));
    if (!post) throw new AppError(404, "Post not found");
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const createPostHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, type, tags } = req.body as {
      title: string;
      description: string;
      type: PostType;
      tags?: string[];
    };

    if (!title || !description || !type) throw new AppError(400, "title, description and type are required");

    const post = await createPost({ title, description, type, tags, authorId: req.user!.id });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

export const updatePostHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await updatePost(param(req.params.id), req.body);
    if (!post) throw new AppError(404, "Post not found");
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const deletePostHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deletePost(param(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const votePostHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await votePost(param(req.params.id), req.user!.id);
    if (!result) throw new AppError(409, "Already voted on this post");
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = param(req.params.id);
    const post = await getPostById(id);
    if (!post) throw new AppError(404, "Post not found");
    const comments = await getCommentsByPostId(id);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

export const createCommentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req.body as { body: string };
    if (!body) throw new AppError(400, "body is required");

    const id = param(req.params.id);
    const post = await getPostById(id);
    if (!post) throw new AppError(404, "Post not found");

    const comment = await createComment({ body, postId: id, authorId: req.user!.id });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};
