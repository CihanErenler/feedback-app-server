import { prisma } from "../lib/prisma";
import type { Comment } from "@prisma/client";

type CommentWithAuthor = Comment & { author: { id: string; name: string } };

type CreateCommentData = {
  body: string;
  postId: string;
  authorId: string;
};

export const getCommentsByPostId = async (postId: string): Promise<CommentWithAuthor[]> => {
  return prisma.comment.findMany({
    where: { postId },
    orderBy: { created_at: "asc" },
    include: { author: { select: { id: true, name: true } } },
  });
};

export const createComment = async (data: CreateCommentData): Promise<CommentWithAuthor> => {
  const [comment] = await prisma.$transaction([
    prisma.comment.create({
      data,
      include: { author: { select: { id: true, name: true } } },
    }),
    prisma.post.update({
      where: { id: data.postId },
      data: { comment_count: { increment: 1 } },
    }),
  ]);

  return comment;
};
