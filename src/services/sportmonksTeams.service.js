import axios from "axios";

const API_TOKEN = process.env.SPORTMONKS_API_TOKEN;
const BASE = "https://cricket.sportmonks.com/api/v2.0";

export async function fetchAllTeams() {
  const url = `${BASE}/teams?include=country,results&api_token=${API_TOKEN}`;
  const { data } = await axios.get(url);
  return data.data || [];
}

export async function fetchTeamById(teamId) {
  const url = `${BASE}/teams/${teamId}?include=country,results,squad&api_token=${API_TOKEN}`;
  const { data } = await axios.get(url);
  return data.data;
}

export async function fetchPlayerById(playerId) {
  const url = `${BASE}/players/${playerId}?include=country,career,teams&api_token=${API_TOKEN}`;
  const { data } = await axios.get(url);
  return data.data;
}
