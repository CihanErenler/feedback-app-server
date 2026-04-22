import { Router } from "express";
import {
  getPosts,
  getPost,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
  votePostHandler,
  getComments,
  createCommentHandler,
} from "../controllers/posts.controller";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", authenticate, createPostHandler);
router.patch("/:id", requireAdmin, updatePostHandler);
router.delete("/:id", requireAdmin, deletePostHandler);

router.post("/:id/vote", authenticate, votePostHandler);
router.get("/:id/comments", getComments);
router.post("/:id/comments", authenticate, createCommentHandler);

export default router;
