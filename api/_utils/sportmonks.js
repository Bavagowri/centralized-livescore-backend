import axios from "axios";

const API_TOKEN = process.env.SPORTMONKS_API_TOKEN;

if (!API_TOKEN) {
  throw new Error("SPORTMONKS_API_TOKEN is missing");
}

const api = axios.create({
  baseURL: "https://cricket.sportmonks.com/api/v2.0",
  params: {
    api_token: API_TOKEN,
    include: "league,localteam,visitorteam,runs,venue"
  }
});

export async function getLiveScores() {
  const res = await api.get("/livescores");
  return res.data;
}
