"use client";

/* eslint-disable @next/next/no-img-element -- admin previews of arbitrary (possibly local) URLs */

import { useId, useRef, useState } from "react";
import { uploadImage } from "@/lib/admin/upload-client";
import type { UploadMode } from "@/lib/storage/shared";
import { Button, Input } from "./ui";

/**
 * Single-image field: uploads the picked file to storage and stores the resulting
 * URL in a hidden input (`name`) so the surrounding form can submit it.
 */
export function ImageUpload({
  name,
  defaultValue = "",
  folder,
  mode,
  label = "Фото",
}: {
  name: string;
  defaultValue?: string;
  folder: string;
  mode: UploadMode;
  label?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  async function onPick(file: File | undefined) {
    if (!file) return;
    setError("");
    setProgress(0);
    try {
      const res = await uploadImage(file, { folder, mode, onProgress: setProgress });
      setUrl(res.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setProgress(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-[13px] font-semibold text-navy-900">{label}</span>
      <input type="hidden" name={name} value={url} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl border border-line bg-surface sm:w-64">
          {url ? (
            <img src={url} alt="" className="size-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center text-xs text-muted">Нет фото</div>
          )}
          {progress !== null && (
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-black/20">
              <div className="h-full bg-accent-500 transition-[width]" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            className="block w-full text-[13px] text-muted file:mr-3 file:rounded-lg file:border file:border-line file:bg-white file:px-3 file:py-1.5 file:text-[13px] file:font-semibold file:text-navy-900 hover:file:bg-surface"
            disabled={progress !== null}
            onChange={(e) => onPick(e.target.files?.[0])}
          />
          <Input
            type="url"
            placeholder="…или вставьте ссылку на изображение"
            value={url}
            onChange={(e) => setUrl(e.target.value.trim())}
          />
          <div className="flex items-center gap-2">
            {url && (
              <Button type="button" variant="ghost" className="px-2 py-1 text-[13px]" onClick={() => setUrl("")}>
                Убрать фото
              </Button>
            )}
            {progress !== null && <span className="text-xs text-muted">Загрузка… {Math.round(progress)}%</span>}
          </div>
          {error && <p className="text-[13px] text-red-700">{error}</p>}
          <p className="text-xs text-muted">Горизонтальное фото ~16:10, JPG или WebP, до 25 МБ.</p>
        </div>
      </div>
    </div>
  );
}
