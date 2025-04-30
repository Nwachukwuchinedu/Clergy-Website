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
app.use(cors());
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
