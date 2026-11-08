/**
 * Storage facade used by the data layer, the admin panel and the lead API.
 *
 * Production: Vercel Blob (`BLOB_READ_WRITE_TOKEN` or OIDC `BLOB_STORE_ID`).
 * Development without Blob credentials: files are written to `public/uploads/`
 * (git-ignored) so the admin panel can be used locally without a Blob store.
 *
 * Only a handful of primitives are exposed; everything else (versioned JSON
 * documents, per-lead files) is built on top of them in `./docs.ts`.
 *
 * Server-only. Client Components should import from `./shared` instead.
 */

import * as blob from "./blob";
import * as local from "./local";
import { isManagedUrl, type UploadMode } from "./shared";

export * from "./shared";

export type StoredFile = {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
};

export type ListResult = {
  files: StoredFile[];
  cursor?: string;
  hasMore: boolean;
};

export type ListOptions = {
  limit?: number;
  cursor?: string;
};

export type PutBody = string | Buffer | Uint8Array | ArrayBuffer | Blob | File;

export type StorageDriver = {
  mode: "blob" | "local";
  /** Upload a file. Pathname is used verbatim unless `random` is set (adds a random suffix). */
  put(pathname: string, body: PutBody, opts?: { contentType?: string; random?: boolean }): Promise<StoredFile>;
  /** Delete one or more files by URL or pathname. Missing files are ignored. */
  remove(urlsOrPathnames: string[]): Promise<void>;
  /** List files under a prefix, sorted by pathname ascending. */
  list(prefix: string, opts?: ListOptions): Promise<ListResult>;
  /** Fetch and parse a JSON file by its URL (as returned by `put`/`list`). */
  readJson<T>(url: string): Promise<T | null>;
};

export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export function getUploadMode(): UploadMode {
  return process.env.BLOB_READ_WRITE_TOKEN ? "client" : "server";
}

export function getStorage(): StorageDriver {
  return isBlobConfigured() ? blob.driver : local.driver;
}

/** Delete uploaded files, ignoring anything that is not ours (seed images under /public) and all errors. */
export async function removeManaged(urls: (string | undefined)[]) {
  const targets = urls.filter(isManagedUrl);
  if (targets.length === 0) return;
  try {
    await getStorage().remove(targets);
  } catch (err) {
    console.warn("[storage] failed to delete files", targets, err);
  }
}
