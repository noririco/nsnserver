import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import { PORT, PROD, RENDER_CLIENT_URL, RENDER_SERVER_URL } from "./config/env";
import authRoutes from "./api/auth";
import gemsRoutes from "./api/gems";
import openaiRoutes from "./api/openai";
import { heartbeat } from "./features/heartbeat";

const app = express();

const corsOptions = {
  origin: PROD ? RENDER_CLIENT_URL : "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Enable CORS
app.use(cors(corsOptions));
// Parse JSON request bodies
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
  res.send("OK");
});

app.listen(PORT, () => {
  const url = PROD ? RENDER_SERVER_URL : `http://localhost:${PORT}`;

  if (PROD) {
    heartbeat({
      intervalMinutes: 15,
      url,
    });
  }

  console.log(`Server is running on ${url}`);
});
