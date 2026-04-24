import mongoose from "mongoose";
import { trailsDB } from "../config/db.js";

const trailSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Hard"],
      required: true,
    },
    distance: { type: String, required: true },
    duration: { type: String },
    description: { type: String },
    image: { type: String },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    elevation: { type: String, required: true },
    startingPoint: { type: String, required: true },
    bestSeason: { type: String, required: true },
    stars: { type: Number, required: true },
    reviews: { type: Number, required: true },
  },
  { timestamps: true },
);

const Trail = trailsDB.model("Trail", trailSchema);

export default Trail;
