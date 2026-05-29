import "./env.js";

import Groq from "groq-sdk";

console.log(process.env.GROQ_API_KEY);

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey || apiKey.trim() === "") {
  throw new Error("GROQ_API_KEY must be set in backend/.env.development.");
}

export const groq = new Groq({
  apiKey,
});
