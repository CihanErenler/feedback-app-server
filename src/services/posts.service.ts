import { prisma } from "../lib/prisma";
import type { Post } from "@prisma/client";
import type { PostType, PostStatus } from "../types/models";

export type PostFilters = {
  search?: string;
  status?: PostStatus[];
  type?: PostType[];
  tags?: string[];
  sort?: string;
  limit?: number;
  cursor?: string;
};

type CreatePostData = {
  title: string;
  description: string;
  type: PostType;
  tags?: string[];
  authorId: string;
};

type PostWithAuthor = Post & { author: { id: string; name: string } };

const buildOrderBy = (sort?: string) => {
  if (sort === "old_to_new")
    return [{ pinned: "desc" as const }, { created_at: "asc" as const }];
  if (sort === "new_to_old")
    return [{ pinned: "desc" as const }, { created_at: "desc" as const }];
  return [{ pinned: "desc" as const }, { vote_count: "desc" as const }];
};

export const getAllPosts = async (
  filters: PostFilters,
  limit: string,
  cursor: string | undefined = undefined,
): Promise<PostWithAuthor[]> => {
  return prisma.post.findMany({
    where: {
      ...(filters.search && {
        title: { contains: filters.search, mode: "insensitive" },
      }),
      ...(filters.status?.length && { status: { in: [filters.status] } }),
      ...(filters.type?.length && { type: { in: filters.type } }),
      ...(filters.tags?.length && { tags: { hasSome: [filters.tags] } }),
    },
    orderBy: buildOrderBy(filters.sort),
    include: { author: { select: { id: true, name: true } } },
    take: parseInt(limit) + 1,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
  });
};

export const getPostById = async (
  id: string,
): Promise<PostWithAuthor | null> => {
  return prisma.post.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true } } },
  });
};

export const createPost = async (
  data: CreatePostData,
): Promise<PostWithAuthor> => {
  return prisma.post.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      tags: data.tags ?? [],
      authorId: data.authorId,
    },
    include: { author: { select: { id: true, name: true } } },
  });
};

export const updatePost = async (
  id: string,
  data: Partial<Post>,
): Promise<PostWithAuthor | null> => {
  return prisma.post.update({
    where: { id },
    data,
    include: { author: { select: { id: true, name: true } } },
  });
};

export const deletePost = async (id: string): Promise<void> => {
  await prisma.post.delete({ where: { id } });
};

export const votePost = async (
  postId: string,
  userId: string,
): Promise<{ vote_count: number } | null> => {
  const existing = await prisma.vote.findUnique({
    where: { postId_userId: { postId, userId } },
  });

  if (existing) return null;

  const [, post] = await prisma.$transaction([
    prisma.vote.create({ data: { postId, userId } }),
    prisma.post.update({
      where: { id: postId },
      data: { vote_count: { increment: 1 } },
    }),
  ]);

  return { vote_count: post.vote_count };
};
