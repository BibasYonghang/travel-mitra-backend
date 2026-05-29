import callGroqLLM  from "../config/groqClient.js";

export async function trekkingRouteAgent(message) {
  const prompt = `
You are a trekking and hiking expert.

Provide:
- trail name
- difficulty level
- duration
- elevation (if known)
- safety tips

User request:
${message}
`;

  return await callGroqLLM(prompt);
}
