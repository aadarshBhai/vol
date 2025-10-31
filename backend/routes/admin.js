import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Admin dashboard route
router.get("/dashboard", isAdmin, async (req, res) => {
  try {
    // Get stats for admin dashboard
    const totalUsers = await User.countDocuments({});
    const recentUsers = await User.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-password");

    res.json({
      stats: {
        totalUsers,
        // Add more stats as needed
      },
      recentUsers,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
