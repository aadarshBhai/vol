import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import packageRoutes from "./routes/packages.js";
import uploadRoutes from "./routes/uploads.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs';

// Load environment variables
dotenv.config();

// Check required environment variables
const requiredEnvVars = ['MONGODB_URI'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  console.error('Please set them in your .env file or deployment environment.');
  process.exit(1);
}

// Connect to MongoDB
connectDB(process.env.MONGODB_URI).catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err.message);
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_BASE_URL || 'https://volvorotourexplorer.com';

// CORS configuration
const corsOptions = {
  origin: [
    FRONTEND_URL,
    'http://localhost:8080',
    'http://localhost:3000',
    'https://volvorotourexplorer.com',
    'https://www.volvorotourexplorer.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: [
    'Content-Range',
    'X-Content-Range',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials'
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS with options
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Log CORS headers for debugging
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (corsOptions.origin.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/uploads", uploadRoutes);

// API Root Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Volvo Explorer API',
    status: 'running',
    version: '1.0.0',
    documentation: 'https://github.com/aadarshBhai/vol',
    apiEndpoints: {
      auth: '/api/auth',
      users: '/api/users',
      packages: '/api/packages',
      admin: '/api/admin',
      uploads: '/api/uploads'
    },
    frontend: FRONTEND_URL
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.originalUrl
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
