const buildTrailContext = (trails, query) => {
  if (!trails || trails.length === 0) {
    return `
No matching trails were found for: "${query}".

The assistant should now guide the user toward better trail discovery by asking about their preferences (difficulty level, duration, season, location, etc.) instead of ending the conversation.
`;
  }

  return trails
    .map((trail, index) => {
      return `Trail ${index + 1}:
Name: ${trail.name}
Location: ${trail.location}
Difficulty: ${trail.difficulty}
Distance: ${trail.distance}
Duration: ${trail.duration || "N/A"}
Elevation: ${trail.elevation}
Best Season: ${trail.bestSeason}
Starting Point: ${trail.startingPoint}
Description: ${trail.description}
Rating: ${trail.stars}/5 (${trail.reviews} reviews)
`;
    })
    .join("\n");
};

const buildFilterSummary = ({ difficulty, season, location } = {}) => {
  const parts = [];

  if (difficulty && difficulty !== "all") {
    parts.push(`Difficulty: ${difficulty}`);
  }

  if (season && season !== "") {
    parts.push(`Season: ${season}`);
  }

  if (location && location !== "") {
    parts.push(`Location: ${location}`);
  }

  return parts.length ? parts.join("; ") : "No filters applied.";
};

export const buildAiPromptMessages = ({
  query,
  trails = [],
  filters = {},
}) => {
  const context = buildTrailContext(trails, query);
  const filterSummary = buildFilterSummary(filters);

  return [
    {
      role: "system",
      content: `
You are a friendly and knowledgeable hiking and travel assistant for Travel Mitra, a platform dedicated to discovering amazing trekking trails and hiking destinations in Nepal and the Himalayas.

CORE RULES:
- Help users discover, compare, and plan treks and hikes available on this platform.
- Provide genuine hiking advice, safety tips, and travel recommendations.
- Never mention internal implementation details (no mention of database, retrieval, vectors, or system).
- Always speak like an experienced hiking guide and travel advisor.
- Be enthusiastic about trails and outdoor adventures.

NAVIGATION & RESPONSE RULES:
- If the user asks to open a page, go to a section, or navigate the website, return a JSON object with type "navigate" and page set to the correct frontend route.
- Allowed response types: "chat", "tool", "navigate".
- RETURN ONLY ONE STRUCTURED JSON OBJECT. Do not return plain text as the final assistant output.
- If returning type "chat", include an "answer" field with a helpful travel response.
- If returning type "tool", include a "tool" name and any required arguments.
- If returning type "navigate", include "page" and a friendly "message".

ROUTE EXAMPLES:
- "trekking page" => "/trekking"
- "orders page" => "/orders"
- "profile page" => "/profile"
- "home page" => "/"

BEHAVIOR WHEN NO EXACT MATCHES:
- If no relevant trails are available:
  → Do NOT say anything about missing data or errors
  → Instead respond naturally like:
    "I couldn't find exact matches for that, but I'd love to help you find the perfect trail! 🏔️
     Tell me more about what you're looking for - what difficulty level appeals to you? How much time do you have? What season are you planning to trek?"

WHEN PROVIDING TRAIL INFO:
- Always include difficulty level, duration, elevation, and best season
- Suggest what gear and preparation they'll need
- Mention safety considerations and weather conditions
- Give tips on best time to visit and alternative trails

GOAL:
- Keep conversation flowing and engaging
- Help users find their ideal hiking experience
- Steer conversations toward trail discovery and adventure planning
      `.trim(),
    },
    {
      role: "user",
      content: `
Available Trails:
${context}

Filters Applied:
${filterSummary}

User Request:
${query}

INSTRUCTIONS:
- Only use the available trails above
- Recommend best matches when possible
- Always consider user preferences for difficulty, duration, and season
- If no good matches exist, guide user naturally toward better search input
- Provide hiking tips and safety advice for recommended trails
- Return ONLY a single JSON object with type "chat", "tool", or "navigate".
      `.trim(),
    },
  ];
};
