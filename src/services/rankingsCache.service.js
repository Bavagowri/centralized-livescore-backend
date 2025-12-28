import db from "../db/mysql.js";
import { fetchRankings } from "./sportmonksData.service.js";
import { isFresh } from "../utils/cacheUtils.js";

const RANKING_CACHE_HOURS = 6;

export async function getRankingsCached(type, format, gender = "men") {
  const [rows] = await db.query(
    `
    SELECT * FROM rankings
    WHERE type = ? AND format = ? AND gender = ?
    `,
    [type, format, gender]
  );

  if (
    rows.length &&
    rows[0].data &&
    isFresh(rows[0].updated_at, RANKING_CACHE_HOURS)
  ) {
    return JSON.parse(rows[0].data);
  }

  const rankings = await fetchRankings(type, format, gender);

  await db.query(`
    INSERT INTO rankings (type, format, gender, data)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      data = VALUES(data),
      updated_at = NOW()
  `, [
    type,
    format,
    gender,
    JSON.stringify(rankings)
  ]);

  return rankings;
}
