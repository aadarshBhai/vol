import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/uploads.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yourdbname";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/uploads", uploadRoutes);

// Static files setup for production (Vite + Render)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, "../dist");

app.use(express.static(clientPath));

// Handle all other routes (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(clientPath, "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
