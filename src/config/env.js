import dotenv from "dotenv";

const nodeEnv = process.env.NODE_ENV?.trim();
const envFile = `.env.${nodeEnv === "production" ? "production" : "development"}`;

dotenv.config({ path: envFile });
