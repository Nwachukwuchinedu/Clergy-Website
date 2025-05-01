import express from "express";
import teachings from "./teachings.js";
import series from "./series.js";
import comments from "./comments.js";
import tags from "./tags.js";
import newsletter from "./newsletter.js";
import contact from "./contact.js";
import auth from "./auth.js";

const router = express.Router();

router.use("/teachings", teachings);
router.use("/series", series);
router.use("/comments", comments);
router.use("/tags", tags);
router.use("/newsletter", newsletter);
router.use("/contact", contact);
router.use("/auth", auth);

export default router;
