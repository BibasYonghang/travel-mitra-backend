import Trail from "../models/Trail.js";

// GET all trails
export const getAllTrails = async (req, res) => {
  try {
    const trails = await Trail.find();
    res.json(trails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single trail
export const getTrailById = async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id);
    if (!trail) return res.status(404).json({ message: "Trail not found" });
    res.json(trail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new trail
export const createTrail = async (req, res) => {
  const trail = new Trail(req.body);
  try {
    const newTrail = await trail.save();
    res.status(201).json(newTrail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
