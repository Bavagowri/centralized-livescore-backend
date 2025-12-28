import db from "../db/mysql.js";
import { fetchPlayerById } from "./sportmonksData.service.js";
import { isFresh } from "../utils/cacheUtils.js";

const PLAYER_CACHE_HOURS = 24;

export async function getPlayerCached(playerId) {
  const [rows] = await db.query(
    "SELECT * FROM players WHERE id = ?",
    [playerId]
  );

  if (
    rows.length &&
    rows[0].data &&
    isFresh(rows[0].updated_at, PLAYER_CACHE_HOURS)
  ) {
    return JSON.parse(rows[0].data);
  }

  const player = await fetchPlayerById(playerId);

  await db.query(`
    INSERT INTO players (id, name, image_path, country_id, data)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      data = VALUES(data),
      updated_at = NOW()
  `, [
    player.id,
    player.name,
    player.image_path,
    player.country_id,
    JSON.stringify(player)
  ]);

  return player;
}
