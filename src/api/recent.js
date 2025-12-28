import { getFixturesBetween } from "./_utils/sportmonks.js";

export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const past = new Date(Date.now() - 45 * 86400000)
      .toISOString()
      .split("T")[0];

    const data = await getFixturesBetween(past, today);

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recent matches" });
  }
}
