import "dotenv/config";
import app from "./app.js";
import liveRoutes from "./routes/live.js";
import recentRoutes from "./routes/recent.js";
import upcomingRoutes from "./routes/upcoming.js";
import syncRoutes from "./routes/sync.js";


const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  console.log("DB USER:", process.env.DB_USER); // TEMP DEBUG
  console.log(`🚀 Server running on port ${PORT}`);
});
