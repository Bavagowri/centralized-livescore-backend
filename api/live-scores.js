import { fetchLiveScores } from "./_utils/sportmonks.js";

export default async function handler(req, res) {
  try {
    const data = await fetchLiveScores();

    // small cache – live data
    res.setHeader("Cache-Control", "s-maxage=15, stale-while-revalidate");
    res.json({ data });
  } catch (e) {
    res.status(500).json({ error: "Live scores failed" });
  }
}
