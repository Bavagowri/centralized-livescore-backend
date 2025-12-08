// src/index.js
const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const apiKeyAuth = require("./middleware/auth");
const cricketRoutes = require("./routes/cricket");

const app = express();

// Middlewares
app.use(cors());            // allow cross-origin (WP & others)
app.use(express.json());    // parse JSON body if needed

// Optional: protect all API routes with key
app.use("/api", apiKeyAuth);

// Routes
app.use("/api", cricketRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Cricket backend running" });
});

app.listen(PORT, () => {
  console.log(`Cricket backend running on port ${PORT}`);
});
