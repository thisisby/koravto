"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { galleryFilters, type GalleryPhoto, type PhotoKind } from "@/lib/content/gallery";
import { Icon } from "@/components/ui/Icons";

type Photo = GalleryPhoto & { album: string };
type Filter = "all" | PhotoKind;

const kindLabel: Record<PhotoKind, string> = { car: "Автомобиль", process: "Осмотр" };

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.kind === filter)),
    [photos, filter],
  );

  const counts = useMemo(
    () => ({
      all: photos.length,
      car: photos.filter((p) => p.kind === "car").length,
      process: photos.filter((p) => p.kind === "process").length,
    }),
    [photos],
  );

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const changeFilter = (f: Filter) => {
    setFilter(f);
    setOpen(null);
  };

  const current = open === null ? null : visible[open];

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Фильтр фотографий">
        {galleryFilters.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => changeFilter(f.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-navy-900 text-white shadow-soft"
                  : "border border-line bg-white text-navy-900 hover:border-navy-900/30"
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] tabular-nums ${
                  active ? "bg-white/15 text-accent-400" : "bg-surface text-muted"
                }`}
              >
                {counts[f.id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Masonry grid */}
      <div className="mt-10 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {visible.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative mb-3 block w-full overflow-hidden rounded-2xl bg-surface shadow-soft transition hover:shadow-lift sm:mb-4"
            aria-label={`Открыть фото: ${p.alt}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute top-2.5 left-2.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              {kindLabel[p.kind]}
            </span>
            <span className="absolute inset-x-0 bottom-0 translate-y-2 p-3.5 text-left text-[13px] leading-snug text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              {p.alt.split(" — ").pop()}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current && open !== null && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-black/95 text-white"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{current.album}</p>
              <p className="truncate text-xs text-white/60">{current.alt.split(" — ").pop()}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs tabular-nums text-white/60">
                {open + 1} / {visible.length}
              </span>
              <button
                type="button"
                onClick={close}
                className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Закрыть"
              >
                <Icon.X className="size-5" />
              </button>
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-14 pb-6 sm:px-20">
            <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute top-1/2 left-3 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur hover:bg-accent-500 hover:text-navy-900 sm:left-6"
              aria-label="Предыдущее фото"
            >
              <Icon.ArrowRight className="size-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute top-1/2 right-3 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur hover:bg-accent-500 hover:text-navy-900 sm:right-6"
              aria-label="Следующее фото"
            >
              <Icon.ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
