// ping.ts
import cron from "node-cron";
import axios from "axios";

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
      console.log(`Pinging server every ${intervalMinutes} minutes...`);
      const response = await axios.get(url);
      console.log("Server responded with status:", response.status);
    } catch (error) {
      console.error("Error pinging server:", error);
    }
  });

  console.log(`Ping server started with a ${intervalMinutes}-minute interval to ${url}`);
};
