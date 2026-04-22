import { Router } from "express";
import { posts, comments } from "../data/store";
import { authenticate, requireAdmin } from "../middleware/auth";
import { AppError } from "../utils/AppError";
import type { PostStatus, PostType } from "../data/store";

const router = Router();

router.get("/", (req, res) => {
  const { search, status, type, tags, sort } = req.query as Record<string, string>;

  let result = [...posts];

  if (search) result = result.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  if (status) result = result.filter((p) => (status.split(",") as PostStatus[]).includes(p.status));
  if (type) result = result.filter((p) => (type.split(",") as PostType[]).includes(p.type));
  if (tags) result = result.filter((p) => tags.split(",").some((t) => p.tags?.includes(t)));

  result.sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    if (sort === "old_to_new") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    if (sort === "new_to_old") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return b.vote_count - a.vote_count; // top_voted default
  });

  res.json({ posts: result, total: result.length });
});

router.get("/:id", (req, res, next) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return next(new AppError(404, "Post not found"));
  res.json(post);
});

router.post("/", authenticate, (req, res) => {
  const { title, description, type, tags } = req.body as Pick<typeof posts[0], "title" | "description" | "type" | "tags">;
  const newPost = {
    id: String(Date.now()),
    title,
    description,
    type,
    status: "open" as PostStatus,
    pinned: false,
    vote_count: 0,
    comment_count: 0,
    created_at: new Date().toISOString(),
    author: { id: req.user!.id, name: req.user!.name },
    tags,
  };
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

router.patch("/:id", requireAdmin, (req, res, next) => {
  const index = posts.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new AppError(404, "Post not found"));
  posts[index] = { ...posts[index], ...req.body };
  res.json(posts[index]);
});

router.delete("/:id", requireAdmin, (req, res, next) => {
  const index = posts.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new AppError(404, "Post not found"));
  posts.splice(index, 1);
  res.status(204).send();
});

router.post("/:id/vote", authenticate, (req, res, next) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return next(new AppError(404, "Post not found"));
  post.vote_count += 1;
  res.json({ vote_count: post.vote_count });
});

router.get("/:id/comments", (req, res, next) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return next(new AppError(404, "Post not found"));
  res.json(comments.filter((c) => c.post_id === req.params.id));
});

router.post("/:id/comments", authenticate, (req, res, next) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return next(new AppError(404, "Post not found"));

  const newComment = {
    id: String(Date.now()),
    post_id: req.params.id,
    author: { id: req.user!.id, name: req.user!.name },
    body: req.body.body as string,
    created_at: new Date().toISOString(),
  };
  comments.push(newComment);
  post.comment_count += 1;
  res.status(201).json(newComment);
});

export default router;
