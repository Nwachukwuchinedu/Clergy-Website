import express from "express";
const router = express.Router();
import { getAllTeachings, getTeachingBySlug, getLatestTeaching } from "../controllers/teachings.js";
// GET /api/teachings - Get all teachings with pagination and filtering
router.get("/", getAllTeachings);

// GET /api/teachings/:slug - Get single teaching by slug
router.get("/:slug", getTeachingBySlug);

// GET /api/teachings/latest - Get latest teaching
router.get("/latest", getLatestTeaching);

export default router;
