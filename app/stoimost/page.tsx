import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { rates } from "@/lib/pricing";
import { PageHero } from "@/components/PageHero";
import { Calculator } from "@/components/Calculator";
import { CtaSection } from "@/components/CtaSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = buildMetadata({
  title: "Стоимость авто из Кореи под ключ: калькулятор и разбор цены",
  description:
    "Из чего складывается стоимость автомобиля из Кореи с доставкой в Россию через Кыргызстан: цена авто, расходы в Корее, логистика, таможня ЕАЭС, утильсбор, комиссия. Онлайн-калькулятор.",
  path: "/stoimost",
  keywords: [
    "стоимость авто из Кореи",
    "сколько стоит привезти авто из Кореи",
    "калькулятор растаможки авто из Кореи",
    "цена авто из Кореи под ключ",
  ],
});

const breakdown = [
  {
    icon: Icon.Wallet,
    title: "Цена автомобиля в Корее",
    text: "Аукционная или дилерская цена. Мы показываем вам исходную цену с площадки — без наценки.",
    share: "60–75%",
  },
  {
    icon: Icon.Document,
    title: "Расходы в Корее",
    text: "Аукционный сбор, снятие с учёта, экспортный сертификат, доставка в порт. Фиксированная сумма.",
    share: `≈ ${rates.koreaExpenses} $`,
  },
  {
    icon: Icon.Ship,
    title: "Логистика до Бишкека",
    text: "Морской фрахт до Китая, наземная доставка до Кыргызстана, страхование груза.",
    share: `≈ ${rates.freightToBishkek} $`,
  },
  {
    icon: Icon.Shield,
    title: "Таможенные платежи ЕАЭС",
    text: "Зависят от возраста и объёма двигателя. Самая выгодная категория — 3–5 лет с мотором до 2,0 л.",
    share: "от 1,5 €/см³",
  },
  {
    icon: Icon.Truck,
    title: "Оформление и доставка в РФ",
    text: "Брокер, ЭПТС, склад в Бишкеке, автовоз или перегон до вашего города.",
    share: `≈ ${rates.kgClearanceServices + rates.deliveryToRussia} $`,
  },
  {
    icon: Icon.Handshake,
    title: "Утильсбор и комиссия",
    text: `Льготный утильсбор для личного пользования и наша фиксированная комиссия ${rates.commission} $ — одна на весь заказ.`,
    share: "фиксировано",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Стоимость"
        title="Сколько стоит автомобиль из Кореи под ключ"
        description="Никаких «от 5 000 $ и выше». Ниже — честная структура цены и калькулятор, который считает по тем же правилам, что и наш менеджер."
        crumbs={[{ name: "Стоимость", path: "/stoimost" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Калькулятор"
            title="Рассчитайте ориентировочную стоимость"
            description="Меняйте цену, объём двигателя и возраст — итог пересчитывается мгновенно."
            align="center"
          />
          <div className="mt-14">
            <Calculator />
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Структура цены"
            title="Из чего складывается итоговая сумма"
            description="Каждая статья прописывается в расчёте, который вы получаете до подписания договора. Ни одна из них не появляется «внезапно» позже."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {breakdown.map(({ icon: I, title, text, share }) => (
              <div key={title} className="rounded-3xl border border-line bg-white p-7 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-navy-900 text-accent-400">
                    <I className="size-5" />
                  </span>
                  <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-navy-900">{share}</span>
                </div>
                <h3 className="font-display mt-5 text-lg font-bold text-navy-900">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Как сэкономить"
              title="Три правила выгодной покупки"
            />
            <ol className="mt-8 space-y-6">
              {[
                [
                  "Возраст 3–5 лет",
                  "Для этой категории пошлина ЕАЭС считается только от объёма двигателя, а не от цены. Богатая комплектация или премиальный бренд не увеличивают платёж.",
                ],
                [
                  "Двигатель до 2,0 литра",
                  "Ставка растёт ступенями: 1,7 €/см³ до 1,5 л, 2,5 до 1,8 л, 2,7 до 2,3 л. Мотор 2.0 MPI на Sonata или K5 — оптимален.",
                ],
                [
                  "Один автомобиль в год",
                  "Льготный утилизационный сбор действует при ввозе для личного пользования. Второй автомобиль за 12 месяцев — уже по коммерческой ставке.",
                ],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-500 font-display font-bold text-navy-900">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy-900">{t}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl bg-navy-900 p-8 text-white">
            <h3 className="font-display text-2xl font-bold">Пример расчёта: Kia K5 2.0, 2022 г.</h3>
            <p className="mt-2 text-white/60">Возраст 3–5 лет · бензин · 1 999 см³</p>
            <ul className="mt-6 divide-y divide-white/10 text-[15px]">
              {[
                ["Цена в Корее", "18 500 $"],
                ["Расходы в Корее", `${rates.koreaExpenses} $`],
                ["Доставка до Бишкека и страховка", `${rates.freightToBishkek + 185} $`],
                ["Пошлина ЕАЭС (2,7 €/см³)", `≈ ${Math.round(1999 * 2.7 * rates.eurToUsd).toLocaleString("ru-RU")} $`],
                ["Оформление в Кыргызстане", `${rates.kgClearanceServices} $`],
                ["Доставка в Россию", `${rates.deliveryToRussia} $`],
                ["Утильсбор (льготный)", `≈ ${Math.round(rates.utilFeeRub.over3 / rates.usdToRub)} $`],
                ["Комиссия", `${rates.commission} $`],
              ].map(([k, v]) => (
                <li key={k} className="flex justify-between py-2.5">
                  <span className="text-white/80">{k}</span>
                  <span className="font-semibold tabular-nums">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-baseline justify-between border-t border-white/20 pt-5">
              <span className="text-white/70">Итого под ключ</span>
              <span className="font-display text-3xl font-extrabold text-accent-400">
                ≈{" "}
                {(
                  18500 +
                  rates.koreaExpenses +
                  rates.freightToBishkek +
                  185 +
                  Math.round(1999 * 2.7 * rates.eurToUsd) +
                  rates.kgClearanceServices +
                  rates.deliveryToRussia +
                  Math.round(rates.utilFeeRub.over3 / rates.usdToRub) +
                  rates.commission
                ).toLocaleString("ru-RU")}{" "}
                $
              </span>
            </div>
            <p className="mt-4 text-xs text-white/45">
              Расчёт ориентировочный по курсам {rates.usdToRub} ₽/$ и {rates.eurToUsd} $/€. Подробнее о платежах —
              в статье{" "}
              <Link href="/blog/rastamozhka-avto-iz-korei-cherez-kyrgyzstan" className="underline hover:text-white">
                о растаможке через Кыргызстан
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Получите точный расчёт под ваш автомобиль"
        description="Пришлите ссылку с Encar или просто опишите желаемую модель — вернём расчёт по всем статьям в течение суток."
      />
    </>
  );
}
