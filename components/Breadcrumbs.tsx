import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all: Crumb[] = [{ name: "Главная", path: "/" }, ...items];
  const dark = tone === "dark";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(all)} />
      <nav aria-label="Навигационная цепочка">
        <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] ${dark ? "text-white/60" : "text-muted"}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span className={dark ? "text-white/90" : "text-navy-900"} aria-current="page">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className={`transition ${dark ? "hover:text-white" : "hover:text-navy-900"}`}>
                    {c.name}
                  </Link>
                )}
                {!last && <span aria-hidden>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
