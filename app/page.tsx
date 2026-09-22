import type { Metadata } from "next";
import { siteConfig, links } from "@/lib/site";
import { steps } from "@/lib/content/steps";
import { faq } from "@/lib/content/faq";
import { cars } from "@/lib/content/cars";
import { faqJsonLd, howToJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/ui/Icons";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RouteMap } from "@/components/RouteMap";
import { CarCard } from "@/components/CarCard";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";

export const metadata: Metadata = {
  alternates: { canonical: siteConfig.url },
};

const brands = ["Mercedes-Benz", "BMW", "Porsche", "Land Rover", "Audi", "Genesis"];

const koreaBenefits = [
  {
    icon: Icon.Globe,
    title: "Крупный премиальный рынок",
    text: "Корея — в пятёрке мировых рынков Mercedes-Benz и BMW. Выбор свежих E-Class, GLE, 5 Series и X5 шире, чем в Европе.",
  },
  {
    icon: Icon.Eye,
    title: "Прозрачная история",
    text: "Единая страховая база Carhistory и сервисный архив официального дилера — по каждому автомобилю.",
  },
  {
    icon: Icon.Sparkles,
    title: "Топовые комплектации",
    text: "AMG Line, M Sport, Executive, Autobiography. Базовые версии на корейском рынке почти не встречаются.",
  },
  {
    icon: Icon.Steering,
    title: "Левый руль",
    text: "Правостороннее движение, как в России. Никаких компромиссов, характерных для японского рынка.",
  },
  {
    icon: Icon.Clock,
    title: "Малые пробеги",
    text: "Средний годовой пробег в Корее — 12–15 тыс. км. Премиальные автомобили часто вторые в семье.",
  },
  {
    icon: Icon.Wallet,
    title: "Цена ниже российской",
    text: "Для автомобилей 3–5 лет пошлина ЕАЭС считается от объёма двигателя, а не от стоимости. Итог — на 15–25% ниже рынка РФ.",
  },
];

const trust = [
  {
    icon: Icon.Document,
    title: "Договор и фиксированная комиссия",
    text: "Комиссия не зависит от цены автомобиля и прописана в договоре.",
  },
  {
    icon: Icon.Camera,
    title: "Отчёты на каждом этапе",
    text: "Осмотр, погрузка, прибытие, оформление, отправка — вы видите автомобиль каждую неделю.",
  },
  {
    icon: Icon.Shield,
    title: "Только легальное оформление",
    text: "Платежи ЕАЭС, ЭПТС, утильсбор. Регистрация в любом регионе России.",
  },
  {
    icon: Icon.Handshake,
    title: "Своя команда в Корее и Бишкеке",
    text: "Не посредники: личный осмотр, контроль погрузки и оформления на месте.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[serviceJsonLd(), howToJsonLd(steps), faqJsonLd(faq.slice(0, 6))]} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
        <div className="absolute -top-40 right-[-15%] size-[640px] rounded-full bg-accent-500/15 blur-[140px]" aria-hidden />

        <div className="container-x relative grid items-center gap-12 pt-14 pb-20 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-28">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80">
              <span className="size-1.5 rounded-full bg-accent-400" />
              Автомобили от 60 000 $ · Оформление в ЕАЭС
            </span>
            <h1 className="font-display mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Премиальные автомобили из Кореи{" "}
              <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
                с доставкой в Россию
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
              Mercedes-Benz, BMW, Porsche, Land Rover и Genesis с корейского рынка: небольшие пробеги, дилерская
              история, цена ниже российской. Подбор, проверка, доставка через Кыргызстан и оформление — под ключ.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#zayavka" size="lg">
                Получить расчёт
                <Icon.ArrowRight className="size-5" />
              </ButtonLink>
              <ButtonAnchor
                href={links.whatsapp("Здравствуйте! Интересует подбор автомобиля из Кореи.")}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-light"
                size="lg"
              >
                <Icon.WhatsApp className="size-5" />
                WhatsApp
              </ButtonAnchor>
            </div>

            <ul className="mt-10 grid gap-3 text-[15px] text-white/80 sm:grid-cols-2">
              {[
                "Только автомобили с проверенной историей",
                "На 15–25% ниже цен в России",
                "45–60 дней до передачи",
                "Личный менеджер и видеоотчёты",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="flex size-5 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
                    <Icon.Check className="size-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up delay-150">
            <RouteMap />
          </div>
        </div>

        {/* brands + stats */}
        <div className="relative border-t border-white/10">
          <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-sm font-semibold tracking-[0.14em] text-white/45 uppercase">
            {brands.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
          <div className="container-x grid grid-cols-2 divide-white/10 border-t border-white/10 py-8 lg:grid-cols-4 lg:divide-x">
            {siteConfig.stats.map((s) => (
              <div key={s.label} className="px-2 py-3 text-center lg:px-6">
                <p className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY KOREA */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Почему Корея"
            title="Европейский премиум с корейского рынка"
            description="Один из крупнейших рынков немецких марок в мире — с левым рулём, малыми пробегами и полной историей обслуживания."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {koreaBenefits.map(({ icon: I, title, text }) => (
              <div
                key={title}
                className="group rounded-3xl border border-line bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-navy-900 text-accent-400 transition group-hover:bg-accent-500 group-hover:text-navy-900">
                  <I className="size-6" />
                </span>
                <h3 className="font-display mt-5 text-xl font-bold text-navy-900">{title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARS */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Автомобили"
              title="Что мы привозим чаще всего"
              description="Ориентировочные цены под ключ в России. Точный расчёт — по конкретному автомобилю."
            />
            <ButtonLink href="/avtomobili" variant="ghost" className="shrink-0 border border-line bg-white">
              Все модели
              <Icon.ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cars.slice(0, 6).map((c) => (
              <CarCard key={c.slug} car={c} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY KYRGYZSTAN */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Маршрут"
              title="Через Кыргызстан — законно и предсказуемо"
              description="Кыргызстан входит в ЕАЭС. Автомобиль, оформленный в Бишкеке, получает ЭПТС и регистрируется в России в обычном порядке."
            />
            <ul className="mt-8 space-y-4">
              {[
                ["Единые ставки ЕАЭС", "Платежи рассчитываются по единому тарифу союза."],
                ["Отлаженная логистика", "Регулярный поток автомобилей из Кореи — предсказуемые сроки."],
                ["ЭПТС признаётся в РФ", "Стандартная постановка на учёт в ГИБДД."],
                ["Своя команда в Бишкеке", "Личная приёмка каждого автомобиля после перевозки."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-500 text-navy-900">
                    <Icon.Check className="size-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-navy-900">{t}</p>
                    <p className="text-[15px] text-muted">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ButtonLink href="/pochemu-kyrgyzstan" variant="secondary" className="mt-9">
              Подробнее о маршруте
              <Icon.ArrowRight className="size-4" />
            </ButtonLink>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Icon.Ship, step: "Корея", title: "Инчхон / Пусан", text: "Выкуп, снятие с учёта, экспортные документы." },
              { icon: Icon.Truck, step: "Транзит", title: "Китай → Бишкек", text: "Контейнер до порта КНР, далее автовоз в Кыргызстан." },
              { icon: Icon.Document, step: "ЕАЭС", title: "Оформление", text: "Таможня по единым ставкам, ЭПТС." },
              { icon: Icon.Handshake, step: "Россия", title: "Передача", text: "Закрытый автовоз, утильсбор, документы для ГИБДД." },
            ].map(({ icon: I, step, title, text }, i) => (
              <div
                key={title}
                className={`rounded-3xl p-6 ${i % 3 === 0 ? "bg-navy-900 text-white" : "border border-line bg-white text-navy-900 shadow-soft"}`}
              >
                <div className="flex items-center justify-between">
                  <I className={`size-7 ${i % 3 === 0 ? "text-accent-400" : "text-accent-600"}`} />
                  <span className={`text-xs font-semibold uppercase tracking-[0.16em] ${i % 3 === 0 ? "text-white/50" : "text-muted"}`}>
                    {step}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-lg font-bold">{title}</h3>
                <p className={`mt-1.5 text-sm leading-relaxed ${i % 3 === 0 ? "text-white/65" : "text-muted"}`}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Как это работает"
              title="Шесть этапов до передачи ключей"
              description="Мы ведём автомобиль от дилера в Корее до вашего города. Вы участвуете только в выборе."
            />
            <ButtonLink href="/kak-eto-rabotaet" variant="ghost" className="shrink-0 border border-line bg-white">
              Подробнее
              <Icon.ArrowRight className="size-4" />
            </ButtonLink>
          </div>

          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-3xl border border-line bg-white p-7 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl font-extrabold text-navy-900/10">{String(i + 1).padStart(2, "0")}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-navy-900">
                    <Icon.Clock className="size-3.5" />
                    {s.duration}
                  </span>
                </div>
                <h3 className="font-display mt-3 text-xl font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.short}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TRUST */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Гарантии"
            title="Покупка за 8 000 километров — под полным контролем"
            tone="dark"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {trust.map(({ icon: I, title, text }) => (
              <div key={title} className="flex gap-5 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-500 text-navy-900">
                  <I className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/65">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Частые вопросы"
              description="Не нашли ответ — напишите, ответим лично."
            />
            <ButtonLink href="/faq" variant="secondary" className="mt-8">
              Все вопросы
              <Icon.ArrowRight className="size-4" />
            </ButtonLink>
          </div>
          <Faq items={faq.slice(0, 6)} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
