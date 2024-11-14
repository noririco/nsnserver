import "dotenv/config";

export const RENDER_SERVER_URL = process.env.RENDER_SERVER_URL || "";
export const RENDER_CLIENT_URL = process.env.RENDER_CLIENT_URL || "";
export const PROD = process.env.NODE_ENV === "production";
export const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
export const PORT = process.env.PORT || 3000;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
