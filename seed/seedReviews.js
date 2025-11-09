import Reviews from "../models/Reviews.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("REVIEWS DB URL:", process.env.MONGO_URL_REVIEWS);

const reviews = [
    {
        name: "Sita Shrestha",
        comment: "Loved the Sunrise Hill trail! The early morning trek was peaceful, and the sunrise over the valley was breathtaking. The trail was well-marked, and I felt completely safe throughout. Highly recommend for beginners and anyone who loves nature.",
        rating: 5,
    },
    {
        name: "Ram Thapa",
        comment: "Forest Trek was challenging but totally worth it. The trail had steep climbs, yet the lush greenery and waterfalls made every step enjoyable. The guide was knowledgeable and made the trek safe and fun. Highly recommend for adventure and nature lovers.",
        rating: 4,
    },
    {
        name: "Mina Koirala",
        comment: "River View Trail had amazing views! Walking along the riverside while birds chirped and the breeze kept the weather perfect made this trek unforgettable. The local homestays were welcoming. Highly recommend for those seeking a serene trekking experience.",
        rating: 5,
    },
    {
        name: "Bibas Yonghang",
        comment: "Ghandruk trek was truly beautiful. The panoramic views of Annapurna and Machhapuchhre were surreal, and the Gurung culture along the way was fascinating. Every day brought a new hidden gem. Highly recommend for  hikers seeking a memorable journey.",
        rating: 5,
    },
]

const seedReviews = async () => {

    await mongoose.connect(process.env.MONGO_URL_REVIEWS);
    await Reviews.deleteMany({}) //delete all the old data
    await Reviews.insertMany(reviews) //add new data
    console.log("Database seeded with reviews")
    mongoose.disconnect();
}

seedReviews();