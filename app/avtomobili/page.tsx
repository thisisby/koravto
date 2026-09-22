import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { cars } from "@/lib/content/cars";
import { PageHero } from "@/components/PageHero";
import { CarCard } from "@/components/CarCard";
import { CtaSection } from "@/components/CtaSection";

export const metadata: Metadata = buildMetadata({
  title: "Популярные автомобили из Кореи: цены под ключ в России",
  description:
    "Каталог популярных моделей из Южной Кореи — Kia, Hyundai, Genesis — с ориентировочными ценами под ключ в России, комплектациями и особенностями корейских версий.",
  path: "/avtomobili",
  keywords: ["Kia из Кореи цена", "Hyundai из Кореи", "Genesis из Кореи", "авто из Кореи каталог"],
});

export default function CarsPage() {
  const brands = Array.from(new Set(cars.map((c) => c.brand)));
  return (
    <>
      <PageHero
        eyebrow="Каталог"
        title="Автомобили, которые чаще всего заказывают из Кореи"
        description="Мы работаем под заказ — любая модель, год и комплектация. Ниже — самые популярные варианты с ориентировочными ценами «под ключ» в России."
        crumbs={[{ name: "Автомобили", path: "/avtomobili" }]}
      >
        <div className="mt-10 flex flex-wrap gap-2">
          {brands.map((b) => (
            <a
              key={b}
              href={`#${b.toLowerCase()}`}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
            >
              {b}
            </a>
          ))}
        </div>
      </PageHero>

      {brands.map((brand) => (
        <section key={brand} id={brand.toLowerCase()} className="py-16 first-of-type:pt-20 sm:py-20">
          <div className="container-x">
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900">{brand} из Кореи</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cars
                .filter((c) => c.brand === brand)
                .map((c) => (
                  <CarCard key={c.slug} car={c} />
                ))}
            </div>
          </div>
        </section>
      ))}

      <CtaSection
        title="Нет нужной модели в списке?"
        description="Это лишь самые популярные варианты. Подберём любой автомобиль с корейского рынка — от компактного Avante до Genesis G90."
      />
    </>
  );
}
