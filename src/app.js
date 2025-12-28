import express from "express";
import cors from "cors";
import syncRoutes from "./routes/sync.js";

import liveRoutes from "./routes/live.js";
import recentRoutes from "./routes/recent.js";
import upcomingRoutes from "./routes/upcoming.js";
import teamsRoutes from "./routes/teams.js";
import playersRoutes from "./routes/players.js";
import rankingsRoutes from "./routes/rankings.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/live", liveRoutes);
app.use("/api/recent", recentRoutes);
app.use("/api/upcoming", upcomingRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/rankings", rankingsRoutes);




export default app;
