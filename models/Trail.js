import mongoose from "mongoose";

const trailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  difficulty: { type: String },
  distance: { type: Number },
  img: { type: String }
});

export default mongoose.model("Trail", trailSchema);
