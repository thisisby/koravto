import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { sortedArticles } from "@/lib/content/articles";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = buildMetadata({
  title: "Блог: покупка премиальных автомобилей в Корее",
  description:
    "Статьи о покупке Mercedes-Benz, BMW, Porsche и других автомобилей в Корее: почему это выгодно, как проверить, сколько стоит растаможка через Кыргызстан, какой возраст выбрать.",
  path: "/blog",
});

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));

export default function BlogPage() {
  const [first, ...rest] = sortedArticles;
  return (
    <>
      <PageHero
        eyebrow="Блог"
        title="О покупке автомобилей в Корее"
        description="Коротко и по делу: то, что помогает принять решение."
        crumbs={[{ name: "Блог", path: "/blog" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Link
            href={`/blog/${first.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition hover:shadow-lift lg:grid-cols-2"
          >
            <div className="relative min-h-64 bg-navy-900 p-8 text-white">
              <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
              <div className="relative flex h-full flex-col justify-between">
                <span className="inline-flex w-fit rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-navy-900">
                  Новое
                </span>
                <div className="flex flex-wrap gap-2">
                  {first.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/80">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col p-8">
              <p className="text-sm text-muted">
                {formatDate(first.publishedAt)} · {first.readingMinutes} мин чтения
              </p>
              <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-navy-900 group-hover:text-accent-600 sm:text-3xl">
                {first.title}
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-muted">{first.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-navy-900">
                Читать <Icon.ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group flex flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              >
                <p className="text-sm text-muted">
                  {formatDate(a.publishedAt)} · {a.readingMinutes} мин
                </p>
                <h2 className="font-display mt-3 text-xl font-bold tracking-tight text-navy-900 group-hover:text-accent-600">
                  {a.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{a.description}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {a.tags.map((t) => (
                    <span key={t} className="rounded-full bg-surface px-2.5 py-1 text-xs text-navy-900/80">
                      #{t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
