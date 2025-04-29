import express from "express";

const router = express.Router();
import { submitContactForm } from "../controllers/contact.js";
// POST /api/contact - Submit contact form
router.post("/", submitContactForm);

export default router