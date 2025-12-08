router.get("/upcoming", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const future = new Date(Date.now() + 90*24*3600*1000)
                     .toISOString().split("T")[0];

  const data = await getFixturesDateRange(today, future);
  res.json(data);
});
