import { Router } from "express";
import {
  getChangelog,
  getChangelogEntry,
  createChangelogEntryHandler,
  updateChangelogEntryHandler,
  deleteChangelogEntryHandler,
} from "../controllers/changelog.controller";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getChangelog);
router.get("/:id", getChangelogEntry);
router.post("/", requireAdmin, createChangelogEntryHandler);
router.patch("/:id", requireAdmin, updateChangelogEntryHandler);
router.delete("/:id", requireAdmin, deleteChangelogEntryHandler);

export default router;
