import { index } from "../config/pinnecone.js";

const normalizeFilterValue = (value) => {
  if (value === undefined || value === null || value === "") return undefined;
  return String(value).trim().toLowerCase();
};

export const retrieveTrails = async ({ queryEmbedding, topK = 5 }) => {
  const queryResponse = await index.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
  });

  return (queryResponse.matches || []).map((match) => ({
    id: match.id,
    score: match.score,
  }));
};

export const retrieveProducts = retrieveTrails;
