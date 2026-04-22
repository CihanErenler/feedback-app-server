import { Request, Response, NextFunction } from "express";
import { AppError, param } from "../utils/AppError";
import {
  getAllChangelog,
  getChangelogEntryById,
  createChangelogEntry,
  updateChangelogEntry,
  deleteChangelogEntry,
} from "../services/changelog.service";

export const getChangelog = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const entries = await getAllChangelog();
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

export const getChangelogEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entry = await getChangelogEntryById(param(req.params.id));
    if (!entry) throw new AppError(404, "Changelog entry not found");
    res.json(entry);
  } catch (err) {
    next(err);
  }
};

export const createChangelogEntryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { version, title, body, date, isNew, isMinor, tags, linked_posts } = req.body;
    if (!version || !title || !body || !date) throw new AppError(400, "version, title, body and date are required");

    const entry = await createChangelogEntry({ version, title, body, date, isNew, isMinor, tags, linked_posts });
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
};

export const updateChangelogEntryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = param(req.params.id);
    const entry = await getChangelogEntryById(id);
    if (!entry) throw new AppError(404, "Changelog entry not found");

    const updated = await updateChangelogEntry(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteChangelogEntryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = param(req.params.id);
    const entry = await getChangelogEntryById(id);
    if (!entry) throw new AppError(404, "Changelog entry not found");

    await deleteChangelogEntry(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
