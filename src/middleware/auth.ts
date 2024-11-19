import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import logger from "../utils/logger";

// Middleware to verify JWT token
export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  logger.debug({ authHeader }, "[authenticateToken] Authenticating token");

  const token = authHeader && authHeader.split(" ")[1];
  logger.debug({ token }, "[authenticateToken] Token");

  if (!token) {
    logger.error("[authenticateToken] No token provided");
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      logger.error({ err }, "[authenticateToken] Error verifying token");
      res.sendStatus(403);
      return;
    }

    logger.debug({ user }, "[authenticateToken] User");
    (req as any).user = user; // Attach user data to request
    next();
  });
};
