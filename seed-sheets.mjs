import "dotenv/config";
import { seedPengumuman, seedGaleri } from "./lib/sheets-seed.js";
import { pengumuman } from "./data/content.js";
import { galeri } from "./data/galeri.js";

async function main() {
  console.log("Seeding Pengumuman...");
  await seedPengumuman(pengumuman);
  console.log("Done:", pengumuman.length, "rows");

  console.log("Seeding Galeri...");
  await seedGaleri(galeri);
  console.log("Done:", galeri.length, "rows");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
