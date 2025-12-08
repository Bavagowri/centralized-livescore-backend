// src/routes/cricket.js
const express = require("express");
const router = express.Router();

const {
  getLiveScores,
  getFixtures,
  getFixtureById,
} = require("../services/sportmonks");

// GET /api/live-scores
router.get("/live-scores", async (req, res) => {
  try {
    const data = await getLiveScores();
    res.json(data);
  } catch (err) {
    console.error("Error getting live scores:", err.message);
    res.status(500).json({ error: "Failed to fetch live scores" });
  }
});

// GET /api/fixtures?league_id=123&season_id=2024
router.get("/fixtures", async (req, res) => {
  const { league_id, season_id } = req.query;

  try {
    const data = await getFixtures({
      leagueId: league_id,
      seasonId: season_id,
    });
    res.json(data);
  } catch (err) {
    console.error("Error getting fixtures:", err.message);
    res.status(500).json({ error: "Failed to fetch fixtures" });
  }
});

// GET /api/fixtures/:id
router.get("/fixtures/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getFixtureById(id);
    res.json(data);
  } catch (err) {
    console.error("Error getting fixture:", err.message);
    res.status(500).json({ error: "Failed to fetch fixture" });
  }
});

module.exports = router;
