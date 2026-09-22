import type { FaqItem } from "@/lib/content/faq";
import { Icon } from "@/components/ui/Icons";

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-white shadow-soft">
      {items.map((item, i) => (
        <details key={item.question} className="group px-6 sm:px-8" open={i === 0}>
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left text-[17px] font-semibold text-navy-900 marker:content-none">
            <span>{item.question}</span>
            <span className="faq-chevron flex size-8 shrink-0 items-center justify-center rounded-full bg-surface text-navy-900 transition group-open:bg-accent-500">
              <Icon.ChevronDown className="size-4" />
            </span>
          </summary>
          <p className="pb-6 text-[15.5px] leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
