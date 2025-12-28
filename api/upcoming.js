import { getFixturesBetween } from "../_utils/sportmonks.js";

export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const future = new Date(Date.now() + 90 * 86400000)
      .toISOString()
      .split("T")[0];

    const data = await getFixturesBetween(today, future);

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch upcoming matches" });
  }
}
