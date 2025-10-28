import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const packageSchema = new mongoose.Schema(
  {
    destination: { type: String, required: true },
    duration: { type: String, required: true },
    type: { type: String, enum: ["Family", "Couple", "Solo"], required: true },
    price: { type: Number, required: true },
    image: { type: String },
    highlights: { type: [String], default: [] },
    inclusions: { type: [String], default: [] },
    excludes: { type: [String], default: [] },
    itinerary: { type: [itinerarySchema], default: [] },
  },
  { timestamps: true }
);

export const Package = mongoose.model("Package", packageSchema);
