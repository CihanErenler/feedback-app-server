import { Router } from "express";
import { login, register, me, logout } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";
import { asyncWrapper } from "../utils/asyncWrapper";

const router = Router();

router.post("/login", asyncWrapper(login));
router.post("/register", asyncWrapper(register));
router.get("/logout", asyncWrapper(logout));
router.get("/me", authenticate, asyncWrapper(me));

export default router;
