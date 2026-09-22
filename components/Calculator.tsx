"use client";

import { useMemo, useState } from "react";
import { estimate, rates, type AgeBand, type FuelType } from "@/lib/pricing";
import { links } from "@/lib/site";
import { Icon } from "@/components/ui/Icons";
import { ButtonAnchor } from "@/components/ui/Button";

const usd = (n: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const rub = (n: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n);

const ages: { value: AgeBand; label: string; hint: string }[] = [
  { value: "under3", label: "До 3 лет", hint: "пошлина от стоимости" },
  { value: "3to5", label: "3–5 лет", hint: "самый выгодный" },
  { value: "over5", label: "Старше 5 лет", hint: "повышенная ставка" },
];

const fuels: { value: FuelType; label: string }[] = [
  { value: "petrol", label: "Бензин" },
  { value: "diesel", label: "Дизель" },
  { value: "hybrid", label: "Гибрид" },
  { value: "electric", label: "Электро" },
];

const engines = [1600, 2000, 2200, 2500, 3000, 3500, 3800];

export function Calculator() {
  const [price, setPrice] = useState(20000);
  const [engine, setEngine] = useState(2000);
  const [age, setAge] = useState<AgeBand>("3to5");
  const [fuel, setFuel] = useState<FuelType>("petrol");
  const [showDetails, setShowDetails] = useState(true);

  const result = useMemo(() => estimate({ priceUsd: price, engineCc: engine, age, fuel }), [price, engine, age, fuel]);

  const summary = `Здравствуйте! Рассчитал на сайте: авто ${usd(price)}, ${engine} см³, ${
    ages.find((a) => a.value === age)?.label
  }, ${fuels.find((f) => f.value === fuel)?.label}. Итого ориентировочно ${usd(result.totalUsd)}. Хочу уточнить расчёт.`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      {/* Inputs */}
      <div className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
            <Icon.Calculator className="size-5" />
          </span>
          <h3 className="font-display text-xl font-bold text-navy-900">Параметры автомобиля</h3>
        </div>

        <div className="mt-8 space-y-7">
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="calc-price" className="text-sm font-semibold text-navy-900">
                Цена автомобиля в Корее
              </label>
              <output className="font-display text-2xl font-bold text-navy-900" htmlFor="calc-price">
                {usd(price)}
              </output>
            </div>
            <input
              id="calc-price"
              type="range"
              min={8000}
              max={80000}
              step={500}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-3 w-full accent-accent-500"
            />
            <div className="mt-1 flex justify-between text-xs text-muted">
              <span>8 000 $</span>
              <span>≈ {Math.round((price * rates.usdToKrw) / 10000).toLocaleString("ru-RU")} млн ₩</span>
              <span>80 000 $</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-navy-900">Объём двигателя</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {engines.map((cc) => (
                <button
                  key={cc}
                  type="button"
                  onClick={() => setEngine(cc)}
                  className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                    engine === cc
                      ? "border-navy-900 bg-navy-900 text-white"
                      : "border-line bg-white text-navy-900 hover:border-navy-900/40"
                  }`}
                  aria-pressed={engine === cc}
                >
                  {(cc / 1000).toFixed(1)} л
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-navy-900">Возраст автомобиля</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {ages.map((a) => (
                <button
                  key={a.value}
                  type="button"
                  onClick={() => setAge(a.value)}
                  className={`rounded-2xl border p-3 text-left transition ${
                    age === a.value
                      ? "border-navy-900 bg-navy-900 text-white"
                      : "border-line bg-white text-navy-900 hover:border-navy-900/40"
                  }`}
                  aria-pressed={age === a.value}
                >
                  <span className="block text-sm font-semibold">{a.label}</span>
                  <span className={`block text-xs ${age === a.value ? "text-white/60" : "text-muted"}`}>
                    {a.hint}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-navy-900">Тип двигателя</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {fuels.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFuel(f.value)}
                  className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                    fuel === f.value
                      ? "border-navy-900 bg-navy-900 text-white"
                      : "border-line bg-white text-navy-900 hover:border-navy-900/40"
                  }`}
                  aria-pressed={fuel === f.value}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="flex flex-col rounded-3xl bg-navy-900 p-6 text-white shadow-lift sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">Ориентировочно под ключ</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
          <span className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{usd(result.totalUsd)}</span>
          <span className="text-white/60">≈ {rub(result.totalRub)}</span>
        </div>
        <p className="mt-2 text-sm text-white/60">
          Расходы сверх цены авто: <span className="font-semibold text-white">{usd(result.overheadUsd)}</span>
        </p>

        <button
          type="button"
          onClick={() => setShowDetails((v) => !v)}
          className="mt-6 flex w-full items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
          aria-expanded={showDetails}
        >
          Детализация расчёта
          <Icon.ChevronDown className={`size-4 transition ${showDetails ? "rotate-180" : ""}`} />
        </button>

        {showDetails && (
          <ul className="mt-3 divide-y divide-white/10">
            {result.lines.map((l) => (
              <li key={l.label} className="flex items-start justify-between gap-4 py-2.5 text-sm">
                <div>
                  <p className="text-white/90">{l.label}</p>
                  {l.note && <p className="text-xs text-white/45">{l.note}</p>}
                </div>
                <span className="shrink-0 font-semibold tabular-nums">{usd(l.usd)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          <ButtonAnchor
            href={links.whatsapp(summary)}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="w-full"
          >
            <Icon.WhatsApp className="size-5" />
            Уточнить расчёт у менеджера
          </ButtonAnchor>
          <p className="mt-4 text-xs leading-relaxed text-white/45">
            Расчёт ориентировочный: курсы {rates.usdToRub} ₽/$ и {rates.eurToUsd} $/€, ставки ЕАЭС для физлиц и
            льготный утильсбор. Точная сумма фиксируется в договоре после подбора конкретного автомобиля.
          </p>
        </div>
      </div>
    </div>
  );
}
