import { fetchFixtures } from "./_utils/sportmonks.js";

export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const past = new Date(Date.now() - 45 * 86400000)
      .toISOString()
      .split("T")[0];

    const data = await fetchFixtures(past, today);

    res.setHeader("Cache-Control", "s-maxage=300");
    res.json({ data });
  } catch {
    res.status(500).json({ error: "Recent failed" });
  }
}
