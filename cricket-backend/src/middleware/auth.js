// src/middleware/auth.js
const { INTERNAL_API_KEY } = require("../config");

function apiKeyAuth(req, res, next) {
  // Expect key in header: x-api-key
  const clientKey = req.headers["x-api-key"];

  if (!INTERNAL_API_KEY) {
    // If no key is set in .env, skip protection
    return next();
  }

  if (!clientKey || clientKey !== INTERNAL_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

module.exports = apiKeyAuth;
