import express, { Request, Response } from "express";
import logger from "../utils/logger";
import { authenticateToken } from "../middleware/auth";
import axios from "axios";

const router = express.Router();

// router.use(authenticateToken);

router.get("/", async (req: Request, res: Response) => {
  logger.info("[wikipedia] GET /wiki");

  const { search } = req.query;
  console.log(req.query);
  if (!search) {
    res.status(400).json({ error: "Missing search parameter" });
    return;
  }

  logger.info(`[wikipedia] Searching for: ${search}`);
  const url = `https://he.wikipedia.org/w/api.php?action=query&list=search&srsearch=${search}&format=json`;
  const response = await axios.get(url, {
    params: {
      action: "query",
      format: "json",
      prop: "extracts",
      exintro: true, // Fetch the introduction only
      explaintext: true, // Get plain text instead of HTML
      // srsearch: search,
      pageids: search, // Specify the page ID
      origin: "*", // Needed for CORS
    },
  });
  const data = response.data;
  // if (!query || !query.search || !query.search[0]) {
  //   res.status(404).json({ error: "No results found" });
  //   return;
  // }

  res.json({ data });
});

export default router;
