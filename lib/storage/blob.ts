import { del, list, put } from "@vercel/blob";
import type { StorageDriver, StoredFile } from "./index";

/**
 * Vercel Blob driver. The store is public (images are served straight from the
 * Blob CDN), so JSON documents are written as immutable, uniquely named files —
 * overwriting a public blob can serve stale content for up to a minute.
 */
export const driver: StorageDriver = {
  mode: "blob",

  async put(pathname, body, { contentType, random } = {}) {
    const res = await put(pathname, body as Parameters<typeof put>[1], {
      access: "public",
      addRandomSuffix: Boolean(random),
      allowOverwrite: false,
      contentType,
      // Media is immutable (unique pathnames), so let the CDN/browser cache it for long.
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    });
    return {
      url: res.url,
      pathname: res.pathname,
      size: 0,
      uploadedAt: new Date().toISOString(),
    };
  },

  async remove(urls) {
    if (urls.length === 0) return;
    await del(urls);
  },

  async list(prefix, { limit = 1000, cursor } = {}) {
    const res = await list({ prefix, limit, cursor });
    const files: StoredFile[] = res.blobs.map((b) => ({
      url: b.url,
      pathname: b.pathname,
      size: b.size,
      uploadedAt: new Date(b.uploadedAt).toISOString(),
    }));
    return { files, cursor: res.cursor, hasMore: res.hasMore };
  },

  async readJson<T>(url: string) {
    const res = await fetch(url, { cache: "no-store" });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Storage read failed: ${res.status} ${url}`);
    return (await res.json()) as T;
  },
};
