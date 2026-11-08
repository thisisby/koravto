"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { ADMIN_PATH } from "@/lib/admin/paths";
import { revalidateContent } from "@/lib/admin/revalidate";
import type { GalleryAlbum, GalleryPhoto, PhotoKind } from "@/lib/content/gallery";
import { GALLERY_TAG, loadAlbums, saveAlbums } from "@/lib/data/gallery";
import { isManagedUrl, removeManaged, slugify } from "@/lib/storage";
import { errorMessage, str, type ActionState } from "./types";

const GALLERY_PATH = `${ADMIN_PATH}/gallery`;

function asKind(v: unknown): PhotoKind {
  return v === "process" ? "process" : "car";
}

export async function saveAlbumAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const title = str(formData, "title", 120);
  const meta = str(formData, "meta", 200);
  const originalSlug = str(formData, "originalSlug", 100);
  const slug = slugify(str(formData, "slug", 100) || title);
  if (!title) return { ok: false, error: "Укажите название (например, «BMW X6 xDrive40i M Sport»)" };
  if (!slug) return { ok: false, error: "Не удалось сформировать адрес (slug)" };

  try {
    const albums = await loadAlbums();
    if (albums.some((a) => a.slug === slug && a.slug !== originalSlug)) {
      return { ok: false, error: `Альбом с адресом «${slug}» уже существует` };
    }
    const index = originalSlug ? albums.findIndex((a) => a.slug === originalSlug) : -1;
    const next: GalleryAlbum[] =
      index === -1
        ? [...albums, { slug, title, meta, photos: [] }]
        : albums.map((a, i) => (i === index ? { ...a, slug, title, meta } : a));
    await saveAlbums(next);
    revalidateContent(GALLERY_TAG);
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
  redirect(`${GALLERY_PATH}/${slug}`);
}

export async function deleteAlbumAction(slug: string) {
  await requireAdmin();
  const albums = await loadAlbums();
  const target = albums.find((a) => a.slug === slug);
  if (!target) return;
  await saveAlbums(albums.filter((a) => a.slug !== slug));
  await removeManaged(target.photos.map((p) => p.src));
  revalidateContent(GALLERY_TAG);
  redirect(GALLERY_PATH);
}

export async function moveAlbumAction(slug: string, direction: "up" | "down") {
  await requireAdmin();
  const albums = await loadAlbums();
  const i = albums.findIndex((a) => a.slug === slug);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i === -1 || j < 0 || j >= albums.length) return;
  const next = [...albums];
  [next[i], next[j]] = [next[j], next[i]];
  await saveAlbums(next);
  revalidateContent(GALLERY_TAG);
}

export type UploadedPhoto = { src: string; width: number; height: number; kind?: PhotoKind; alt?: string };

/** Called from the browser after the files were uploaded to storage. */
export async function addPhotosAction(albumSlug: string, uploaded: UploadedPhoto[]): Promise<ActionState> {
  await requireAdmin();
  try {
    const albums = await loadAlbums();
    const album = albums.find((a) => a.slug === albumSlug);
    if (!album) return { ok: false, error: "Альбом не найден" };

    const photos: GalleryPhoto[] = [];
    for (const u of uploaded.slice(0, 100)) {
      if (!isManagedUrl(u.src)) continue;
      if (album.photos.some((p) => p.src === u.src) || photos.some((p) => p.src === u.src)) continue;
      const width = Math.max(1, Math.min(20000, Math.round(Number(u.width) || 960)));
      const height = Math.max(1, Math.min(20000, Math.round(Number(u.height) || 1280)));
      photos.push({
        src: u.src,
        alt: (u.alt ?? "").toString().trim().slice(0, 200) || `${album.title} — фото ${album.photos.length + photos.length + 1}`,
        kind: asKind(u.kind),
        width,
        height,
      });
    }
    if (photos.length === 0) return { ok: false, error: "Не удалось добавить фото" };

    await saveAlbums(albums.map((a) => (a.slug === albumSlug ? { ...a, photos: [...a.photos, ...photos] } : a)));
    revalidateContent(GALLERY_TAG);
    return { ok: true, message: `Добавлено фото: ${photos.length}` };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

/** Saves alt text / kind for every photo of an album. Fields: photo-<i>-src, photo-<i>-alt, photo-<i>-kind. */
export async function updatePhotosAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const albumSlug = str(formData, "albumSlug", 100);
  try {
    const albums = await loadAlbums();
    const album = albums.find((a) => a.slug === albumSlug);
    if (!album) return { ok: false, error: "Альбом не найден" };

    const edits = new Map<string, { alt: string; kind: PhotoKind }>();
    for (let i = 0; i < 500; i++) {
      const src = str(formData, `photo-${i}-src`, 1000);
      if (!src) break;
      edits.set(src, { alt: str(formData, `photo-${i}-alt`, 200), kind: asKind(formData.get(`photo-${i}-kind`)) });
    }
    const photos = album.photos.map((p) => {
      const e = edits.get(p.src);
      return e ? { ...p, alt: e.alt || p.alt, kind: e.kind } : p;
    });
    await saveAlbums(albums.map((a) => (a.slug === albumSlug ? { ...a, photos } : a)));
    revalidateContent(GALLERY_TAG);
    return { ok: true, message: "Сохранено" };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}

export async function deletePhotoAction(albumSlug: string, src: string) {
  await requireAdmin();
  const albums = await loadAlbums();
  const album = albums.find((a) => a.slug === albumSlug);
  if (!album || !album.photos.some((p) => p.src === src)) return;
  await saveAlbums(albums.map((a) => (a.slug === albumSlug ? { ...a, photos: a.photos.filter((p) => p.src !== src) } : a)));
  await removeManaged([src]);
  revalidateContent(GALLERY_TAG);
}

export async function movePhotoAction(albumSlug: string, src: string, direction: "up" | "down") {
  await requireAdmin();
  const albums = await loadAlbums();
  const album = albums.find((a) => a.slug === albumSlug);
  if (!album) return;
  const i = album.photos.findIndex((p) => p.src === src);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i === -1 || j < 0 || j >= album.photos.length) return;
  const photos = [...album.photos];
  [photos[i], photos[j]] = [photos[j], photos[i]];
  await saveAlbums(albums.map((a) => (a.slug === albumSlug ? { ...a, photos } : a)));
  revalidateContent(GALLERY_TAG);
}
