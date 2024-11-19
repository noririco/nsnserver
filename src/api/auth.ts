import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import logger from "../utils/logger";

const router = express.Router();

// Simple in-memory user database (for demo purposes)
const users = [
  { email: "admin@xxx.com", password: "adminpass", role: "Admin" },
  { email: "user@xxx.com", password: "userpass", role: "User" },
];

// Helper function to generate JWT token
function generateToken(user: { email: string; role: string }) {
  logger.debug({ user }, "[auth] Generating token");
  return jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
}

// Login route
// add session ?
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  logger.debug({ email, password }, "[auth] Login request received");
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    logger.error({ email, password }, "[auth] Invalid credentials");
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }

  // Access token, consider adding a refresh token
  const token = generateToken(user);

  logger.info({ email }, "[auth] Login successful");
  res.json({ token, role: user.role });
});

// Logout route (for client to clear token)
// Server-Side Token Invalidation:

// If you're using server-side token storage or sessions (such as with a session-based authentication system), making a logout API call ensures the token is invalidated on the server. This prevents any further usage of the token once the user logs out.
// Security:

// Invalidating tokens or sessions on the server can help prevent attacks like session fixation or token reuse after logout.
// Consistency:

// It ensures that your server knows about the user’s session termination, which is helpful for consistency across multiple devices or clients.
// Refresh Tokens:

// If you’re using refresh tokens, making a logout call can signal the server to revoke any associated refresh tokens, ensuring the user cannot get a new access token once they've logged out.
router.post("/logout", (req: Request, res: Response) => {
  logger.info("[auth] Logout request received");
  res.json({ message: "Logged out successfully" });
});

export default router;
