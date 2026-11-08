import { getStorage, randomId } from "./index";

/**
 * Versioned JSON documents on top of the storage primitives.
 *
 * A document `cars` is stored as `data/cars/<timestamp>-<rand>.json`. Every write
 * creates a new immutable file and removes the previous versions, so readers never
 * hit a stale CDN copy (public blobs may be cached up to a minute after overwrite).
 * The newest version is the lexicographically greatest pathname.
 */

const PREFIX = "data/";

function docPrefix(name: string) {
  return `${PREFIX}${name}/`;
}

export async function readDoc<T>(name: string): Promise<T | null> {
  const storage = getStorage();
  const { files } = await storage.list(docPrefix(name), { limit: 50 });
  if (files.length === 0) return null;
  const newest = files.reduce((a, b) => (a.pathname > b.pathname ? a : b));
  return storage.readJson<T>(newest.url);
}

export async function writeDoc<T>(name: string, data: T): Promise<void> {
  const storage = getStorage();
  const stamp = String(Date.now()).padStart(13, "0");
  const pathname = `${docPrefix(name)}${stamp}-${randomId(8)}.json`;
  const written = await storage.put(pathname, JSON.stringify(data), { contentType: "application/json" });

  // Best-effort cleanup of older versions.
  try {
    const { files } = await storage.list(docPrefix(name), { limit: 100 });
    const stale = files.filter((f) => f.pathname !== written.pathname && f.pathname < written.pathname);
    if (stale.length) await storage.remove(stale.map((f) => f.url));
  } catch (err) {
    console.warn(`[storage] could not prune old versions of "${name}"`, err);
  }
}
