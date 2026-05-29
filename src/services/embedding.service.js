import { groq } from "../config/groq.js";

const EMBEDDING_MODELS = [
  "text-embedding-3-large",
  "text-embedding-3-small",
  "embed-3-large",
  "embed-3-small",
  "text-embedding-3",
];

export const createEmbedding = async (text) => {
  if (!text || typeof text !== "string" || !text.trim()) {
    throw new Error("Text is required for embedding generation.");
  }

  let lastError = null;

  for (const model of EMBEDDING_MODELS) {
    try {
      const response = await groq.embeddings.create({
        model,
        input: text,
      });

      const embedding = response.data?.[0]?.embedding;
      if (embedding && Array.isArray(embedding)) {
        return embedding;
      }

      lastError = new Error(`Embedding generation returned invalid data for model ${model}.`);
    } catch (err) {
      lastError = err;
      const message = String(err?.message || "").toLowerCase();
      if (!message.includes("does not exist") && !message.includes("no access") && !message.includes("invalid_request_error")) {
        throw err;
      }
    }
  }

  throw new Error(
    `Embedding generation failed for all supported models: ${EMBEDDING_MODELS.join(", ")}. Last error: ${lastError?.message || "unknown"}`,
  );
};
