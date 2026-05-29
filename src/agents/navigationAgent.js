import  callGroqLLM  from "../config/groqClient.js";

export async function navigationAgent(message) {
  const prompt = `
You are a navigation assistant.

Explain routes, distances, and travel directions in simple form.

User request:
${message}
`;

  return await callGroqLLM(prompt);
}
