import { handleAIChat } from "../services/ai.service.js";

export const chatController = async (req, res) => {
  try {
    const {
      message,
      difficulty,
      season,
      location,
      topK = 4,
      similarityThreshold = 0.62,
      useOrchestrator = true,
    } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await handleAIChat({
      message,
      difficulty,
      season,
      location,
      topK,
      similarityThreshold,
      useOrchestrator,
    });

    res.json({
      answer: result.answer,
      trails: result.trails,
      type: result.type,
      page: result.page,
      message: result.message,
      tool: result.tool,
      orchestratorRoute: result.orchestratorRoute,
      metadata: result.metadata,
    });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};
