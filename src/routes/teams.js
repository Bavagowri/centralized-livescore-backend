import express from "express";
import {
  getTeamsCached,
  getTeamDetailsCached,
  getPlayerDetailsCached
} from "../services/teamsCache.service.js";

const router = express.Router();

// All teams
router.get("/", async (req, res) => {
  const data = await getTeamsCached();
  res.json({ data });
});

// Team details
router.get("/:teamId", async (req, res) => {
  const data = await getTeamDetailsCached(req.params.teamId);
  res.json({ data });
});

// Player details
router.get("/player/:playerId", async (req, res) => {
  const data = await getPlayerDetailsCached(req.params.playerId);
  res.json({ data });
});

export default router;
