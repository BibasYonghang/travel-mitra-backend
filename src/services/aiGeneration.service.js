import { groq } from "../config/groq.js";

export const generateAiAnswer = async ({ messages }) => {
  if (!groq) {
    throw new Error(
      "GROQ is not configured. Set GROQ_API_KEY in backend/.env.development to a valid key.",
    );
  }

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages,
    temperature: 0.25,
    max_tokens: 450,
    top_p: 1,
  });

  const answer = response.choices?.[0]?.message?.content?.trim();
  if (!answer) {
    throw new Error("GROQ returned an empty chat response.");
  }

  return answer;
};
