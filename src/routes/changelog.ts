import { Router } from "express";
import {
  getChangelog,
  getChangelogEntry,
  createChangelogEntry,
  updateChangelogEntry,
  deleteChangelogEntry,
} from "../controllers/changelog.controller";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getChangelog);
router.get("/:id", getChangelogEntry);
router.post("/", requireAdmin, createChangelogEntry);
router.patch("/:id", requireAdmin, updateChangelogEntry);
router.delete("/:id", requireAdmin, deleteChangelogEntry);

export default router;
