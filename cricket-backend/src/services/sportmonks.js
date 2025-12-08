// src/services/sportmonks.js
const axios = require("axios");
const NodeCache = require("node-cache");
const { SPORTMONKS_API_TOKEN } = require("../config");

const cache = new NodeCache(); // default no TTL, we’ll pass per-set

const api = axios.create({
  baseURL: "https://cricket.sportmonks.com/api/v2.0",
  params: {
    api_token: SPORTMONKS_API_TOKEN,
  },
});

/**
 * Helper to get with caching
 * @param {string} cacheKey
 * @param {Function} fetchFn - async function that calls SportMonks
 * @param {number} ttlSeconds
 */
async function getWithCache(cacheKey, fetchFn, ttlSeconds = 15) {
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const data = await fetchFn();
  cache.set(cacheKey, data, ttlSeconds);
  return data;
}

async function getLiveScores() {
  return getWithCache(
    "live_scores",
    async () => {
      const res = await api.get("/livescores", {
        // include extra relations if you want:
        // params: { include: "localteam,visitorteam,league,season" }
      });
      return res.data;
    },
    15 // cache for 15 seconds
  );
}

async function getFixtures({ leagueId, seasonId }) {
  const key = `fixtures_league_${leagueId || "all"}_season_${seasonId || "all"}`;

  return getWithCache(
    key,
    async () => {
      const res = await api.get("/fixtures", {
        params: {
          ...(leagueId ? { league_id: leagueId } : {}),
          ...(seasonId ? { season_id: seasonId } : {}),
        },
      });
      return res.data;
    },
    300 // cache for 5 minutes
  );
}

async function getFixtureById(id) {
  const key = `fixture_${id}`;
  return getWithCache(
    key,
    async () => {
      const res = await api.get(`/fixtures/${id}`);
      return res.data;
    },
    30 // 30 seconds
  );
}

module.exports = {
  getLiveScores,
  getFixtures,
  getFixtureById,
};
