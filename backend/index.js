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
const ORIGINS = ORIGIN.split(",").map((s) => s.trim()).filter(Boolean);

// CORS Configuration
const allowedOrigins = [
  'http://localhost:8080',
  'https://volvorotourexplorer.com',
  'https://www.volvorotourexplorer.com'
];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Check if the origin is in the allowed list
      if (allowedOrigins.includes(origin) || ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      
      // Log CORS errors for debugging
      console.warn(`CORS blocked request from: ${origin}`);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
  })
);

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Handle preflight requests - must be before other routes
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(204).send();
});
app.use(bodyParser.json({ limit: "5mb" }));

// Health check
app.get("/", (_req, res) => res.json({ status: "ok" }));
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
