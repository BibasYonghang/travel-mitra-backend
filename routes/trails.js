import express from "express";
import { getAllTrails, getTrailById, createTrail } from "../controllers/trailController.js";

const router = express.Router();

router.get("/", getAllTrails);
router.get("/:id", getTrailById);
router.post("/", createTrail);

export default router;
