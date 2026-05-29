import dotenv from "dotenv";
dotenv.config({ path: ".env/development" });

import mongoose from "mongoose";
import Trail from "../src/models/Trail.js";
import { createEmbedding } from "../src/services/embedding.service.js";
import { index } from "../src/config/pinnecone.js";

const seedTrails = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const trails = await Trail.find();
    console.log(`Found ${trails.length} trails`);

    for (const trail of trails) {
      try {
        const text = `Trail Name: ${trail.name}\nLocation: ${trail.location}\nDifficulty: ${trail.difficulty}\nDistance: ${trail.distance}\nDuration: ${trail.duration || "N/A"}\nElevation: ${trail.elevation}\nBest Season: ${trail.bestSeason}\nStarting Point: ${trail.startingPoint}\nDescription: ${trail.description}`;

        const embedding = await createEmbedding(text);
        if (!Array.isArray(embedding) || embedding.length === 0) {
          continue;
        }

        await index.upsert({
          records: [
            {
              id: trail._id.toString(),
              values: embedding,
              metadata: {
                name: trail.name,
                location: trail.location,
                difficulty: trail.difficulty,
                distance: trail.distance,
                duration: trail.duration,
                elevation: trail.elevation,
                bestSeason: trail.bestSeason,
                startingPoint: trail.startingPoint,
                description: trail.description,
                image: trail.image,
              },
            },
          ],
        });

        console.log(`Seeded: ${trail.name}`);
      } catch (err) {
        console.log(`Failed to seed ${trail.name}:`, err.message);
      }
    }

    console.log("Full MongoDB → Pinecone sync complete");
    await mongoose.disconnect();
  } catch (error) {
    console.log("Seeder Error:", error);
  }
};

seedTrails();
