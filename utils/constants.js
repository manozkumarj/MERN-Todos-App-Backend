import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_DB_URI = process.env.MONGO_DB_URI;
export const JWT_SESSION_SECRET = process.env.JWT_SESSION_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const SALT = process.env.SALT;
export const NODE_ENV = process.env.NODE_ENV;
export const REFRESH_PATH = "/auth/v1/refresh";
export const SECURE = process.env.NODE_ENV === "production";