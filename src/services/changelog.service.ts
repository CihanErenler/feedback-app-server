import { prisma } from "../lib/prisma";
import type { ChangelogEntry } from "@prisma/client";

type CreateChangelogData = {
  version: string;
  title: string;
  body: string;
  date: string;
  isNew: boolean;
  isMinor: boolean;
  tags: string[];
  linked_posts?: { id: string; title: string }[];
};

export const getAllChangelog = async (): Promise<ChangelogEntry[]> => {
  return prisma.changelogEntry.findMany({ orderBy: { date: "desc" } });
};

export const getChangelogEntryById = async (id: string): Promise<ChangelogEntry | null> => {
  return prisma.changelogEntry.findUnique({ where: { id } });
};

export const createChangelogEntry = async (data: CreateChangelogData): Promise<ChangelogEntry> => {
  return prisma.changelogEntry.create({
    data: {
      ...data,
      date: new Date(data.date),
    },
  });
};

export const updateChangelogEntry = async (
  id: string,
  data: Partial<CreateChangelogData>
): Promise<ChangelogEntry> => {
  return prisma.changelogEntry.update({
    where: { id },
    data: {
      ...data,
      ...(data.date && { date: new Date(data.date) }),
    },
  });
};

export const deleteChangelogEntry = async (id: string): Promise<void> => {
  await prisma.changelogEntry.delete({ where: { id } });
};
