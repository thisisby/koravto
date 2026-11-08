"use client";

/* eslint-disable @next/next/no-img-element -- admin thumbnails of arbitrary (possibly local) URLs */

import { useActionState } from "react";
import { deletePhotoAction, movePhotoAction, updatePhotosAction } from "@/lib/admin/actions/gallery";
import { photoKindLabel, type GalleryAlbum, type PhotoKind } from "@/lib/content/gallery";
import { ActionButton } from "./ActionButton";
import { SubmitButton } from "./SubmitButton";
import { EmptyState, Input, Notice, Select } from "./ui";

export function AlbumPhotosForm({ album }: { album: GalleryAlbum }) {
  const [state, action] = useActionState(updatePhotosAction, null);

  if (album.photos.length === 0) {
    return <EmptyState title="В альбоме пока нет фото">Загрузите фото через форму выше.</EmptyState>;
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="albumSlug" value={album.slug} />
      <div className="sticky top-0 z-10 -mx-1 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white/95 px-4 py-3 shadow-soft backdrop-blur">
        <SubmitButton>Сохранить подписи и типы</SubmitButton>
        <span className="text-[13px] text-muted">{album.photos.length} фото</span>
        {state && (
          <span className={`text-[13px] font-semibold ${state.ok ? "text-emerald-700" : "text-red-700"}`}>
            {state.ok ? state.message : state.error}
          </span>
        )}
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {album.photos.map((p, i) => (
          <li key={p.src} className="flex flex-col overflow-hidden rounded-xl border border-line bg-white">
            <input type="hidden" name={`photo-${i}-src`} value={p.src} />
            <div className="relative aspect-[4/3] bg-surface">
              <img src={p.src} alt={p.alt} className="size-full object-cover" loading="lazy" />
              <span className="absolute top-2 left-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-white">{i + 1}</span>
            </div>
            <div className="space-y-2 p-3">
              <Select name={`photo-${i}-kind`} defaultValue={p.kind} aria-label="Тип фото">
                {(Object.keys(photoKindLabel) as PhotoKind[]).map((k) => (
                  <option key={k} value={k}>
                    {photoKindLabel[k]}
                  </option>
                ))}
              </Select>
              <Input name={`photo-${i}-alt`} defaultValue={p.alt} placeholder="Подпись (alt)" aria-label="Подпись" />
              <div className="flex items-center gap-1.5">
                <ActionButton action={movePhotoAction.bind(null, album.slug, p.src, "up")} disabled={i === 0} className="px-2.5 py-1.5" title="Раньше">
                  ↑
                </ActionButton>
                <ActionButton
                  action={movePhotoAction.bind(null, album.slug, p.src, "down")}
                  disabled={i === album.photos.length - 1}
                  className="px-2.5 py-1.5"
                  title="Позже"
                >
                  ↓
                </ActionButton>
                <ActionButton
                  action={deletePhotoAction.bind(null, album.slug, p.src)}
                  confirm="Удалить это фото? Файл будет удалён из хранилища."
                  variant="danger"
                  className="ml-auto px-2.5 py-1.5"
                >
                  Удалить
                </ActionButton>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {state && !state.ok && <Notice tone="error">{state.error}</Notice>}
    </form>
  );
}
