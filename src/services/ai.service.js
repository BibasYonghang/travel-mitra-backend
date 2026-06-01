import { createEmbedding } from "./embedding.service.js";
import { retrieveTrails } from "./retrieval.service.js";
import Trail from "../models/Trail.js";
import { buildAiPromptMessages } from "./prompt.service.js";
import { generateAiAnswer } from "./aiGeneration.service.js";
import { orchestrator } from "../agents/orchestrator.js";

const extractJsonObject = (text) => {
  if (!text) return null;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    return null;
  }
};

export const handleAIChat = async ({
  message,
  difficulty,
  season,
  location,
  topK = 4,
  similarityThreshold = 0.62,
  useOrchestrator = true,
}) => {
  if (!message?.trim()) {
    throw new Error("A chat message is required.");
  }

  // Use orchestrator for intelligent routing
  let orchestratorResponse = null;
  if (useOrchestrator) {
    try {
      orchestratorResponse = await orchestrator(message);
    } catch (err) {
      console.warn("Orchestrator error, falling back to RAG:", err.message);
    }
  }

  if (
    orchestratorResponse &&
    typeof orchestratorResponse === "object" &&
    orchestratorResponse.type === "navigate"
  ) {
    return {
      answer: orchestratorResponse.message || "Navigating you now...",
      type: "navigate",
      page: orchestratorResponse.page,
      message: orchestratorResponse.message || orchestratorResponse.answer,
      trails: [],
      orchestratorRoute: "navigate",
      metadata: {
        retrievedCount: 0,
        returnedCount: 0,
        similarityThreshold,
      },
    };
  }

  let trailsForAI = [];
  let retrievedCount = 0;

  let fullTrails = [];
  try {
    const queryEmbedding = await createEmbedding(message);

    const vectorResults = await retrieveTrails({
      queryEmbedding,
      topK,
    });

    const ids = vectorResults.map((r) => r.id);
    fullTrails = ids.length > 0 ? await Trail.find({ _id: { $in: ids } }) : [];
    retrievedCount = fullTrails.length;

    const scoredTrails = vectorResults
      .filter((r) => r.score >= similarityThreshold)
      .map((r) => r.id);

    const filteredTrails = fullTrails.filter((t) =>
      scoredTrails.includes(t._id.toString()),
    );

    trailsForAI = filteredTrails.length > 0 ? filteredTrails : fullTrails;
  } catch (err) {
    console.warn("RAG embedding/retrieval failed, continuing without RAG:", err.message);
    trailsForAI = [];
  }

  const messages = buildAiPromptMessages({
    query: message,
    trails: trailsForAI,
    filters: { difficulty, season, location },
  });

  if (orchestratorResponse) {
    messages[1].content += `\n\nAgent Guidance:\n${orchestratorResponse}`;
  }

  const answer = await generateAiAnswer({ messages });
  const parsedResponse = extractJsonObject(answer);

  if (parsedResponse?.type) {
    return {
      answer: parsedResponse.answer || parsedResponse.message || answer,
      type: parsedResponse.type,
      page: parsedResponse.page,
      message: parsedResponse.message,
      tool: parsedResponse.tool,
      trails: trailsForAI,
      orchestratorRoute: orchestratorResponse ? "used" : "skipped",
      metadata: {
        retrievedCount,
        returnedCount: trailsForAI.length,
        similarityThreshold,
      },
    };
  }

  return {
    answer,
    trails: trailsForAI,
    type: "chat",
    orchestratorRoute: orchestratorResponse ? "used" : "skipped",
    metadata: {
      retrievedCount,
      returnedCount: trailsForAI.length,
      similarityThreshold,
    },
  };
};
