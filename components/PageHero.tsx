import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
};

/** Dark header block used on all inner pages. */
export function PageHero({ eyebrow, title, description, crumbs, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute -top-40 right-[-10%] size-[520px] rounded-full bg-accent-500/20 blur-[120px]"
        aria-hidden
      />
      <div className="container-x relative pt-8 pb-14 sm:pt-10 sm:pb-20">
        <Breadcrumbs items={crumbs} tone="dark" />
        <div className="mt-8 max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">{eyebrow}</p>
          )}
          <h1 className="font-display text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description && <p className="mt-5 text-balance text-lg leading-relaxed text-white/70">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
