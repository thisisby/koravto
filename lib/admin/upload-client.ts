"use client";

import { upload } from "@vercel/blob/client";
import { ADMIN_UPLOAD_PATH } from "@/lib/admin/paths";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, fileExtension, slugify, type UploadMode } from "@/lib/storage/shared";

export const UPLOAD_URL = ADMIN_UPLOAD_PATH;

export type UploadedImage = { url: string; width: number; height: number; name: string };

export function validateImage(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return `«${file.name}»: поддерживаются JPG, PNG, WebP, AVIF и GIF`;
  if (file.size > MAX_IMAGE_BYTES) return `«${file.name}»: файл больше ${Math.round(MAX_IMAGE_BYTES / 1024 / 1024)} МБ`;
  return null;
}

export async function readImageSize(file: File): Promise<{ width: number; height: number }> {
  try {
    const bmp = await createImageBitmap(file);
    const size = { width: bmp.width, height: bmp.height };
    bmp.close();
    return size;
  } catch {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        resolve({ width: 0, height: 0 });
        URL.revokeObjectURL(url);
      };
      img.src = url;
    });
  }
}

function targetPathname(folder: string, file: File) {
  const base = slugify(file.name.replace(/\.[a-z0-9]+$/i, "")) || "image";
  return `${folder}/${base}.${fileExtension(file.name, file.type)}`;
}

/** Uploads one image and resolves with its public URL and intrinsic size. */
export async function uploadImage(
  file: File,
  { folder, mode, onProgress }: { folder: string; mode: UploadMode; onProgress?: (pct: number) => void },
): Promise<UploadedImage> {
  const invalid = validateImage(file);
  if (invalid) throw new Error(invalid);

  const sizePromise = readImageSize(file);
  const pathname = targetPathname(folder, file);
  let url: string;

  if (mode === "client") {
    const res = await upload(pathname, file, {
      access: "public",
      handleUploadUrl: UPLOAD_URL,
      contentType: file.type,
      onUploadProgress: (e) => onProgress?.(e.percentage),
    });
    url = res.url;
  } else {
    const form = new FormData();
    form.set("file", file);
    form.set("pathname", pathname);
    const res = await fetch(UPLOAD_URL, { method: "POST", body: form });
    const body = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
    if (!res.ok || !body?.url) throw new Error(body?.error ?? `Ошибка загрузки (${res.status})`);
    url = body.url;
    onProgress?.(100);
  }

  const { width, height } = await sizePromise;
  return { url, width, height, name: file.name };
}
