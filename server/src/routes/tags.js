import express from "express";

const router = express.Router();
import { getAllTags } from "../controllers/tags.js";
// GET /api/tags - Get all tags
router.get("/", getAllTags);

export default router