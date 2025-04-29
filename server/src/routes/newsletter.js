import express from "express";

const router = express.Router();
import { subscribeToNewsletter } from "../controllers/newsletter.js";
// POST /api/newsletter - Subscribe to newsletter
router.post("/", subscribeToNewsletter);

export default router