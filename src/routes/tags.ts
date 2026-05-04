import { Router } from "express";
import {
  getTags,
  getTag,
  createTagHandler,
  updateTagHandler,
  deleteTagHandler,
} from "../controllers/tags.controller";
import { asyncWrapper } from "../utils/asyncWrapper";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", asyncWrapper(getTags));
router.get("/:id", asyncWrapper(getTag));
router.post("/", requireAdmin, asyncWrapper(createTagHandler));
router.patch("/:id", requireAdmin, asyncWrapper(updateTagHandler));
router.delete("/:id", requireAdmin, asyncWrapper(deleteTagHandler));

export default router;
