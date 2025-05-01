import express from "express";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "./src/middlewares/errorHandler.js";
import indexRoute from "./src/routes/index.js";
import dotenv from "dotenv";

dotenv.config();
// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// Allow requests from your Vercel frontend
const allowedOrigins = [
  "https://clergy-website.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Enable if using cookies/auth
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", indexRoute);

// Error handling middleware
app.use(errorHandler);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
