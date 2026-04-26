import "./config/env.js";
import express from "express";
import cors from "cors";

import orderRoutes from "./routes/order.route.js";
import trailsRoutes from "./routes/trails.route.js";
import reviewsRoutes from "./routes/reviews.route.js";
import khaltiRoutes from "./routes/khalti.route.js";

// IMPORTANT: only import db file (it initializes connections)
import "./config/db.js";

const app = express();

// ENV
const PORT = process.env.PORT;
const FRONTEND = process.env.FRONTEND_URL;

// MIDDLEWARE
app.use(
  cors({
    origin: FRONTEND,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api", orderRoutes);
app.use("/api/trails", trailsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/khalti", khaltiRoutes);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Server is running");
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
