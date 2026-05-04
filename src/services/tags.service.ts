import { prisma } from "#lib/prisma.js";

export const getAllTags = () =>
  prisma.tag.findMany({ orderBy: { name: "asc" } });

export const getTagById = (id: string) =>
  prisma.tag.findUnique({ where: { id } });

export const createTag = (name: string) =>
  prisma.tag.create({ data: { name } });

export const updateTag = (id: string, name: string) =>
  prisma.tag.update({ where: { id }, data: { name } });

export const deleteTag = (id: string) =>
  prisma.tag.delete({ where: { id } });
