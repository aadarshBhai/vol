import express from "express";
import { Package } from "../models/Package.js";

const router = express.Router();

// Get packages
router.get("/", async (_req, res) => {
  try {
    const packages = await Package.find({}).sort({ createdAt: -1 }).lean();
    res.json({ ok: true, packages });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Failed to fetch packages" });
  }
});

// Create package
router.post("/", async (req, res) => {
  try {
    const { destination, duration, type, price, image, highlights, inclusions, excludes, itinerary } = req.body;
    if (!destination || !duration || !type || price == null)
      return res.status(400).json({ ok: false, message: "Missing required fields" });

    const created = await Package.create({
      destination,
      duration,
      type,
      price,
      image,
      highlights: highlights || [],
      inclusions: inclusions || [],
      excludes: excludes || [],
      itinerary: itinerary || [],
    });

    res.status(201).json({ ok: true, package: created });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Failed to create package" });
  }
});

// Update package
router.put("/:id", async (req, res) => {
  try {
    const updated = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ ok: false, message: "Package not found" });
    res.json({ ok: true, package: updated });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Failed to update package" });
  }
});

// Delete package
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ ok: false, message: "Package not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Failed to delete package" });
  }
});

export default router;
