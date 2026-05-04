import { Router } from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  votePost,
  getComments,
  createComment,
} from "../controllers/posts.controller";
import { asyncWrapper } from "#utils/asyncWrapper.js";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", asyncWrapper(getPosts));
router.get("/:id", getPost);
router.post("/", authenticate, createPost);
router.patch("/:id", requireAdmin, updatePost);
router.delete("/:id", requireAdmin, deletePost);

router.post("/:id/vote", authenticate, votePost);
router.get("/:id/comments", getComments);
router.post("/:id/comments", authenticate, createComment);

export default router;
