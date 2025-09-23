import mongoose from "mongoose";
import dotenv from "dotenv";
import Trail from "../models/Trail.js";

dotenv.config();

const trails = [
    {
        name: "Chisapani Trail",
        location: "Shivapuri Nagarjun National Park",
        difficulty: "Hard",
        distance: 12,
        duration: "5 hours",
        description: "A beautiful but challenging trail through forests and hills.",
        image: "https://example.com/chisapani.jpg",
        coordinates: { lat: 27.7395, lng: 85.3460 }
    },
    {
        name: "Nagarkot Sunrise Trail",
        location: "Nagarkot",
        difficulty: "Moderate",
        distance: 6,
        duration: "3 hours",
        description: "Perfect trail for sunrise views over the Himalayas.",
        image: "https://example.com/nagarkot.jpg",
        coordinates: { lat: 27.7063, lng: 85.4041 }
    },
    {
        name: "Poon Hill Trek",
        location: "Ghorepani",
        difficulty: "Moderate",
        distance: 10,
        duration: "4-5 hours",
        description: "Famous for stunning Himalayan views and sunrise.",
        image: "https://example.com/poonhill.jpg",
        coordinates: { lat: 28.3600, lng: 83.9480 }
    }
    // Add more trails here
];

const seedDB = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    await Trail.deleteMany({}); // Clear old data
    await Trail.insertMany(trails); // Add new data
    console.log("Database seeded with trails!");
    mongoose.disconnect();
};

seedDB();
