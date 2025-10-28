import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

// List users (admin)
router.get("/", async (_req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ _id: -1 }).lean();
    res.json({ ok: true, users });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Failed to fetch users" });
  }
});

// Delete user (admin)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ ok: false, message: "User not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Failed to delete user" });
  }
});

export default router;
