import { fetchFixtures } from "../services/sportmonks.js";
import { saveFixture } from "../services/saveFixture.js";

export async function syncFixtures() {
  const today = new Date().toISOString().split("T")[0];
  const future = new Date(Date.now() + 90 * 86400000)
    .toISOString()
    .split("T")[0];

  const fixtures = await fetchFixtures(today, future);

  for (const f of fixtures) {
    await saveFixture(f);
  }

  console.log("Fixtures synced");
}
