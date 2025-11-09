import express from "express";
import Reviews from "../models/Reviews.js";

const router = express.Router();

// Get all reviews
router.get("/", async (req, res) => {
    try {
        const reviewsDB = req.app.locals.reviewsDB; // get the separate connection
        const reviews = await reviewsDB.model("Reviews", Reviews.schema).find({});
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

// Get review by ID
router.get("/:id", async (req, res) => {
    try {
        const reviewsDB = req.app.locals.reviewsDB;
        const review = await reviewsDB.model("Reviews", Reviews.schema).findById(req.params.id);
        if (!review) return res.status(404).json({ error: "Review not found" });
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch review" });
    }
});

export default router;
