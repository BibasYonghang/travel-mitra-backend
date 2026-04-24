import express from "express";
import {
  getAllReviews,
  getReviewById,
} from "../controllers/reviews.controller.js";

const router = express.Router();

// Routes
router.get("/", getAllReviews);
router.get("/:id", getReviewById);

export default router;
