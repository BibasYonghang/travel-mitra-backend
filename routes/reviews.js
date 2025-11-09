import express from "express";
import Reviews from "../models/Reviews.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const reviews = await Reviews.find({});
        res.status(200).json(reviews);

    } catch (error) {
        res.status(500).json("Enternal error say : ", error)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const review = await Reviews.findById(req.params.id);
        if (!review) return res.status(404).json({ error: "Review not found" });
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch review" });
    }
});

export default router;