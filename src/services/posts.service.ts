import type { Post, PostStatus, PostType } from "../types/models";

type PostFilters = {
  search?: string;
  status?: PostStatus[];
  type?: PostType[];
  tags?: string[];
  sort?: string;
};

type CreatePostData = {
  title: string;
  description: string;
  type: PostType;
  tags?: string[];
  authorId: string;
};

export const getAllPosts = async (filters: PostFilters): Promise<Post[]> => {
  return [];
};

export const getPostById = async (id: string): Promise<Post | null> => {
  return null;
};

export const createPost = async (data: CreatePostData): Promise<Post | null> => {
  return null;
};

export const updatePost = async (id: string, data: Partial<Post>): Promise<Post | null> => {
  return null;
};

export const deletePost = async (id: string): Promise<void> => {};

export const votePost = async (postId: string, userId: string): Promise<{ vote_count: number } | null> => {
  return null;
};
