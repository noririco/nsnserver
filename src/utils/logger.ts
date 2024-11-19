import pino from "pino";
import { LOG_LEVEL, NODE_ENV } from "../config/env";

const logger = pino({
  level: LOG_LEVEL || "info", // Configure log level
  transport:
    NODE_ENV === "development"
      ? {
          target: "pino-pretty", // Pretty-print in development
          options: { colorize: true },
        }
      : undefined, // Use JSON logs in production
  base: { pid: false }, // Remove default process ID from logs
});

export default logger;
