import callGroqLLM from "../config/groqClient.js";

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

export async function navigationAgent(message) {
  const prompt = `
You are an AI intent detector for Travel Mitra's frontend navigation.

Your job is to detect when a user is asking to navigate inside the website and return ONLY a structured JSON response.

Return exactly one JSON object with these fields:
- type: "navigate"
- page: the frontend route to navigate to
- message: a short friendly message for the user

Route examples:
- "trekking page" => "/trekking"
- "orders page" => "/orders"
- "profile page" => "/profile"
- "home page" => "/"

If the user is asking for a page or a section inside Travel Mitra, return type "navigate" and map the intent to the correct route.

User request:
${message}
`;

  const response = await callGroqLLM(prompt);
  const parsed = extractJsonObject(response);

  if (!parsed || parsed.type !== "navigate" || !parsed.page) {
    throw new Error("Navigation agent did not return a valid navigation response.");
  }

  return parsed;
}