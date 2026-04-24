import mongoose from "mongoose";
import { reviewsDB } from "../config/db.js";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Reviews = reviewsDB.model("Reviews", reviewSchema);

export default Reviews;
