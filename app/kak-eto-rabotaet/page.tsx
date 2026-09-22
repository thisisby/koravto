import type { Metadata } from "next";
import { buildMetadata, howToJsonLd } from "@/lib/seo";
import { steps } from "@/lib/content/steps";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { StepsTimeline } from "@/components/StepsTimeline";
import { CtaSection } from "@/components/CtaSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = buildMetadata({
  title: "Как купить авто из Кореи с доставкой в Россию: 6 этапов",
  description:
    "Пошаговая схема покупки автомобиля в Южной Корее с доставкой в Россию через Кыргызстан: подбор, договор, осмотр и выкуп, логистика в Бишкек, оформление в ЕАЭС, передача в вашем городе.",
  path: "/kak-eto-rabotaet",
  keywords: ["как купить авто из Кореи", "доставка авто из Кореи в Россию", "этапы покупки авто из Кореи"],
});

const payments = [
  { title: "Предоплата", pct: "Выкуп", text: "Стоимость автомобиля и расходы в Корее — после того как вы утвердили конкретную машину по видеоотчёту." },
  { title: "Второй платёж", pct: "Логистика", text: "Доставка до Бишкека и таможенные платежи ЕАЭС — при прибытии автомобиля в Кыргызстан." },
  { title: "Финальный платёж", pct: "Передача", text: "Доставка в Россию, утильсбор и комиссия — при передаче автомобиля и документов." },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={howToJsonLd(steps)} />
      <PageHero
        eyebrow="Процесс"
        title="Как это работает: от заявки до ключей за 45–60 дней"
        description="Мы ведём каждый автомобиль по одной проверенной схеме. Вы видите каждый шаг и платите поэтапно — только за уже выполненную работу."
        crumbs={[{ name: "Как это работает", path: "/kak-eto-rabotaet" }]}
      >
        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          {["Подбор", "Договор", "Выкуп", "Доставка", "Оформление", "Передача"].map((t, i) => (
            <span key={t} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5">
              <span className="font-display text-accent-400">{i + 1}</span> {t}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="container-x">
          <StepsTimeline steps={steps} detailed />
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Оплата"
            title="Платите поэтапно — за результат, а не за обещания"
            description="Деньги вносятся тремя частями по мере выполнения этапов. Каждый платёж подтверждается документами и отчётом."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {payments.map((p, i) => (
              <div key={p.title} className="rounded-3xl border border-line bg-white p-7 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl font-extrabold text-navy-900/10">{i + 1}</span>
                  <span className="rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-accent-400">{p.pct}</span>
                </div>
                <h3 className="font-display mt-3 text-xl font-bold text-navy-900">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-4 rounded-3xl border border-accent-500/30 bg-amber-50 p-6">
            <Icon.Shield className="size-7 shrink-0 text-accent-600" />
            <p className="text-[15px] leading-relaxed text-navy-900">
              <span className="font-semibold">Что вы получаете на руки:</span> договор купли-продажи, инвойс и экспортный
              сертификат из Кореи, декларацию и квитанции об уплате платежей ЕАЭС, ЭПТС, квитанцию об уплате
              утилизационного сбора, акт приёма-передачи. Этого пакета достаточно для постановки на учёт в любом
              отделении ГИБДД.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Начнём с подбора — это бесплатно"
        description="Опишите автомобиль мечты: модель, год, бюджет. Пришлём варианты с отчётами и расчётом уже завтра."
      />
    </>
  );
}
