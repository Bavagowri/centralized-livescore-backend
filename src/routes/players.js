import express from "express";
import { getPlayerCached } from "../services/playersCache.service.js";

const router = express.Router();

router.get("/:playerId", async (req, res) => {
  const data = await getPlayerCached(req.params.playerId);
  res.json({ data });
});

export default router;
