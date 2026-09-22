/**
 * Approximate turnkey cost model.
 *
 * IMPORTANT: every number here is an ESTIMATE meant to give the visitor a
 * realistic ballpark. Customs rules and fees in the EAEU / Russia change
 * regularly — keep this file up to date and always confirm the final figure
 * with a manager before signing a contract.
 */

export type AgeBand = "under3" | "3to5" | "over5";
export type FuelType = "petrol" | "diesel" | "hybrid" | "electric";

export const rates = {
  /** Exchange rates used for on-page estimates */
  eurToUsd: 1.1,
  usdToRub: 90,
  usdToKrw: 1350,

  /** Fixed expenses in Korea, USD: auction/dealer fee, deregistration, domestic transport, export docs */
  koreaExpenses: 900,
  /** Sea + land freight Korea -> Bishkek, USD */
  freightToBishkek: 2600,
  /** Cargo insurance, % of car price */
  insurancePct: 0.01,
  /** Brokerage, EPTS, warehouse in Kyrgyzstan, USD */
  kgClearanceServices: 700,
  /** Delivery Bishkek -> Russia (Moscow region reference), USD */
  deliveryToRussia: 1200,
  /** Utilization fee in Russia for personal use, RUB (preferential rate) */
  utilFeeRub: { under3: 3400, over3: 5200 },
  /** Company commission, USD */
  commission: 1500,
} as const;

/**
 * EAEU unified customs duty for vehicles imported by individuals for personal use.
 * Source: EAEU Council decision on unified rates (personal-use vehicles).
 */
export function eaeuDutyEur(priceUsd: number, engineCc: number, age: AgeBand): number {
  const priceEur = priceUsd / rates.eurToUsd;

  if (age === "under3") {
    // (% of value, min €/cc) by price bracket in EUR
    const brackets: [number, number, number][] = [
      [8500, 0.54, 2.5],
      [16700, 0.48, 3.5],
      [42300, 0.48, 5.5],
      [84500, 0.48, 7.5],
      [169000, 0.48, 15],
      [Infinity, 0.48, 20],
    ];
    const [, pct, minPerCc] = brackets.find(([limit]) => priceEur <= limit)!;
    return Math.max(priceEur * pct, engineCc * minPerCc);
  }

  const perCc =
    age === "3to5"
      ? engineCc <= 1000
        ? 1.5
        : engineCc <= 1500
          ? 1.7
          : engineCc <= 1800
            ? 2.5
            : engineCc <= 2300
              ? 2.7
              : engineCc <= 3000
                ? 3.0
                : 3.6
      : engineCc <= 1000
        ? 3.0
        : engineCc <= 1500
          ? 3.2
          : engineCc <= 1800
            ? 3.5
            : engineCc <= 2300
              ? 4.8
              : engineCc <= 3000
                ? 5.0
                : 5.7;

  return engineCc * perCc;
}

export type EstimateInput = {
  priceUsd: number;
  engineCc: number;
  age: AgeBand;
  fuel: FuelType;
};

export type EstimateLine = { label: string; usd: number; note?: string };

export function estimate(input: EstimateInput) {
  const { priceUsd, engineCc, age, fuel } = input;

  // Electric vehicles: duty is 15% of value in the EAEU (simplified)
  const dutyUsd =
    fuel === "electric"
      ? priceUsd * 0.15
      : eaeuDutyEur(priceUsd, engineCc, age) * rates.eurToUsd;

  const utilRub = age === "under3" ? rates.utilFeeRub.under3 : rates.utilFeeRub.over3;
  const utilUsd = utilRub / rates.usdToRub;

  const lines: EstimateLine[] = [
    { label: "Стоимость автомобиля в Корее", usd: priceUsd },
    {
      label: "Расходы в Корее",
      usd: rates.koreaExpenses,
      note: "аукционный сбор, снятие с учёта, доставка в порт, экспортные документы",
    },
    {
      label: "Доставка Корея → Бишкек",
      usd: rates.freightToBishkek + priceUsd * rates.insurancePct,
      note: "фрахт + страхование груза",
    },
    {
      label: "Таможенная пошлина ЕАЭС",
      usd: dutyUsd,
      note: fuel === "electric" ? "15% от стоимости" : "по единым ставкам для физлиц",
    },
    {
      label: "Оформление в Кыргызстане",
      usd: rates.kgClearanceServices,
      note: "брокер, ЭПТС, СВХ",
    },
    { label: "Доставка Бишкек → Россия", usd: rates.deliveryToRussia, note: "ориентир — Москва" },
    {
      label: "Утилизационный сбор (РФ)",
      usd: utilUsd,
      note: `льготная ставка для личного пользования, ${utilRub.toLocaleString("ru-RU")} ₽`,
    },
    { label: "Комиссия компании", usd: rates.commission, note: "фиксированная, по договору" },
  ];

  const totalUsd = lines.reduce((s, l) => s + l.usd, 0);

  return {
    lines,
    totalUsd,
    totalRub: totalUsd * rates.usdToRub,
    overheadUsd: totalUsd - priceUsd,
  };
}
