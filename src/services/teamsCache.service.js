import db from "../db/mysql.js";
import {
  fetchAllTeams,
  fetchTeamById,
  fetchPlayerById
} from "./sportmonksTeams.service.js";

const CACHE_HOURS = 24;

function isFresh(updatedAt) {
  if (!updatedAt) return false;
  return (
    new Date(updatedAt).getTime() >
    Date.now() - CACHE_HOURS * 60 * 60 * 1000
  );
}

/* ============================
   🟢 GET ALL TEAMS (CACHED)
============================ */
export async function getTeamsCached() {
  const [rows] = await db.query(
    "SELECT * FROM teams ORDER BY name ASC"
  );

  // ✅ Use cache ONLY if rows exist AND valid JSON exists AND cache is fresh
  if (
    rows.length &&
    rows[0].data &&
    isFresh(rows[0].updated_at)
  ) {
    return rows
      .map(r => {
        if (!r.data) return null;
        try {
          return JSON.parse(r.data);
        } catch (e) {
          return null;
        }
      })
      .filter(Boolean);
  }

  // 🔄 Cache expired or invalid → fetch from API
  const teams = await fetchAllTeams();

  for (const t of teams) {
    await db.query(`
      INSERT INTO teams (id, name, code, image_path, country_id, data)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        code = VALUES(code),
        image_path = VALUES(image_path),
        country_id = VALUES(country_id),
        data = VALUES(data),
        updated_at = NOW()
    `, [
      t.id,
      t.name,
      t.code,
      t.image_path,
      t.country_id,
      JSON.stringify(t)
    ]);
  }

  return teams;
}

/* ============================
   🔵 GET TEAM DETAILS (CACHED)
============================ */
export async function getTeamDetailsCached(teamId) {
  const [rows] = await db.query(
    "SELECT * FROM teams WHERE id = ?",
    [teamId]
  );

  if (
    rows.length &&
    rows[0].data &&
    isFresh(rows[0].updated_at)
  ) {
    try {
      return JSON.parse(rows[0].data);
    } catch (e) {
      // fall through to API fetch
    }
  }

  const team = await fetchTeamById(teamId);

  await db.query(`
    INSERT INTO teams (id, name, code, image_path, country_id, data)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      data = VALUES(data),
      updated_at = NOW()
  `, [
    team.id,
    team.name,
    team.code,
    team.image_path,
    team.country_id,
    JSON.stringify(team)
  ]);

  return team;
}

/* ============================
   🟣 GET PLAYER DETAILS (CACHED)
============================ */
export async function getPlayerDetailsCached(playerId) {
  const [rows] = await db.query(
    "SELECT * FROM players WHERE id = ?",
    [playerId]
  );

  if (
    rows.length &&
    rows[0].data &&
    isFresh(rows[0].updated_at)
  ) {
    try {
      return JSON.parse(rows[0].data);
    } catch (e) {
      // fall through to API fetch
    }
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
