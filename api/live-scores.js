import { getLiveScores } from "./_utils/sportmonks.js";

export default async function handler(req, res) {
  try {
    const data = await getLiveScores();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
