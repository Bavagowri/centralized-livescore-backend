import axios from "axios";

const API_TOKEN = process.env.SPORTMONKS_API_TOKEN;
const BASE_URL = "https://cricket.sportmonks.com/api/v2.0";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_token: API_TOKEN,
    include: "league,localteam,visitorteam,runs,venue",
  },
  timeout: 10000,
});

export async function getLiveScores() {
  const res = await api.get("/livescores");
  return res.data;
}

export async function getFixturesBetween(start, end) {
  const res = await api.get("/fixtures", {
    params: {
      "filter[starts_between]": `${start},${end}`,
    },
  });
  return res.data;
}
