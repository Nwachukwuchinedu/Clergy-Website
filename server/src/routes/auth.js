import express from "express";
import {
  signup,
  login,
  refreshToken,
  getCurrentUser,
  getAllUsers,
} from "../controllers/auth.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes (require authentication)
router.get("/refresh-token", refreshToken);
router.get("/me", authenticate, getCurrentUser);
router.get("/users", authenticate, getAllUsers);

export default router;
