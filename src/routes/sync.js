import express from "express";
import { syncFixtures } from "../services/syncFixtures.service.js";

const router = express.Router();

router.get("/sync-fixtures", async (req, res) => {
  try {
    const result = await syncFixtures();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sync failed" });
  }
});

export default router;
