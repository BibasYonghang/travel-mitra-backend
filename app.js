import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import esewaRoutes from "./routes/esewa.js";
import orderRoutes from "./routes/orderRoute.js";
import trailsRoutes from "./routes/trails.js";
import trailsReviews from "./routes/reviews.js";

const app = express();

// Middleware
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", orderRoutes);
app.use("/api/trails", trailsRoutes);
app.use("/api/reviews", trailsReviews);

app.get("/", (req, res) => res.send("Server is running"));

// Start Server & Connect to MongoDB
const startServer = async () => {
    try {
        // Use a single connection URL for your main database
        const mongoURL = process.env.MONGO_URL_TRAILS || process.env.MONGO_URL;

        if (!mongoURL) {
            throw new Error("MongoDB connection string not found in environment variables.");
        }

        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB connected successfully");

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error("Failed to connect to Database:", err.message);
        process.exit(1);
    }
};

startServer();
