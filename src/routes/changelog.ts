import { Router } from "express";
import { changelog } from "../data/store";
import { requireAdmin } from "../middleware/auth";
import { AppError } from "../utils/AppError";

const router = Router();

router.get("/", (_req, res) => {
  const sorted = [...changelog].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  res.json(sorted);
});

router.get("/:id", (req, res, next) => {
  const entry = changelog.find((e) => e.id === req.params.id);
  if (!entry) return next(new AppError(404, "Changelog entry not found"));
  res.json(entry);
});

router.post("/", requireAdmin, (req, res) => {
  const newEntry = { id: String(Date.now()), ...req.body };
  changelog.unshift(newEntry);
  res.status(201).json(newEntry);
});

router.patch("/:id", requireAdmin, (req, res, next) => {
  const index = changelog.findIndex((e) => e.id === req.params.id);
  if (index === -1) return next(new AppError(404, "Changelog entry not found"));
  changelog[index] = { ...changelog[index], ...req.body };
  res.json(changelog[index]);
});

router.delete("/:id", requireAdmin, (req, res, next) => {
  const index = changelog.findIndex((e) => e.id === req.params.id);
  if (index === -1) return next(new AppError(404, "Changelog entry not found"));
  changelog.splice(index, 1);
  res.status(204).send();
});

export default router;
