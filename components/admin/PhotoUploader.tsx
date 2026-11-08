"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { addPhotosAction, type UploadedPhoto } from "@/lib/admin/actions/gallery";
import { uploadImage } from "@/lib/admin/upload-client";
import { photoKindLabel, type PhotoKind } from "@/lib/content/gallery";
import type { UploadMode } from "@/lib/storage/shared";
import { Button, Notice, Select } from "./ui";

type Item = { name: string; progress: number; status: "waiting" | "uploading" | "done" | "error"; error?: string };

/** Multi-file uploader for an album: uploads every file, then registers them via a Server Action. */
export function PhotoUploader({ albumSlug, mode }: { albumSlug: string; mode: UploadMode }) {
  const router = useRouter();
  const [kind, setKind] = useState<PhotoKind>("car");
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const update = (i: number, patch: Partial<Item>) =>
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  async function onFiles(list: FileList | null) {
    const files = Array.from(list ?? []);
    if (files.length === 0) return;
    setBusy(true);
    setResult(null);
    setItems(files.map((f) => ({ name: f.name, progress: 0, status: "waiting" })));

    const uploaded: UploadedPhoto[] = [];
    // Upload with limited concurrency so dozens of phone photos don't choke the connection.
    const CONCURRENCY = 3;
    let next = 0;
    const worker = async () => {
      while (next < files.length) {
        const i = next++;
        update(i, { status: "uploading" });
        try {
          const res = await uploadImage(files[i], {
            folder: `gallery/${albumSlug}`,
            mode,
            onProgress: (p) => update(i, { progress: p }),
          });
          uploaded[i] = { src: res.url, width: res.width, height: res.height, kind };
          update(i, { status: "done", progress: 100 });
        } catch (err) {
          update(i, { status: "error", error: err instanceof Error ? err.message : "Ошибка" });
        }
      }
    };
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker));

    const ok = uploaded.filter(Boolean);
    if (ok.length > 0) {
      const res = await addPhotosAction(albumSlug, ok);
      if (res && !res.ok) setResult({ ok: false, text: res.error });
      else setResult({ ok: true, text: `Загружено фото: ${ok.length}${ok.length < files.length ? ` (с ошибками: ${files.length - ok.length})` : ""}` });
      router.refresh();
    } else {
      setResult({ ok: false, text: "Ни одно фото не загрузилось" });
    }
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface/60 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="block sm:w-56">
          <span className="mb-1.5 block text-[13px] font-semibold text-navy-900">Тип загружаемых фото</span>
          <Select value={kind} onChange={(e) => setKind(e.target.value as PhotoKind)} disabled={busy}>
            {(Object.keys(photoKindLabel) as PhotoKind[]).map((k) => (
              <option key={k} value={k}>
                {photoKindLabel[k]}
              </option>
            ))}
          </Select>
        </label>
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            className="hidden"
            disabled={busy}
            onChange={(e) => onFiles(e.target.files)}
          />
          <Button type="button" disabled={busy} onClick={() => inputRef.current?.click()}>
            {busy ? "Загружаем…" : "Выбрать фото"}
          </Button>
          <span className="ml-3 text-xs text-muted">Можно выбрать сразу много файлов. Тип и подпись можно изменить после загрузки.</span>
        </div>
      </div>

      {items.length > 0 && (
        <ul className="mt-4 grid gap-1.5 text-[13px] sm:grid-cols-2">
          {items.map((it, i) => (
            <li key={`${it.name}-${i}`} className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5">
              <span className="min-w-0 flex-1 truncate text-navy-900">{it.name}</span>
              {it.status === "error" ? (
                <span className="text-red-700" title={it.error}>
                  ошибка
                </span>
              ) : it.status === "done" ? (
                <span className="text-emerald-700">готово</span>
              ) : (
                <span className="tabular-nums text-muted">{it.status === "waiting" ? "ждёт" : `${Math.round(it.progress)}%`}</span>
              )}
            </li>
          ))}
        </ul>
      )}

      {result && (
        <div className="mt-4">
          <Notice tone={result.ok ? "success" : "error"}>{result.text}</Notice>
        </div>
      )}
    </div>
  );
}
