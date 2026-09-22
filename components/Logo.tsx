import { siteConfig } from "@/lib/site";

export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" rx="11" fill="#0b1220" />
      <path
        d="M9 26.5c3-9 6-13 11-13s8 4 11 13"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="26.5" r="2.4" fill="#fff" />
      <circle cx="20" cy="13.5" r="2.4" fill="#fff" />
      <circle cx="31" cy="26.5" r="2.4" fill="#fff" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[17px] font-extrabold tracking-tight ${
            light ? "text-white" : "text-navy-900"
          }`}
        >
          {siteConfig.name}
        </span>
        <span className={`text-[10.5px] font-medium whitespace-nowrap ${light ? "text-white/60" : "text-muted"}`}>
          Корея → Кыргызстан → Россия
        </span>
      </span>
    </>
  );
}
