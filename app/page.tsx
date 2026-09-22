import Link from "next/link";
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
import { Calculator } from "@/components/Calculator";
import { CtaSection } from "@/components/CtaSection";

export const metadata: Metadata = {
  alternates: { canonical: siteConfig.url },
};

const koreaBenefits = [
  {
    icon: Icon.Steering,
    title: "Левый руль",
    text: "В Корее правостороннее движение — все автомобили с левым рулём, как в России. Никаких компромиссов, как с японскими авто.",
  },
  {
    icon: Icon.Sparkles,
    title: "Богатые комплектации",
    text: "Версии для внутреннего рынка Кореи оснащены лучше экспортных: вентиляция сидений, панорама, проекция, полный пакет ассистентов.",
  },
  {
    icon: Icon.Eye,
    title: "Прозрачная история",
    text: "Единая страховая база Carhistory показывает все ДТП, выплаты и замену деталей. Скрутить пробег или скрыть аварию практически невозможно.",
  },
  {
    icon: Icon.Snow,
    title: "Готовы к зиме",
    text: "Подогрев руля, сидений, лобового стекла и форсунок — стандарт для корейского климата, который очень похож на российский.",
  },
  {
    icon: Icon.Wallet,
    title: "Реальная экономия",
    text: "Аналогичный автомобиль в России обычно дороже на 15–30%. Особенно заметна разница по кроссоверам, минивэнам и Genesis.",
  },
  {
    icon: Icon.Handshake,
    title: "Сервис в России",
    text: "Hyundai, Kia и Genesis — одни из самых распространённых марок в РФ. Запчасти доступны, сервисов много, ликвидность высокая.",
  },
];

const trust = [
  {
    icon: Icon.Document,
    title: "Договор и фиксированная комиссия",
    text: "Комиссия прописана в договоре и не зависит от цены автомобиля. Никаких «внезапных» доплат на финише.",
  },
  {
    icon: Icon.Camera,
    title: "Фото- и видеоотчёты на каждом этапе",
    text: "Осмотр, погрузка, прибытие в Бишкек, оформление, отправка в Россию — вы видите свою машину каждую неделю.",
  },
  {
    icon: Icon.Shield,
    title: "Только легальное оформление",
    text: "Реальная стоимость в декларации, ЭПТС, утильсбор — автомобиль встаёт на учёт в любом регионе РФ без вопросов.",
  },
  {
    icon: Icon.Globe,
    title: "Свои люди в Корее и Бишкеке",
    text: "Не посредники, а собственные специалисты: осмотр вживую, контроль погрузки и оформления на месте.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[serviceJsonLd(), howToJsonLd(steps), faqJsonLd(faq.slice(0, 6))]} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
        <div className="absolute -top-40 right-[-15%] size-[640px] rounded-full bg-accent-500/20 blur-[140px]" aria-hidden />
        <div className="absolute -bottom-64 left-[-10%] size-[520px] rounded-full bg-sky-500/10 blur-[140px]" aria-hidden />

        <div className="container-x relative grid items-center gap-12 pt-14 pb-20 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-28">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Легальный ввоз через ЕАЭС · ЭПТС · договор
            </span>
            <h1 className="font-display mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem]">
              Автомобили из Кореи в Россию{" "}
              <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
                через Кыргызстан
              </span>{" "}
              под ключ
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
              Подбираем, проверяем и выкупаем автомобиль в Корее, доставляем в Бишкек, оформляем по ставкам ЕАЭС и
              передаём вам в России. Одна фиксированная комиссия, полный контроль на каждом этапе.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#zayavka" size="lg">
                Рассчитать стоимость
                <Icon.ArrowRight className="size-5" />
              </ButtonLink>
              <ButtonAnchor
                href={links.whatsapp("Здравствуйте! Хочу подобрать авто из Кореи.")}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-light"
                size="lg"
              >
                <Icon.WhatsApp className="size-5" />
                Написать в WhatsApp
              </ButtonAnchor>
            </div>

            <ul className="mt-10 grid gap-3 text-[15px] text-white/80 sm:grid-cols-2">
              {[
                "Левый руль и богатые комплектации",
                "Экономия 15–30% относительно РФ",
                "45–60 дней от заказа до ключей",
                "Видеоотчёты на каждом этапе",
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

        {/* stats */}
        <div className="relative border-t border-white/10">
          <div className="container-x grid grid-cols-2 divide-white/10 py-8 lg:grid-cols-4 lg:divide-x">
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
            title="Лучший рынок подержанных авто для российского водителя"
            description="Южная Корея — единственная страна Азии с левым рулём, где массово продаются свежие Hyundai, Kia и Genesis с прозрачной историей и полным «зимним» пакетом."
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

      {/* WHY KYRGYZSTAN */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Маршрут"
              title="Почему автомобили едут через Кыргызстан"
              description="Кыргызстан — участник Евразийского экономического союза. Автомобиль, оформленный в Бишкеке, получает ЭПТС и законно ставится на учёт в России."
            />
            <ul className="mt-8 space-y-4">
              {[
                ["Единые ставки ЕАЭС", "Таможенные платежи рассчитываются по единому тарифу союза для физических лиц."],
                ["Отлаженная логистика", "Через Бишкек ежемесячно проходят тысячи корейских авто — сроки и цены предсказуемы."],
                ["ЭПТС признаётся в РФ", "Электронный паспорт действует во всех странах союза, постановка на учёт в ГИБДД — стандартная."],
                ["Русскоязычная среда", "Все документы, общение и контроль — на русском языке, без переводчиков и потерь смысла."],
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
              { icon: Icon.Ship, step: "Корея", title: "Инчхон / Пусан", text: "Выкуп, снятие с учёта, экспортные документы, погрузка." },
              { icon: Icon.Truck, step: "Транзит", title: "Китай → Бишкек", text: "Контейнер до порта КНР, далее автовоз или ж/д в Кыргызстан." },
              { icon: Icon.Document, step: "ЕАЭС", title: "Оформление", text: "Таможня по единым ставкам, брокер, ЭПТС, проверка документов." },
              { icon: Icon.Handshake, step: "Россия", title: "Передача", text: "Автовоз или перегон, утильсбор, полный пакет для ГИБДД." },
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
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Как это работает"
              title="Шесть этапов — и ключи у вас в руках"
              description="Мы ведём автомобиль от аукциона в Корее до вашего двора. Вы участвуете только в приятной части — выборе."
            />
            <ButtonLink href="/kak-eto-rabotaet" variant="ghost" className="shrink-0 border border-line">
              Подробное описание этапов
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

      {/* CARS */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Популярные модели"
              title="Что чаще всего заказывают из Кореи"
              description="Ориентировочные цены «под ключ» в России. Точный расчёт — после подбора конкретного автомобиля."
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

      {/* CALCULATOR */}
      <section id="kalkulyator" className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Калькулятор"
            title="Сколько стоит авто из Кореи под ключ"
            description="Двигайте ползунок и выбирайте параметры — увидите ориентировочную стоимость с разбивкой по каждой статье."
            align="center"
          />
          <div className="mt-14">
            <Calculator />
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            Хотите понять, из чего складывается цена?{" "}
            <Link href="/stoimost" className="font-semibold text-navy-900 underline decoration-accent-500 decoration-2 underline-offset-4">
              Подробно о стоимости
            </Link>
          </p>
        </div>
      </section>

      {/* TRUST */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Гарантии"
            title="Почему нам доверяют покупку за 8 000 километров"
            description="Мы построили процесс так, чтобы клиент видел всё и ни за что не переживал."
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
              description="Собрали то, о чём спрашивают чаще всего. Не нашли ответ — напишите нам, ответим за несколько минут."
            />
            <ButtonLink href="/faq" variant="secondary" className="mt-8">
              Все вопросы и ответы
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
