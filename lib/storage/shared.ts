/** Storage helpers that are safe to import from Client Components (no Node APIs). */

/** Public hostname suffix of Vercel Blob (used for `next/image` remotePatterns and URL checks). */
export const BLOB_HOST_SUFFIX = ".public.blob.vercel-storage.com";

export function isBlobUrl(url: string) {
  try {
    return new URL(url).hostname.endsWith(BLOB_HOST_SUFFIX);
  } catch {
    return false;
  }
}

/** True for files we uploaded ourselves (Blob URL or local dev upload) — i.e. safe to delete. */
export function isManagedUrl(url: string | undefined): url is string {
  return Boolean(url && (isBlobUrl(url) || url.startsWith("/uploads/")));
}

/**
 * How the admin panel uploads images:
 * - "client": browser → Vercel Blob directly (needs BLOB_READ_WRITE_TOKEN for client tokens; no size limit worries)
 * - "server": browser → our route handler → storage (local dev, or Blob via OIDC; capped by the 4.5 MB function body limit on Vercel)
 */
export type UploadMode = "client" | "server";

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
export const MAX_IMAGE_BYTES = 25 * 1024 * 1024;

/** Random, URL-safe id (used for file names and lead ids). */
export function randomId(length = 16) {
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => "abcdefghijklmnopqrstuvwxyz0123456789"[b % 36]).join("");
}

/** Lower-case, ASCII-only slug: "Mercedes-Benz E-Class" -> "mercedes-benz-e-class" */
export function slugify(input: string) {
  const translit: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l",
    м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh",
    щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
  return input
    .toLowerCase()
    .split("")
    .map((ch) => translit[ch] ?? ch)
    .join("")
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Safe file extension derived from a file name / content type. */
export function fileExtension(name: string, contentType?: string) {
  const fromName = name.toLowerCase().match(/\.([a-z0-9]{2,5})$/)?.[1];
  if (fromName && ["jpg", "jpeg", "png", "webp", "avif", "gif"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
    "image/gif": "gif",
  };
  return (contentType && map[contentType]) || "jpg";
}
