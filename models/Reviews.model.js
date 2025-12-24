import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
})

const Reviews = mongoose.model("Reviews", reviewSchema)
export default Reviews;