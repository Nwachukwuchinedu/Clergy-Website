import express from "express";
const router = express.Router();
import { submitComment , getCommentsForTeaching} from "../controllers/comments.js";
// POST /api/comments - Submit a comment
router.post("/", submitComment);

// GET /api/comments - Get comments for a teaching
router.get("/", getCommentsForTeaching);

export default router


