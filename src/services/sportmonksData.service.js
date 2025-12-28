import axios from "axios";

const API_TOKEN = process.env.SPORTMONKS_API_TOKEN;
const BASE = "https://cricket.sportmonks.com/api/v2.0";

// PLAYER
export async function fetchPlayerById(playerId) {
  const url = `${BASE}/players/${playerId}?include=country,career,teams&api_token=${API_TOKEN}`;
  const { data } = await axios.get(url);
  return data.data;
}

// RANKINGS
export async function fetchRankings(type, format, gender = "men") {
  const url = `${BASE}/team-rankings?filter[type]=${type}&filter[format]=${format}&filter[gender]=${gender}&api_token=${API_TOKEN}`;
  const { data } = await axios.get(url);
  return data.data;
}
