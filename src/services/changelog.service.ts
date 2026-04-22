import type { ChangelogEntry, PostType } from "../types/models";

type CreateChangelogData = {
  version: string;
  title: string;
  body: string;
  date: string;
  isNew: boolean;
  isMinor: boolean;
  tags: PostType[];
  linkedPosts?: { id: string; title: string }[];
};

export const getAllChangelog = async (): Promise<ChangelogEntry[]> => {
  return [];
};

export const getChangelogEntryById = async (id: string): Promise<ChangelogEntry | null> => {
  return null;
};

export const createChangelogEntry = async (data: CreateChangelogData): Promise<ChangelogEntry | null> => {
  return null;
};

export const updateChangelogEntry = async (id: string, data: Partial<ChangelogEntry>): Promise<ChangelogEntry | null> => {
  return null;
};

export const deleteChangelogEntry = async (id: string): Promise<void> => {};
