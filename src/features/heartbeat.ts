// ping.ts
import cron from "node-cron";
import axios from "axios";
import logger from "../utils/logger";

// Type definition for the options
interface PingOptions {
  intervalMinutes: number; // Time interval in minutes for the cron job
  url: string; // URL to ping
}

// Function to start the ping server with configurable options
export const heartbeat = (options: PingOptions): void => {
  const { intervalMinutes, url } = options;

  // Schedule the cron job based on the interval
  cron.schedule(`*/${intervalMinutes} * * * *`, async () => {
    try {
      logger.info(`[heartbeat] Pinging server every ${intervalMinutes} minutes...`);
      const response = await axios.get(url);
      logger.info(`[heartbeat] Server responded with status: ${response.status}`);
    } catch (err) {
      logger.error({ err }, `[heartbeat] Error pinging server`);
    }
  });

  logger.info(`[heartbeat] Ping server started with a ${intervalMinutes}-minute interval to ${url}`);
};
