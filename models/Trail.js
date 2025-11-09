import mongoose from "mongoose";

const trailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Moderate", "Hard"], required: true },
  distance: { type: String, required: true },
  duration: { type: String },
  description: { type: String },
  image: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  elevation: { type: String, required: true },
  startingPoint: { type: String, required: true },
  bestSeason: { type: String, required: true },
  stars: { type: Number, required: true },
  reviews: { type: Number, required: true }
}, { timestamps: true });


const Trail = mongoose.model("Trail", trailSchema);
export default Trail;
