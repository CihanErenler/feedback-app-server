import { Router } from "express";
import bcrypt from "bcryptjs";
import { users } from "../data/store";
import { generateToken, authenticate } from "../middleware/auth";
import { AppError } from "../utils/AppError";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) throw new AppError(400, "Email and password are required");

    const user = users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new AppError(401, "Invalid credentials");
    }

    const token = generateToken({ id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body as { name: string; email: string; password: string };
    if (!name || !email || !password) throw new AppError(400, "Name, email and password are required");

    if (users.find((u) => u.email === email)) throw new AppError(409, "Email already in use");

    const newUser = {
      id: String(Date.now()),
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
      isAdmin: false,
    };
    users.push(newUser);

    const token = generateToken({ id: newUser.id, name, email, isAdmin: false });
    res.status(201).json({ token, user: { id: newUser.id, name, email, isAdmin: false } });
  } catch (err) {
    next(err);
  }
});

router.get("/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default router;
