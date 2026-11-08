import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, posix } from "node:path";
import type { StorageDriver, StoredFile } from "./index";

/**
 * Local filesystem driver for development without a Blob store.
 * Everything lives under `public/uploads/` (git-ignored) and is served by Next
 * as a static file, so `url` values look like `/uploads/cars/foo.jpg`.
 */

const ROOT = join(process.cwd(), "public", "uploads");
const URL_PREFIX = "/uploads/";

function safePath(pathname: string) {
  const normalized = posix.normalize(pathname).replace(/^\/+/, "");
  if (normalized.startsWith("..")) throw new Error("Invalid pathname");
  return normalized;
}

function toUrl(pathname: string) {
  return URL_PREFIX + pathname.split("/").map(encodeURIComponent).join("/");
}

function fromUrl(url: string) {
  const path = url.startsWith("http") ? new URL(url).pathname : url;
  if (!path.startsWith(URL_PREFIX)) return null;
  return decodeURIComponent(path.slice(URL_PREFIX.length));
}

async function walk(dir: string, out: string[] = []): Promise<string[]> {
  let entries: import("node:fs").Dirent[];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) await walk(full, out);
    else if (e.isFile() && !e.name.startsWith(".")) out.push(full);
  }
  return out;
}

export const driver: StorageDriver = {
  mode: "local",

  async put(pathname, body, { random } = {}) {
    let target = safePath(pathname);
    if (random) {
      const dot = target.lastIndexOf(".");
      const suffix = `-${Math.random().toString(36).slice(2, 10)}`;
      target = dot > target.lastIndexOf("/") ? target.slice(0, dot) + suffix + target.slice(dot) : target + suffix;
    }
    const file = join(ROOT, target);
    await mkdir(dirname(file), { recursive: true });
    const bytes =
      typeof body === "string"
        ? Buffer.from(body)
        : body instanceof ArrayBuffer
          ? Buffer.from(body)
          : body instanceof Uint8Array
            ? Buffer.from(body)
            : Buffer.from(await (body as Blob).arrayBuffer());
    await writeFile(file, bytes);
    return { url: toUrl(target), pathname: target, size: bytes.byteLength, uploadedAt: new Date().toISOString() };
  },

  async remove(urls) {
    await Promise.all(
      urls.map(async (u) => {
        const p = fromUrl(u) ?? safePath(u);
        await rm(join(ROOT, p), { force: true });
      }),
    );
  },

  async list(prefix, { limit = 1000, cursor } = {}) {
    const all = await walk(ROOT);
    const files: StoredFile[] = [];
    for (const full of all) {
      const pathname = full.slice(ROOT.length + 1).split("\\").join("/");
      if (!pathname.startsWith(prefix)) continue;
      const s = await stat(full);
      files.push({ url: toUrl(pathname), pathname, size: s.size, uploadedAt: s.mtime.toISOString() });
    }
    files.sort((a, b) => (a.pathname < b.pathname ? -1 : a.pathname > b.pathname ? 1 : 0));
    const start = cursor ? Math.max(0, Number.parseInt(cursor, 10) || 0) : 0;
    const page = files.slice(start, start + limit);
    const hasMore = start + limit < files.length;
    return { files: page, cursor: hasMore ? String(start + limit) : undefined, hasMore };
  },

  async readJson<T>(url: string) {
    const p = fromUrl(url);
    if (!p) return null;
    try {
      return JSON.parse(await readFile(join(ROOT, p), "utf8")) as T;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw err;
    }
  },
};
