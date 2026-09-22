import { Icon } from "@/components/ui/Icons";

/**
 * Abstract illustration of the Korea → Bishkek → Russia route.
 * Pure SVG + CSS, no external assets.
 */
export function RouteMap() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.07] to-white/[0.02] ring-1 ring-white/10" />

      <svg viewBox="0 0 560 420" className="w-full" role="img" aria-label="Маршрут: Корея — Бишкек — Россия">
        <defs>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0" stopColor="#fbbf24" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* faint land masses */}
        <g fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)">
          <path d="M60 60c60-30 140-40 220-25 60 10 110 40 150 80 40 40 60 100 40 150-20 50-80 80-150 90-70 10-150 0-210-40C50 275 20 200 30 140 35 110 40 75 60 60Z" />
        </g>

        {/* route path */}
        <path
          id="path"
          d="M470 300 C 420 180, 330 190, 290 220 S 190 180, 100 110"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
        />
        <path
          d="M470 300 C 420 180, 330 190, 290 220 S 190 180, 100 110"
          fill="none"
          stroke="url(#route)"
          strokeWidth="2.5"
          strokeDasharray="8 10"
          strokeLinecap="round"
          className="route-dash"
        />

        {/* moving car dot */}
        <circle r="6" fill="#fbbf24" filter="url(#glow)">
          <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path="M470 300 C 420 180, 330 190, 290 220 S 190 180, 100 110" />
        </circle>

        {/* nodes */}
        <Node x={470} y={300} label="Корея" sub="Инчхон · Пусан" align="end" />
        <Node x={290} y={220} label="Кыргызстан" sub="Бишкек · ЕАЭС" align="middle" />
        <Node x={100} y={110} label="Россия" sub="ваш город" align="start" />
      </svg>

      {/* floating chips */}
      <div className="animate-float pointer-events-none absolute top-6 right-6 hidden rounded-2xl bg-white/95 px-4 py-3 text-navy-900 shadow-lift sm:block">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Icon.Shield className="size-4" />
          </span>
          <div>
            <p className="text-[11px] text-muted">Оформление</p>
            <p className="text-sm font-semibold">ЭПТС · ЕАЭС</p>
          </div>
        </div>
      </div>
      <div className="animate-float delay-2000 pointer-events-none absolute bottom-6 left-6 hidden rounded-2xl bg-white/95 px-4 py-3 text-navy-900 shadow-lift sm:block">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-amber-100 text-accent-600">
            <Icon.Clock className="size-4" />
          </span>
          <div>
            <p className="text-[11px] text-muted">Срок под ключ</p>
            <p className="text-sm font-semibold">45–60 дней</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Node({
  x,
  y,
  label,
  sub,
  align,
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  align: "start" | "middle" | "end";
}) {
  const dx = align === "start" ? -8 : align === "end" ? 8 : 0;
  const ty = y + (align === "middle" ? 40 : -22);
  return (
    <g>
      <circle cx={x} cy={y} r="18" fill="rgba(245,158,11,0.15)" />
      <circle cx={x} cy={y} r="7" fill="#0b1220" stroke="#fbbf24" strokeWidth="3" />
      <text
        x={x + dx}
        y={ty}
        textAnchor={align}
        fill="#fff"
        fontSize="16"
        fontWeight="700"
        fontFamily="var(--font-display), system-ui"
      >
        {label}
      </text>
      <text x={x + dx} y={ty + 18} textAnchor={align} fill="rgba(255,255,255,0.55)" fontSize="12" fontFamily="var(--font-sans), system-ui">
        {sub}
      </text>
    </g>
  );
}
