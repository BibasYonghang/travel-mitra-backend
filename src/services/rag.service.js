import { createEmbedding } from "./embedding.service.js";
import { index } from "../config/pinecone.js";
import { groq } from "../config/groq.js";

export const askAI = async (question) => {
  const queryEmbedding = await createEmbedding(question);

  const results = await index.query({
    vector: queryEmbedding,
    topK: 5,
    includeMetadata: true,
  });

  const context = (results.matches || [])
    .map((item) => {
      return `Trail Name: ${item.metadata.name}
Location: ${item.metadata.location || "N/A"}
Difficulty: ${item.metadata.difficulty || "N/A"}
Distance: ${item.metadata.distance || "N/A"}
Duration: ${item.metadata.duration || "N/A"}
Elevation: ${item.metadata.elevation || "N/A"}
Best Season: ${item.metadata.bestSeason || "N/A"}
Description: ${item.metadata.description || "N/A"}
`;
    })
    .join("\n");

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are a hiking and travel assistant. Only use the provided trail context and do not invent metadata.",
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion:\n${question}`,
      },
    ],
  });

  return completion.choices[0].message.content;
};
