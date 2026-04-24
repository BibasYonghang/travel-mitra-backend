import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "production"}`;
dotenv.config({ path: envFile });
