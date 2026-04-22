import { Router } from "express";
import authRoutes from "./auth";
import postRoutes from "./posts";
import changelogRoutes from "./changelog";

const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/changelog", changelogRoutes);

export default router;
