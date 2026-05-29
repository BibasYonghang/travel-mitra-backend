import  callGroqLLM  from "../config/groqClient.js";

export async function routeAgent(message) {
  const prompt = `
You are a travel AI router for a hiking and trekking app.

Classify the user query into ONE category:

Options:
- trip_planner_agent (itinerary, travel plan, schedule)
- trekking_route_agent (hiking trails, trekking routes, mountains)
- location_info_agent (city info, weather, altitude, safety)
- gear_recommendation_agent (equipment, shoes, backpack, clothes)
- navigation_agent (routes, distance, directions)
- general_travel_agent (anything else travel related)

Return ONLY one word from the list.

User query:
${message}
`;

  const result = await callGroqLLM(prompt);
  return result.trim().toLowerCase();
}
