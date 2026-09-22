import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, sortedArticles, type ArticleBlock } from "@/lib/content/articles";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { Icon } from "@/components/ui/Icons";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return buildMetadata({
    title: a.title,
    description: a.description,
    path: `/blog/${a.slug}`,
    type: "article",
    publishedTime: a.publishedAt,
    modifiedTime: a.updatedAt,
    keywords: a.tags,
  });
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote>
          <p>{block.text}</p>
        </blockquote>
      );
  }
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const others = sortedArticles.filter((x) => x.slug !== a.slug).slice(0, 3);
  const toc = a.blocks.filter((b) => b.type === "h2") as { type: "h2"; text: string }[];

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: a.title,
          description: a.description,
          path: `/blog/${a.slug}`,
          publishedAt: a.publishedAt,
          updatedAt: a.updatedAt,
        })}
      />
      <PageHero
        eyebrow={a.tags.map((t) => `#${t}`).join("  ")}
        title={a.title}
        description={a.description}
        crumbs={[
          { name: "Блог", path: "/blog" },
          { name: a.title, path: `/blog/${a.slug}` },
        ]}
      >
        <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60">
          <span>Опубликовано {formatDate(a.publishedAt)}</span>
          {a.updatedAt && <span>· обновлено {formatDate(a.updatedAt)}</span>}
          <span>· {a.readingMinutes} мин чтения</span>
        </p>
      </PageHero>

      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_300px]">
          <article className="prose-article max-w-3xl">
            {a.blocks.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {toc.length > 0 && (
              <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Содержание</p>
                <ol className="mt-3 space-y-2 text-sm text-navy-900/85">
                  {toc.map((h, i) => (
                    <li key={h.text} className="flex gap-2">
                      <span className="font-display font-bold text-accent-600">{i + 1}</span>
                      {h.text}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <div className="rounded-3xl bg-navy-900 p-6 text-white">
              <p className="font-display text-lg font-bold">Хотите такой автомобиль?</p>
              <p className="mt-2 text-sm text-white/65">
                Подберём варианты в Корее и пришлём расчёт «под ключ» в течение суток.
              </p>
              <ButtonLink href="#zayavka" className="mt-5 w-full">
                Получить расчёт <Icon.ArrowRight className="size-4" />
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold tracking-tight text-navy-900">Читайте также</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/blog/${o.slug}`}
                className="group rounded-3xl border border-line bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              >
                <p className="text-xs text-muted">{formatDate(o.publishedAt)}</p>
                <h3 className="font-display mt-2 text-lg font-bold text-navy-900 group-hover:text-accent-600">{o.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
