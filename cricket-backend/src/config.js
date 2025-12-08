import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const SPORTMONKS_API_TOKEN = process.env.SPORTMONKS_API_TOKEN;
export const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;