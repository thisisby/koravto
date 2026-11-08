/**
 * One-off migration: uploads the bundled images (public/cars, public/gallery) to Vercel Blob
 * and saves the catalogue / gallery / video documents to storage with the new URLs.
 *
 *   npm run migrate:blob             # upload + rewrite documents
 *   npm run migrate:blob -- --remove # ...and delete the local copies from public/ afterwards
 *
 * Requires BLOB_READ_WRITE_TOKEN in .env.local (or .env). Safe to re-run: only images that
 * still point to /cars/… or /gallery/… are migrated.
 */

import { existsSync } from "node:fs";
import { readFile, rm } from "node:fs/promises";
import { join } from "node:path";

for (const file of [".env.local", ".env"]) {
  const path = join(process.cwd(), file);
  if (existsSync(path)) {
    try {
      process.loadEnvFile(path);
    } catch {
      /* ignore malformed env files */
    }
  }
}

const removeLocal = process.argv.includes("--remove");

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("BLOB_READ_WRITE_TOKEN is not set. Add it to .env.local (Vercel → Storage → your Blob store → .env.local tab).");
    process.exit(1);
  }

  // Imported lazily so the env is loaded before `getStorage()` decides on the driver.
  const { getStorage } = await import("@/lib/storage");
  const { loadCars, saveCars } = await import("@/lib/data/cars");
  const { loadAlbums, saveAlbums } = await import("@/lib/data/gallery");
  const { loadStepVideos, saveStepVideos } = await import("@/lib/data/videos");

  const storage = getStorage();
  if (storage.mode !== "blob") throw new Error("Storage driver is not Blob — check BLOB_READ_WRITE_TOKEN");

  const uploaded: string[] = [];

  async function uploadLocal(publicPath: string, target: string) {
    const file = join(process.cwd(), "public", publicPath);
    const body = await readFile(file);
    const ext = publicPath.split(".").pop()?.toLowerCase();
    const contentType = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
    const res = await storage.put(target, body, { contentType, random: true });
    uploaded.push(publicPath);
    console.log(`  ↑ ${publicPath} → ${res.url}`);
    return res.url;
  }

  // Cars
  console.log("Cars…");
  const cars = await loadCars();
  let carsChanged = false;
  for (const car of cars) {
    if (car.image?.startsWith("/cars/")) {
      car.image = await uploadLocal(car.image, `cars/${car.image.slice("/cars/".length)}`);
      carsChanged = true;
    }
  }
  if (carsChanged) await saveCars(cars);
  console.log(carsChanged ? "  saved cars document" : "  nothing to migrate");

  // Gallery
  console.log("Gallery…");
  const albums = await loadAlbums();
  let galleryChanged = false;
  for (const album of albums) {
    for (const photo of album.photos) {
      if (photo.src.startsWith("/gallery/")) {
        photo.src = await uploadLocal(photo.src, `gallery/${photo.src.slice("/gallery/".length)}`);
        galleryChanged = true;
      }
    }
  }
  if (galleryChanged) await saveAlbums(albums);
  console.log(galleryChanged ? "  saved gallery document" : "  nothing to migrate");

  // Videos: persist the current list so the admin panel starts from it.
  console.log("Videos…");
  await saveStepVideos(await loadStepVideos());
  console.log("  saved videos document");

  if (removeLocal && uploaded.length) {
    console.log("Removing local copies…");
    for (const p of uploaded) await rm(join(process.cwd(), "public", p), { force: true });
    for (const dir of ["public/cars", "public/gallery"]) {
      await rm(join(process.cwd(), dir), { recursive: true, force: true }).catch(() => {});
    }
    console.log("  done");
  } else if (uploaded.length) {
    console.log(`\n${uploaded.length} file(s) uploaded. Re-run with --remove to delete the local copies from public/.`);
  }

  console.log("\nDone. Redeploy (or wait for the next revalidation) to see the new URLs on the site.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
