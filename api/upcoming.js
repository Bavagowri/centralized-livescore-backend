import { fetchFixtures } from "./_utils/sportmonks.js";

export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const future = new Date(Date.now() + 90 * 86400000)
      .toISOString()
      .split("T")[0];

    const data = await fetchFixtures(today, future);

    // cache longer – upcoming
    res.setHeader("Cache-Control", "s-maxage=300");
    res.json({ data });
  } catch {
    res.status(500).json({ error: "Upcoming failed" });
  }
}
