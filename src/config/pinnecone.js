import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

export const index = pinecone.index("travel-mitra");
