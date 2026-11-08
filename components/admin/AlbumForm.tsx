"use client";

import { useActionState, useState } from "react";
import { saveAlbumAction } from "@/lib/admin/actions/gallery";
import type { GalleryAlbum } from "@/lib/content/gallery";
import { slugify } from "@/lib/storage/shared";
import { SubmitButton } from "./SubmitButton";
import { Field, Input, Notice } from "./ui";

export function AlbumForm({ album }: { album?: GalleryAlbum }) {
  const [state, action] = useActionState(saveAlbumAction, null);
  const [title, setTitle] = useState(album?.title ?? "");
  const [slug, setSlug] = useState(album?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(album));
  const effectiveSlug = slugTouched ? slug : slugify(title);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="originalSlug" value={album?.slug ?? ""} />
      <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr_1fr]">
        <Field label="Название" hint="Марка, модель и комплектация автомобиля">
          <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="BMW X6 xDrive40i M Sport" required />
        </Field>
        <Field label="Подпись" hint="Пробег, год, где осматривали">
          <Input name="meta" defaultValue={album?.meta ?? ""} placeholder="Пробег 27 065 км · осмотр и выкуп в Сеуле" />
        </Field>
        <Field label="Адрес (slug)" hint="Латиницей, для имён файлов">
          <Input
            name="slug"
            value={effectiveSlug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            onBlur={(e) => setSlug(slugify(e.target.value))}
            placeholder="bmw-x6"
          />
        </Field>
      </div>
      {state && !state.ok && <Notice tone="error">{state.error}</Notice>}
      <SubmitButton>{album ? "Сохранить" : "Создать альбом"}</SubmitButton>
    </form>
  );
}
