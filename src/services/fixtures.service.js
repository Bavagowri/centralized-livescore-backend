import db from "../db/mysql.js";

const BASE_SELECT = `
SELECT 
  f.id,
  f.starting_at,
  f.status,
  f.live,
  f.note,

  l.id AS league_id,
  l.name AS league_name,
  l.image_path AS league_logo,
  l.type AS league_type,

  lt.id AS localteam_id,
  lt.name AS localteam_name,
  lt.image_path AS localteam_logo,

  vt.id AS visitorteam_id,
  vt.name AS visitorteam_name,
  vt.image_path AS visitorteam_logo,

  v.name AS venue_name,
  v.city AS venue_city
FROM fixtures f
JOIN leagues l ON l.id = f.league_id
JOIN teams lt ON lt.id = f.localteam_id
JOIN teams vt ON vt.id = f.visitorteam_id
LEFT JOIN venues v ON v.id = f.venue_id
`;
// 🟢 LIVE
export async function getLiveFixtures() {
  const [rows] = await db.query(`
    ${BASE_SELECT}
    WHERE f.live = 1
    ORDER BY f.starting_at DESC
  `);
  return rows;
}


// 🔵 RECENT (last 45 days)
export async function getRecentFixtures() {
  const [rows] = await db.query(`
    ${BASE_SELECT}
    WHERE f.starting_at >= DATE_SUB(CURDATE(), INTERVAL 45 DAY)
      AND f.starting_at < CURDATE()
    ORDER BY f.starting_at DESC
  `);
  return rows;
}


// 🟣 UPCOMING (next 90 days)
export async function getUpcomingFixtures() {
  const [rows] = await db.query(`
    ${BASE_SELECT}
    WHERE f.starting_at >= CURDATE()
      AND f.starting_at <= DATE_ADD(CURDATE(), INTERVAL 90 DAY)
    ORDER BY f.starting_at ASC
  `);
  return rows;
}