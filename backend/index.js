import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB, getDBStatus } from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import packagesRoutes from "./routes/packages.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.FRONTEND_BASE_URL || "http://localhost:8080";

// Middleware
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(bodyParser.json());

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.get("/api/db-status", (_req, res) => {
  try {
    const status = getDBStatus();
    res.json({ ok: true, ...status });
  } catch (e) {
    res.status(500).json({ ok: false, error: e?.message || "unknown" });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/packages", packagesRoutes);

// Start server
async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`[Server] Listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error("[Server] Startup error:", err.message);
    process.exit(1);
  }
}

start();

export default app;
