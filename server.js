import dotenv from "dotenv";
dotenv.config({ path: "./.env.production" });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import esewaRoutes from "./routes/esewa.route.js";
import orderRoutes from "./routes/order.route.js";
import trailsRoutes from "./routes/trails.route.js";
import reviewsRoutes from "./routes/reviews.route.js"; // modified name for clarity

const app = express();

const FRONTEND = process.env.FRONTEND_URL;

// Middleware

app.use(
  cors({
    origin: FRONTEND,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", orderRoutes);
app.use("/api/trails", trailsRoutes);
app.use("/api/reviews", reviewsRoutes);

app.get("/", (req, res) => res.send("Server is running"));

// Start Server & Connect to MongoDB
const startServer = async () => {
  try {
    // Connect to Trails DB
    if (!process.env.MONGO_URL_TRAILS) {
      throw new Error("MONGO_URL_TRAILS not defined in .env");
    }
    await mongoose.connect(process.env.MONGO_URL_TRAILS);
    console.log("Trails MongoDB connected successfully");

    // Connect to Reviews DB using a separate connection
    if (!process.env.MONGO_URL_REVIEWS) {
      throw new Error("MONGO_URL_REVIEWS not defined in .env");
    }
    const reviewsConnection = await mongoose.createConnection(
      process.env.MONGO_URL_REVIEWS
    );
    app.locals.reviewsDB = reviewsConnection; // store connection to use in router
    console.log("Reviews MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to Database:", err.message);
    process.exit(1);
  }
};

startServer();
