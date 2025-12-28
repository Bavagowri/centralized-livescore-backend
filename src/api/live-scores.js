import { getLiveScores } from "./_utils/sportmonks.js";

export default async function handler(req, res) {
  try {
    const data = await getLiveScores();

    res.setHeader("Cache-Control", "s-maxage=15, stale-while-revalidate");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch live scores" });
  }
}
