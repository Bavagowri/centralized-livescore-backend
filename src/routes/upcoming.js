import express from "express";
import { getUpcomingFixtures } from "../services/fixtures.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getUpcomingFixtures();
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upcoming matches failed" });
  }
});

export default router;
