import express, { Request, Response } from "express";

const router = express.Router();

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
  // Return all gems
  // call mongodb
  const gems = [...mockGems];
  res.json(gems);
});

router.post("/", (req: Request, res: Response) => {
  const gems = req.body;
  res.json(gems);
});

router.put("/", (req: Request, res: Response) => {
  const gems = req.body;
  res.json(gems);
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  // Remove gem from array
  let gems = req.body;
  gems = gems.filter((gem: any) => gem._id !== id);
  res.json(gems);
});

export default router;
