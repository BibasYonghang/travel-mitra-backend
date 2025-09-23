import mongoose from "mongoose";

const trailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Moderate", "Hard"], required: true },
  distance: { type: Number, required: true },
  duration: { type: String },
  description: { type: String },
  image: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { timestamps: true });


const Trail = mongoose.model("Trail", trailSchema);
export default Trail;
