import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cars, formatRange, formatUsd, getCar } from "@/lib/content/cars";
import { buildMetadata, productJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CarCard, CarSilhouette } from "@/components/CarCard";
import { CtaSection } from "@/components/CtaSection";
import { Icon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/avtomobili/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) return {};
  return buildMetadata({
    title: `${car.brand} ${car.model} из Кореи: цена под ключ в России ${car.years}`,
    description: `${car.brand} ${car.model} ${car.years} из Южной Кореи с доставкой в Россию через Кыргызстан. Цена под ключ от ${formatUsd(
      car.priceTurnkey[0],
    )}. Комплектации, двигатели, почему выгодно везти именно эту модель.`,
    path: `/avtomobili/${car.slug}`,
    keywords: [
      `${car.brand} ${car.model} из Кореи`,
      `${car.brand} ${car.model} из Кореи цена`,
      `купить ${car.brand} ${car.model} из Кореи`,
      `${car.model} корейская сборка`,
    ],
  });
}

export default async function CarPage({ params }: PageProps<"/avtomobili/[slug]">) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();

  const related = cars.filter((c) => c.slug !== car.slug && c.segment === car.segment).slice(0, 3);
  const fallback = cars.filter((c) => c.slug !== car.slug && !related.includes(c)).slice(0, 3 - related.length);
  const others = [...related, ...fallback];

  return (
    <>
      <JsonLd
        data={productJsonLd({
          brand: car.brand,
          model: car.model,
          description: car.description,
          path: `/avtomobili/${car.slug}`,
          low: car.priceTurnkey[0],
          high: car.priceTurnkey[1],
        })}
      />
      <PageHero
        eyebrow={car.segment}
        title={`${car.brand} ${car.model} из Кореи`}
        description={car.description}
        crumbs={[
          { name: "Автомобили", path: "/avtomobili" },
          { name: `${car.brand} ${car.model}`, path: `/avtomobili/${car.slug}` },
        ]}
      >
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Stat label="Годы выпуска" value={car.years} />
          <Stat label="Цена в Корее" value={formatRange(car.priceKorea)} />
          <Stat label="Под ключ в России" value={formatRange(car.priceTurnkey)} highlight />
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900">
              Почему {car.model} везут из Кореи
            </h2>
            <ul className="mt-6 space-y-4">
              {car.whyPopular.map((w) => (
                <li key={w} className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-500 text-navy-900">
                    <Icon.Check className="size-4" />
                  </span>
                  <p className="text-[15.5px] leading-relaxed text-navy-900">{w}</p>
                </li>
              ))}
            </ul>

            <h2 className="font-display mt-14 text-3xl font-bold tracking-tight text-navy-900">Характеристики корейских версий</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Двигатели</p>
                <ul className="mt-3 space-y-1.5 text-[15px] text-navy-900">
                  {car.engines.map((e) => (
                    <li key={e}>• {e}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Привод</p>
                <p className="mt-3 text-[15px] text-navy-900">{car.drive}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Особенности комплектаций</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {car.highlights.map((h) => (
                    <li key={h} className="rounded-full bg-surface px-2.5 py-1 text-xs text-navy-900/80">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 rounded-2xl bg-surface p-6 text-sm leading-relaxed text-muted">
              Цены ориентировочные и зависят от года, пробега, комплектации и курса валют на момент покупки. Точный
              расчёт «под ключ» по конкретному автомобилю мы присылаем вместе с подборкой. Как формируется цена —{" "}
              <Link href="/stoimost" className="font-semibold text-navy-900 underline decoration-accent-500 decoration-2 underline-offset-4">
                на странице «Стоимость»
              </Link>
              .
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${car.accent} p-6 text-white`}>
              <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">{car.brand}</p>
                <p className="font-display text-3xl font-extrabold">{car.model}</p>
                <CarSilhouette className="mt-6 h-24 w-auto text-white/90" />
              </div>
            </div>
            <div className="mt-4 rounded-3xl border border-line bg-white p-6 shadow-soft">
              <p className="text-sm text-muted">Под ключ в России</p>
              <p className="font-display mt-1 text-2xl font-extrabold text-navy-900">{formatRange(car.priceTurnkey)}</p>
              <p className="mt-1 text-xs text-muted">включая доставку, таможню ЕАЭС, утильсбор и комиссию</p>
              <ButtonLink href="#zayavka" size="lg" className="mt-6 w-full">
                Подобрать {car.model}
                <Icon.ArrowRight className="size-5" />
              </ButtonLink>
              <ul className="mt-5 space-y-2 text-sm text-navy-900/80">
                {["Отчёт Carhistory по каждому варианту", "Живой осмотр и видеоотчёт", "Фиксированная комиссия"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Icon.Check className="size-4 text-accent-600" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="container-x">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900">Похожие модели</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => (
              <CarCard key={c.slug} car={c} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={`Подобрать ${car.brand} ${car.model} из Кореи`}
        description="Укажите желаемый год, бюджет и комплектацию — пришлём реальные варианты с отчётами и точным расчётом."
        defaultCar={`${car.brand} ${car.model} ${car.years}`}
      />
    </>
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 ${highlight ? "bg-accent-500 text-navy-900" : "border border-white/15 bg-white/5"}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${highlight ? "text-navy-900/70" : "text-white/55"}`}>
        {label}
      </p>
      <p className="font-display mt-1.5 text-xl font-extrabold">{value}</p>
    </div>
  );
}
