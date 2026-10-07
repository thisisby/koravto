"use client";

import Image from "next/image";
import { useState } from "react";
import type { StepVideo } from "@/lib/content/steps";
import { Icon } from "@/components/ui/Icons";

/** Portrait thumbnail for Shorts (`oar2`), standard 4:3 one otherwise. */
const thumb = (v: StepVideo) => `https://i.ytimg.com/vi/${v.id}/${v.portrait ? "oar2" : "hqdefault"}.jpg`;

function embedUrl(v: StepVideo) {
  const params = new URLSearchParams({ autoplay: "1", rel: "0", modestbranding: "1", playsinline: "1" });
  if (v.start) params.set("start", String(v.start));
  return `https://www.youtube-nocookie.com/embed/${v.id}?${params.toString()}`;
}

export function VideoGallery({ videos, label }: { videos: StepVideo[]; label?: string }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = videos[index];
  const allPortrait = videos.every((v) => v.portrait);

  const select = (i: number) => {
    setIndex(i);
    setPlaying(true);
  };

  return (
    <div className="rounded-3xl bg-navy-900 p-3 text-white sm:p-4">
      {/* Player — 16:9 for regular videos, 9:16 (centered, height-capped) for Shorts */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-black ${
          current.portrait
            ? "mx-auto h-[min(70vh,640px)] w-[calc(min(70vh,640px)*9/16)] max-w-full"
            : "aspect-video"
        }`}
      >
        {playing ? (
          <iframe
            key={current.id}
            src={embedUrl(current)}
            title={current.title}
            className="absolute inset-0 size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full"
            aria-label={`Смотреть: ${current.title}`}
          >
            <Image
              src={thumb(current)}
              alt=""
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              priority={false}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-accent-500 text-navy-900 shadow-[0_12px_32px_-8px_rgb(201_162_74/0.8)] transition group-hover:scale-105 group-hover:bg-accent-400 sm:size-20">
                <Icon.Play className="ml-1 size-7 sm:size-8" />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-left sm:p-5">
              <span>
                {label && (
                  <span className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-400 backdrop-blur">
                    <Icon.YouTube className="size-3.5" />
                    {label}
                  </span>
                )}
                <span className="font-display block text-base font-bold sm:text-lg">{current.title}</span>
              </span>
              <span className="hidden shrink-0 text-xs text-white/60 sm:block">
                {index + 1} / {videos.length}
              </span>
            </span>
          </button>
        )}
      </div>

      {/* Thumbnails */}
      <div
        className={`mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:gap-3 [&::-webkit-scrollbar]:hidden ${
          allPortrait ? "justify-center" : ""
        }`}
      >
        {videos.map((v, i) => {
          const active = i === index;
          const shape = v.portrait
            ? "aspect-[9/16] w-20 sm:w-24"
            : "aspect-video w-[30%] sm:w-auto sm:flex-1";
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => select(i)}
              aria-label={v.title}
              aria-current={active ? "true" : undefined}
              className={`group relative shrink-0 overflow-hidden rounded-xl ring-2 transition ${shape} ${
                active ? "ring-accent-500" : "ring-transparent hover:ring-white/40"
              }`}
            >
              <Image
                src={thumb(v)}
                alt=""
                fill
                sizes="(min-width: 1024px) 160px, 30vw"
                className={`object-cover transition ${active ? "" : "opacity-60 group-hover:opacity-100"}`}
              />
              <span className="absolute top-1.5 left-1.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white sm:text-[11px]">
                {i + 1}
              </span>
              {active && playing && (
                <span className="absolute right-1.5 bottom-1.5 size-2 rounded-full bg-accent-500 shadow-[0_0_0_3px_rgb(201_162_74/0.3)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
