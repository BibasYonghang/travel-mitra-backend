import mongoose from "mongoose";

// Trails DB connection
export const trailsDB = mongoose.createConnection(process.env.MONGO_URI_TRAILS);

// Reviews DB connection
export const reviewsDB = mongoose.createConnection(
  process.env.MONGO_URI_REVIEWS,
);

// Optional logs
trailsDB.on("connected", () => {
  console.log("✅ Trails DB Connected");
});

reviewsDB.on("connected", () => {
  console.log("✅ Reviews DB Connected");
});
