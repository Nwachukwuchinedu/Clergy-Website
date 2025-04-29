import express from "express";
const router = express.Router();
import { getAllSeries, getSeriesBySlug } from "../controllers/series.js";

// GET /api/series - Get all series
router.get("/", getAllSeries);

// GET /api/series/:slug - Get single series by slug
router.get("/:slug", getSeriesBySlug);

export default router;
