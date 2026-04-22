import type { Comment } from "../types/models";

type CreateCommentData = {
  body: string;
  postId: string;
  authorId: string;
};

export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  return [];
};

export const createComment = async (data: CreateCommentData): Promise<Comment | null> => {
  return null;
};
