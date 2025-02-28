import express, { Request, Response } from "express";
import logger from "../utils/logger";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.use(authenticateToken);

const mockGems = [
  {
    _id: "67237759e8228b7dde8f00e0",
    title: "Diamond",
    content: "A precious gemstone known for its hardness and brilliance.",
    createdAt: "2024-10-31T12:00:00Z",
    updatedAt: "2024-10-31T12:00:00Z",
    imageUrl: "http://example.com/images/diamond.jpg",
    type: "precious",
  },
  {
    _id: "67237759e8228b7dde8f00e1",
    title: "Emerald",
    content: "A precious gemstone known for its beauty and rarity.",
    createdAt: "2024-10-31T12:00:00Z",
    updatedAt: "2024-10-31T12:00:00Z",
    imageUrl: "http://example.com/images/emerald.jpg",
    type: "precious",
  },
  {
    _id: "67237759e8228b7dde8f00e2",
    title: "Ruby",
    content: "A precious gemstone known for its red color and sparkling appearance.",
    createdAt: "2024-10-31T12:00:00Z",
    updatedAt: "2024-10-31T12:00:00Z",
    imageUrl: "http://example.com/images/ruby.jpg",
    type: "precious",
  },
  {
    _id: "67237759e8228b7dde8f00e3",
    title: "Sapphire",
    content: "A precious gemstone known for its blue color and rarity.",
    createdAt: "2024-10-31T12:00:00Z",
    updatedAt: "2024-10-31T12:00:00Z",
    imageUrl: "http://example.com/images/sapphire.jpg",
    type: "precious",
  },
];

router.get("/", (req: Request, res: Response) => {
  logger.info("[gems] GET /gems");
  // Return all gems
  // call mongodb
  const gems = [...mockGems];
  res.json(gems);
});

router.post("/", (req: Request, res: Response) => {
  logger.info("[gems] POST /gems");
  const { title, content, imageUrl, type } = req.body;
  const generateId = () => [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
  const newGem = {
    _id: generateId(),
    title,
    content,
    imageUrl,
    type,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockGems.push(newGem);
  res.json(mockGems);
});

router.put("/", (req: Request, res: Response) => {
  logger.info("[gems] PUT /gems");
  const gems = req.body;
  res.json(gems);
});

// DELETE a gem by ID
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  logger.info(`[gems] DELETE /gems/${id}`);
  const index = mockGems.findIndex((gem) => gem._id === id);
  if (index === -1) {
    logger.warn(`[gems] Gem not found: ${id}`);
    res.status(404).json({ error: "Gem not found" });
    return;
  }

  mockGems.splice(index, 1);
  logger.info(`[gems] Gem deleted: ${id}`);
  res.json(mockGems);
});

export default router;
