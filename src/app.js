import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { apiKeyAuth } from "./middleware/apiKey.js";

import syncRoutes from "./routes/sync.js";
import liveRoutes from "./routes/live.js";
import recentRoutes from "./routes/recent.js";
import upcomingRoutes from "./routes/upcoming.js";
import teamsRoutes from "./routes/teams.js";
import playersRoutes from "./routes/players.js";
import rankingsRoutes from "./routes/rankings.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔐 API KEY PROTECTION (GLOBAL)
app.use("/api", apiKeyAuth);

// Routes
app.use("/api/live", liveRoutes);
app.use("/api/recent", recentRoutes);
app.use("/api/upcoming", upcomingRoutes);
app.use("/api", syncRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/rankings", rankingsRoutes);

export default app;
