async function callGroqLLM(prompt) {
  const { groq } = await import("./groq.js");

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "You are a helpful AI assistant." },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0].message.content;
}

export default callGroqLLM;
