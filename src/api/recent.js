router.get("/recent", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const past = new Date(Date.now() - 45*24*3600*1000)
                    .toISOString().split("T")[0];

  const data = await getFixturesDateRange(past, today);
  res.json(data);
});
