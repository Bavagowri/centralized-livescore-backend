import express from "express";
import { getLiveFixtures } from "../services/fixtures.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getLiveFixtures();
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Live matches failed" });
  }
});

export default router;
