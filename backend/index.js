// Load environment variables FIRST, before any other imports
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Load environment variables from the root .env file
const envPath = path.resolve(process.cwd(), ".env");
console.log(`🔍 Loading environment variables from: ${envPath}`);
dotenv.config({ path: envPath });

// 2. Now import other dependencies
import express from "express";
import mongoose from "mongoose";
import { connectDB, getDBStatus } from "./config/db.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import packageRoutes from "./routes/packages.js";
import uploadRoutes from "./routes/uploads.js";

// 3. Log environment status
console.log('✅ Environment variables loaded successfully');
console.log(`- NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`- MONGODB_URI: ${process.env.MONGODB_URI ? 'Set' : 'Not set'}`);
dotenv.config({ path: envPath });

// Verify environment variables
const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET"];
const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:", missingVars.join(", "));
  console.log("ℹ️  Make sure you have a .env file in your project root with the required variables.");
  process.exit(1);
}

// Debug: Log MongoDB URI (with sensitive info redacted)
const maskedMongoURI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)@/, "mongodb+srv://****:****@")
  : "Not set";
console.log(`🔗 MongoDB URI: ${maskedMongoURI}`);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_BASE_URL || "https://volvorotourexplorer.com";

// Allowed Origins
const allowedOrigins = [
  FRONTEND_URL,
  "https://volvorotourexplorer.com",
  "https://www.volvorotourexplorer.com",
  "http://localhost:3000",
  "http://localhost:8080",
  'https://volvoro-tour-explorer.vercel.app'
];

// Import cors package
import cors from 'cors';

// Configure CORS with specific origin handling
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/uploads", uploadRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Volvo Explorer API",
    status: "running",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    database: getDBStatus(),
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
      packages: "/api/packages",
      admin: "/api/admin",
      uploads: "/api/uploads",
    },
  });
});

// 404 Handler - should be after all other routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    path: req.originalUrl,
  });
});

// Error Handler - should be after all other middleware and routes
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Start Server
async function startServer() {
  try {
    console.log("\n🔧 Environment Configuration:");
    console.log(`- Node.js: ${process.version}`);
    console.log(`- NODE_ENV: ${process.env.NODE_ENV || "development"}`);
    console.log(`- Database: ${process.env.MONGODB_URI ? "Configured" : "Not configured"}`);
    console.log(`- Server will run on port: ${PORT}`);

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    if (!process.env.MONGODB_URI.startsWith("mongodb+srv://")) {
      console.warn("⚠️  MONGODB_URI may not be a MongoDB Atlas connection string.");
    }

    console.log("\n🔍 Attempting to connect to MongoDB Atlas...");
    await new Promise((resolve) => setTimeout(resolve, 100));
    await connectDB(process.env.MONGODB_URI);

    const server = app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`📊 Database Status: ${getDBStatus().connected ? "Connected" : "Disconnected"}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
      console.log(`💾 Using Database: ${mongoose.connection.name} on ${mongoose.connection.host}\n`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use.`);
      } else {
        console.error("❌ Server error:", error);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
