import Reviews from "../models/Reviews.js";

// GET all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find({});
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// GET review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Reviews.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch review",
      error: error.message,
    });
  }
};
