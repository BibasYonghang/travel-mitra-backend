import mongoose from "mongoose";

const trailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Moderate", "Hard"], required: true },
  distance: { type: Number, required: true }, // in km
  duration: { type: String }, // e.g., "5 hours"
  description: { type: String },
  image: { type: String } // URL to trail image
}, { timestamps: true });

const Trail = mongoose.model("Trail", trailSchema);
export default Trail;
