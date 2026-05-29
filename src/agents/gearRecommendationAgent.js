import  callGroqLLM  from "../config/groqClient.js";

export async function gearRecommendationAgent(message) {
  const prompt = `
You are an expert hiking and trekking gear advisor.

Based on the user's request, provide gear recommendations including:
- Essential gear for the trek/hike
- Clothing suggestions for weather conditions
- Safety equipment recommendations
- Estimated budget ranges
- Brand suggestions where relevant
- Where to rent vs buy gear

Consider factors like:
- Trail difficulty and duration
- Season and weather
- Elevation and altitude
- Personal experience level

User request:
${message}
`;

  return await callGroqLLM(prompt);
}
