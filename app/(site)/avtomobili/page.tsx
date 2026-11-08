import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { cars } from "@/lib/content/cars";
import { PageHero } from "@/components/PageHero";
import { CarCard } from "@/components/CarCard";
import { CtaSection } from "@/components/CtaSection";

export const metadata: Metadata = buildMetadata({
  title: "Премиальные автомобили из Кореи: цены под ключ в России",
  description:
    "Mercedes-Benz, BMW, Porsche, Land Rover, Audi и Genesis с корейского рынка — ориентировочные цены под ключ в России, двигатели и особенности корейских комплектаций.",
  path: "/avtomobili",
  keywords: ["Mercedes из Кореи цена", "BMW из Кореи", "Porsche из Кореи", "премиум авто из Кореи каталог"],
});

export default function CarsPage() {
  const brands = Array.from(new Set(cars.map((c) => c.brand)));
  return (
    <>
      <PageHero
        eyebrow="Каталог"
        title="Автомобили, которые мы привозим чаще всего"
        description="Работаем под заказ — любая модель, год и конфигурация. Ниже — востребованные варианты с ориентировочными ценами под ключ в России."
        crumbs={[{ name: "Автомобили", path: "/avtomobili" }]}
      >
        <div className="mt-10 flex flex-wrap gap-2">
          {brands.map((b) => (
            <a
              key={b}
              href={`#${b.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
            >
              {b}
            </a>
          ))}
        </div>
      </PageHero>

      {brands.map((brand) => (
        <section key={brand} id={brand.toLowerCase().replace(/\s+/g, "-")} className="py-16 first-of-type:pt-20 sm:py-20">
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
        title="Нужна другая модель?"
        description="Подберём любой автомобиль с корейского рынка — от Mercedes-Benz C-Class до Bentley и Rolls-Royce."
      />
    </>
  );
}
