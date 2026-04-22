export type PostStatus = "open" | "under-review" | "planned" | "in-progress" | "complete" | "closed";
export type PostType = "feature-request" | "bug-report" | "improvement";

export type Post = {
  id: string;
  title: string;
  description: string;
  type: PostType;
  status: PostStatus;
  pinned: boolean;
  vote_count: number;
  comment_count: number;
  created_at: string;
  author: { id: string; name: string };
  tags?: string[];
};

export type Comment = {
  id: string;
  post_id: string;
  author: { id: string; name: string };
  body: string;
  created_at: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  isAdmin: boolean;
};

export type ChangelogEntry = {
  id: string;
  version: string;
  title: string;
  body: string;
  date: string;
  isNew: boolean;
  isMinor: boolean;
  tags: PostType[];
  linkedPosts?: { id: string; title: string }[];
};

export const posts: Post[] = [];
export const comments: Comment[] = [];
export const users: User[] = [];
export const changelog: ChangelogEntry[] = [];
