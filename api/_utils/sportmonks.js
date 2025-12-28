import axios from "axios";

const API_TOKEN = process.env.SPORTMONKS_API_TOKEN;
const BASE_URL = "https://cricket.sportmonks.com/api/v2.0";
const INCLUDES = "league,localteam,visitorteam,runs,tosswon,venue";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_token: API_TOKEN,
    include: INCLUDES
  },
  timeout: 10000
});

export async function fetchLiveScores() {
  const res = await api.get("/livescores");
  return res.data.data ?? [];
}

export async function fetchFixtures(start, end) {
  const res = await api.get("/fixtures", {
    params: {
      "filter[starts_between]": `${start},${end}`
    }
  });
  return res.data.data ?? [];
}
