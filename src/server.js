import "./config/env.js";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import responseTime from "response-time";

import orderRoutes from "./routes/order.route.js";
import trailsRoutes from "./routes/trails.route.js";
import reviewsRoutes from "./routes/reviews.route.js";
import khaltiRoutes from "./routes/khalti.route.js";
import contactUsRoutes from "./routes/contactUs.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT ;
const FRONTEND = process.env.FRONTEND_URL;
const NODE_ENV = process.env.NODE_ENV ;

app.use(
  helmet({
    contentSecurityPolicy: true,
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    dnsPrefetchControl: true,
    frameguard: true,
    hidePoweredBy: true,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    referrerPolicy: { policy: "no-referrer" },
    xssFilter: true,
  }),
);

app.set("trust proxy", 1);

app.use(
  cors({
    origin: FRONTEND,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  }),
);

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests. Please try again later.",
});
app.use(globalLimiter);

app.use(express.json({ limit: "10kb" })); // prevent payload flood
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser());

app.use((req, res, next) => {
  if (typeof mongoSanitize.sanitize === "function") {
    if (req.body) req.body = mongoSanitize.sanitize(req.body);
    if (req.params) req.params = mongoSanitize.sanitize(req.params);
    if (req.headers) req.headers = mongoSanitize.sanitize(req.headers);
  }
  next();
});

app.use(compression());
app.use(responseTime());

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      skip: (req, res) => res.statusCode < 400,
    }),
  );
}

app.disable("x-powered-by");

app.use("/api", orderRoutes);
app.use("/api/trails", trailsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/khalti", khaltiRoutes);
app.use("/api/contact-us", contactUsRoutes);
app.use("/api", chatRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received. Shutting down...`);

      server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
      });

      setTimeout(() => {
        console.error("Forced shutdown");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);

    process.on("unhandledRejection", (err) => {
      console.error("UNHANDLED REJECTION:", err);
      shutdown("UNHANDLED_REJECTION");
    });

    process.on("uncaughtException", (err) => {
      console.error("UNCAUGHT EXCEPTION:", err);
      process.exit(1);
    });
  } catch (err) {
    console.error("DB CONNECTION FAILED:", err);
    process.exit(1);
  }
};

startServer();
