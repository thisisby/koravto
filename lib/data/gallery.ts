import { unstable_cache } from "next/cache";
import { seedGalleryAlbums, type GalleryAlbum, type GalleryPhoto } from "@/lib/content/gallery";
import { readDoc, writeDoc } from "@/lib/storage/docs";

export type { GalleryAlbum, GalleryPhoto };

export const GALLERY_TAG = "gallery";
const DOC = "gallery";

type GalleryDoc = { version: 1; updatedAt: string; albums: GalleryAlbum[] };

/** Uncached read (admin panel). Falls back to the seed albums. */
export async function loadAlbums(): Promise<GalleryAlbum[]> {
  const doc = await readDoc<GalleryDoc>(DOC);
  return doc?.albums ?? seedGalleryAlbums;
}

export async function galleryDocExists() {
  return (await readDoc<GalleryDoc>(DOC)) !== null;
}

/** Cached read for public pages; invalidated by `updateTag(GALLERY_TAG)`. */
export const getAlbums = unstable_cache(loadAlbums, ["gallery-doc"], { tags: [GALLERY_TAG], revalidate: 3600 });

export type GalleryPhotoWithAlbum = GalleryPhoto & { album: string };

export async function getGalleryPhotos(): Promise<GalleryPhotoWithAlbum[]> {
  const albums = await getAlbums();
  return albums.flatMap((a) => a.photos.map((p) => ({ ...p, album: a.title })));
}

export async function saveAlbums(albums: GalleryAlbum[]) {
  const doc: GalleryDoc = { version: 1, updatedAt: new Date().toISOString(), albums };
  await writeDoc(DOC, doc);
}
