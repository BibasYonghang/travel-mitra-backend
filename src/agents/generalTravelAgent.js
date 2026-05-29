import  callGroqLLM from "../config/groqClient.js";

export async function generalTravelAgent(message) {
  return await callGroqLLM(message);
}
