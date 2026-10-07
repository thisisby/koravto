import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { galleryAlbums, galleryPhotos } from "@/lib/content/gallery";
import { PageHero } from "@/components/PageHero";
import { PhotoGallery } from "@/components/PhotoGallery";
import { CtaSection } from "@/components/CtaSection";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = buildMetadata({
  title: "Галерея: фото автомобилей и осмотра в Корее",
  description:
    "Реальные фотографии автомобилей, которые мы осматривали и выкупали в Корее: внешний вид, пробег, VIN, лакокрасочное покрытие, моторный отсек. Так выглядит наш осмотр.",
  path: "/galereya",
  keywords: ["фото авто из Кореи", "осмотр авто в Корее", "BMW X6 из Кореи фото"],
});

export default function GalleryPage() {
  const cars = galleryPhotos.filter((p) => p.kind === "car").length;
  const process = galleryPhotos.filter((p) => p.kind === "process").length;

  return (
    <>
      <PageHero
        eyebrow="Галерея"
        title="Автомобили и осмотр — как это выглядит на самом деле"
        description="Фотографии с реальных сделок: сам автомобиль и то, что проверяет наш специалист в Корее — пробег, VIN, кузов, оптика, моторный отсек."
        crumbs={[{ name: "Галерея", path: "/galereya" }]}
      >
        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          {[
            { icon: Icon.Camera, text: `${galleryPhotos.length} фото` },
            { icon: Icon.Check, text: `${galleryAlbums.length} автомобиль` },
            { icon: Icon.Shield, text: `${process} фото осмотра · ${cars} фото авто` },
          ].map(({ icon: I, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5"
            >
              <I className="size-4 text-accent-400" />
              {text}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              {galleryAlbums.map((a) => (
                <div key={a.slug}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">Сделка</p>
                  <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                    {a.title}
                  </h2>
                  <p className="mt-2 text-[15.5px] text-muted">{a.meta}</p>
                </div>
              ))}
            </div>
            <Link
              href="/kak-eto-rabotaet"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-navy-900 transition hover:text-accent-600"
            >
              <Icon.Play className="size-4 text-accent-600" />
              Смотреть видео осмотра
              <Icon.ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-10">
            <PhotoGallery photos={galleryPhotos} />
          </div>

          <div className="mt-12 flex items-start gap-4 rounded-3xl border border-accent-500/30 bg-amber-50 p-6">
            <Icon.Camera className="size-7 shrink-0 text-accent-600" />
            <p className="text-[15px] leading-relaxed text-navy-900">
              <span className="font-semibold">Такой же отчёт получает каждый клиент.</span> Перед выкупом мы
              присылаем фото- и видеоотчёт по вашему автомобилю: кузов, салон, пробег, VIN, диагностика. Решение о
              покупке принимаете вы — только после просмотра.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Хотите такой же отчёт по вашему автомобилю?"
        description="Опишите модель и бюджет — подберём варианты в Корее и пришлём фото каждого перед выкупом."
      />
    </>
  );
}
