import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import { PORT } from "./config/env";
import authRoutes from "./api/auth";
import gemsRoutes from "./api/gems";
import openaiRoutes from "./api/openai";

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Path to the Angular app's build directory
// const angularAppPath = path.resolve(__dirname, "../../nsnapp/dist/nsnapp/browser");

// Serve Angular static files
// app.use(express.static(angularAppPath));

app.use("/api/openai", openaiRoutes);
app.use("/api/gems", gemsRoutes);
app.use("/api/auth", authRoutes);

// Catch-all route to serve Angular's index.html for non-API routes
app.get(/(.*)/, (req: Request, res: Response) => {
  // res.sendFile(path.join(angularAppPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
