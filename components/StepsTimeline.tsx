import type { Step } from "@/lib/content/steps";
import { Icon } from "@/components/ui/Icons";

export function StepsTimeline({ steps, detailed = false }: { steps: Step[]; detailed?: boolean }) {
  return (
    <ol className="relative space-y-6">
      <span className="absolute top-6 bottom-6 left-6 hidden w-px bg-gradient-to-b from-accent-500 via-line to-line sm:block" aria-hidden />
      {steps.map((s, i) => (
        <li key={s.title} className="relative sm:pl-20">
          <span className="absolute top-5 left-0 hidden size-12 items-center justify-center rounded-full border-4 border-white bg-navy-900 font-display text-sm font-bold text-accent-400 shadow-soft sm:flex">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-navy-900 font-display text-xs font-bold text-accent-400 sm:hidden">
                  {i + 1}
                </span>
                <h3 className="font-display text-xl font-bold text-navy-900">{s.title}</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-navy-900">
                <Icon.Clock className="size-3.5" />
                {s.duration}
              </span>
            </div>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{s.short}</p>
            {detailed && (
              <ul className="mt-4 space-y-2">
                {s.details.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[15px] text-navy-900/85">
                    <Icon.Check className="mt-1 size-4 shrink-0 text-accent-600" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
