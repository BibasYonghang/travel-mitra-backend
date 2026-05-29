import callGroqLLM from "../config/groqClient.js";

export async function locationInfoAgent(message) {
  const prompt = `
You are a travel location expert.

Give factual info about:
- place
- weather (if relevant)
- altitude
- best time to visit
- safety concerns

User request:
${message}
`;

  return await callGroqLLM(prompt);
}
