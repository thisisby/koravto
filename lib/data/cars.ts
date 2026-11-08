import { unstable_cache } from "next/cache";
import { seedCars, type Car } from "@/lib/content/cars";
import { readDoc, writeDoc } from "@/lib/storage/docs";

export type { Car };

export const CARS_TAG = "cars";
const DOC = "cars";

type CarsDoc = { version: 1; updatedAt: string; cars: Car[] };

/** Uncached read straight from storage (admin panel, build-time params). Falls back to the seed list. */
export async function loadCars(): Promise<Car[]> {
  const doc = await readDoc<CarsDoc>(DOC);
  return doc?.cars ?? seedCars;
}

/** Whether the catalogue has been saved to storage yet (false = still serving the seed list). */
export async function carsDocExists() {
  return (await readDoc<CarsDoc>(DOC)) !== null;
}

/** Cached read for public pages; invalidated by `updateTag(CARS_TAG)` after admin edits. */
export const getCars = unstable_cache(loadCars, ["cars-doc"], { tags: [CARS_TAG], revalidate: 3600 });

export async function getPublishedCars() {
  return (await getCars()).filter((c) => !c.hidden);
}

export async function getCar(slug: string) {
  return (await getCars()).find((c) => c.slug === slug && !c.hidden);
}

export async function saveCars(cars: Car[]) {
  const doc: CarsDoc = { version: 1, updatedAt: new Date().toISOString(), cars };
  await writeDoc(DOC, doc);
}
