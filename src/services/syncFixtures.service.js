import axios from "axios";
import db from "../db/mysql.js";

const API_TOKEN = process.env.SPORTMONKS_API_TOKEN;
const INCLUDES = "league,localteam,visitorteam,venue";

function toMySQLDate(isoString) {
  if (!isoString) return null;
  return new Date(isoString)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
}


export async function syncFixtures() {
  const today = new Date().toISOString().split("T")[0];
  const past = new Date(Date.now() - 45 * 86400000).toISOString().split("T")[0];
  const future = new Date(Date.now() + 90 * 86400000).toISOString().split("T")[0];

  const url = `https://cricket.sportmonks.com/api/v2.0/fixtures?filter[starts_between]=${past},${future}&include=${INCLUDES}&api_token=${API_TOKEN}`;

  const { data } = await axios.get(url);
  const fixtures = data.data || [];

  for (const f of fixtures) {
    // LEAGUE
    if (f.league) {
      await db.query(`
        INSERT INTO leagues (id, name, type, image_path)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          type = VALUES(type),
          image_path = VALUES(image_path)
      `, [
        f.league.id,
        f.league.name,
        f.league.type,
        f.league.image_path
      ]);
    }

    // TEAMS
    for (const team of [f.localteam, f.visitorteam]) {
      if (!team) continue;
      await db.query(`
        INSERT INTO teams (id, name, image_path)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          image_path = VALUES(image_path)
      `, [
        team.id,
        team.name,
        team.image_path
      ]);
    }

    // VENUE
    if (f.venue) {
      await db.query(`
        INSERT INTO venues (id, name, city, image_path)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          city = VALUES(city),
          image_path = VALUES(image_path)
      `, [
        f.venue.id,
        f.venue.name,
        f.venue.city,
        f.venue.image_path
      ]);
    }

    // FIXTURE
    await db.query(`
      INSERT INTO fixtures (
        id, league_id, localteam_id, visitorteam_id,
        venue_id, starting_at, status, live, note
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        starting_at = VALUES(starting_at),
        status = VALUES(status),
        live = VALUES(live),
        note = VALUES(note)
    `, [
      f.id,
      f.league_id,
      f.localteam_id,
      f.visitorteam_id,
      f.venue_id,
      toMySQLDate(f.starting_at),
      f.status,
      f.live ? 1 : 0,
      f.note
    ]);
  }

  return { inserted: fixtures.length };
}
