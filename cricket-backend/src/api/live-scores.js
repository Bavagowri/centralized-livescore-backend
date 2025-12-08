router.get("/live-scores", async (req, res) => {
  const data = await getLiveScores();
  res.json(data);
});