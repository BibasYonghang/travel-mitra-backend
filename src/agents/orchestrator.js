import { gearRecommendationAgent } from "./gearRecommendationAgent.js";
import { generalTravelAgent } from "./generalTravelAgent.js";
import { locationInfoAgent } from "./localInfoAgent.js";
import { navigationAgent } from "./navigationAgent.js";
import { routeAgent } from "./routerAgent.js";
import { trekkingRouteAgent } from "./trekkingRouteAgent.js";
import { tripPlannerAgent } from "./tripPlannerAgent.js";

export async function orchestrator(message) {
  const agent = await routeAgent(message);

  switch (agent) {
    case "trip_planner_agent":
      return await tripPlannerAgent(message);

    case "trekking_route_agent":
      return await trekkingRouteAgent(message);

    case "location_info_agent":
      return await locationInfoAgent(message);

    case "gear_recommendation_agent":
      return await gearRecommendationAgent(message);

    case "navigation_agent":
      return await navigationAgent(message);

    default:
      return await generalTravelAgent(message);
  }
}
