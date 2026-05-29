import callGroqLLM from "../config/groqClient.js";

export async function tripPlannerAgent(message) {
  const prompt = `
You are a travel planner expert.

Create structured travel itineraries (day-wise plans if needed).

User request:
${message}
`;

  return await callGroqLLM(prompt);
}
