import express from "express";
import { getRecentFixtures } from "../services/fixtures.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getRecentFixtures();
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Recent matches failed" });
  }
});

export default router;
