import express from "express";
import { getRankingsCached } from "../services/rankingsCache.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { type, format, gender } = req.query;
  const data = await getRankingsCached(type, format, gender);
  res.json({ data });
});

export default router;
