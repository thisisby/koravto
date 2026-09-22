import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CtaSection } from "@/components/CtaSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icons";

export const metadata: Metadata = buildMetadata({
  title: "Почему авто из Кореи везут в Россию через Кыргызстан",
  description:
    "Кыргызстан — участник ЕАЭС: автомобиль, оформленный в Бишкеке, получает ЭПТС и законно ставится на учёт в России. Разбираем преимущества маршрута, легальность, сроки и сравнение с Владивостоком.",
  path: "/pochemu-kyrgyzstan",
  keywords: [
    "авто из Кореи через Кыргызстан",
    "авто из Бишкека в Россию",
    "ЕАЭС авто из Кореи",
    "ЭПТС Кыргызстан Россия",
  ],
});

const reasons = [
  {
    icon: Icon.Shield,
    title: "Единое таможенное пространство",
    text: "Кыргызстан входит в ЕАЭС вместе с Россией, Казахстаном, Беларусью и Арменией. Автомобиль, оформленный в Бишкеке, свободно обращается во всём союзе.",
  },
  {
    icon: Icon.Document,
    title: "ЭПТС — единый документ",
    text: "Электронный паспорт оформляется в общей системе и признаётся ГИБДД России. Регистрация — по стандартной процедуре.",
  },
  {
    icon: Icon.Truck,
    title: "Отлаженный коридор",
    text: "Через Кыргызстан ежемесячно проходят тысячи автомобилей из Кореи. Проверенные перевозчики, брокеры и склады — предсказуемые сроки и стоимость.",
  },
  {
    icon: Icon.Globe,
    title: "Русскоязычная среда",
    text: "Русский — официальный язык Кыргызстана. Документы, переговоры и контроль — без переводчиков.",
  },
  {
    icon: Icon.Eye,
    title: "Личный контроль",
    text: "Наша команда в Бишкеке принимает каждый автомобиль, проверяет состояние после перевозки и сопровождает оформление.",
  },
  {
    icon: Icon.Handshake,
    title: "Доставка в любой город",
    text: "Закрытый автовоз до вашего города или перегон — маршруты через Казахстан отработаны.",
  },
];

export default function WhyKyrgyzstanPage() {
  return (
    <>
      <PageHero
        eyebrow="Маршрут"
        title="Почему автомобили из Кореи едут в Россию через Кыргызстан"
        description="Логичный маршрут внутри единого экономического союза. Как это работает и почему это безопасно."
        crumbs={[{ name: "Почему через Кыргызстан", path: "/pochemu-kyrgyzstan" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Шесть причин"
            title="Удобный хаб между Кореей и Россией"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: I, title, text }) => (
              <div key={title} className="rounded-3xl border border-line bg-white p-7 shadow-soft">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-navy-900 text-accent-400">
                  <I className="size-6" />
                </span>
                <h3 className="font-display mt-5 text-lg font-bold text-navy-900">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Легальность"
            title="Что делает схему законной"
            description="Три условия, которые мы соблюдаем в каждой сделке."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              {
                n: "01",
                t: "Полный пакет документов",
                d: "Договор, инвойс, экспортный сертификат из Кореи, декларация и квитанции ЕАЭС — всё передаётся клиенту.",
              },
              {
                n: "02",
                t: "Полная уплата платежей ЕАЭС",
                d: "Пошлина и сборы — по единым ставкам союза. Все платежи отражаются в ЭПТС.",
              },
              {
                n: "03",
                t: "Утильсбор в России",
                d: "Уплачивается по действующей ставке до передачи автомобиля. Без него регистрация невозможна.",
              },
            ].map((x) => (
              <div key={x.n} className="rounded-3xl bg-navy-900 p-7 text-white">
                <span className="font-display text-3xl font-extrabold text-accent-400">{x.n}</span>
                <h3 className="font-display mt-4 text-lg font-bold">{x.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            Подробный разбор платежей —{" "}
            <Link href="/blog/rastamozhka-avto-iz-korei-cherez-kyrgyzstan" className="font-semibold text-navy-900 underline decoration-accent-500 decoration-2 underline-offset-4">
              в статье о растаможке
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Сравнение"
            title="Через Кыргызстан или через Владивосток?"
            description="Оба маршрута легальны. Кыргызстан даёт больше предсказуемости."
          />
          <div className="mt-12 overflow-hidden rounded-3xl border border-line shadow-soft">
            <table className="w-full text-left text-[15px]">
              <thead className="bg-navy-900 text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold">Критерий</th>
                  <th className="px-6 py-4 font-semibold">Через Кыргызстан</th>
                  <th className="px-6 py-4 font-semibold">Через Владивосток</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white">
                {[
                  ["Таможенное оформление", "Единые ставки ЕАЭС, отлаженный поток", "Те же ставки, сезонные очереди в порту"],
                  ["Срок доставки", "20–35 дней до Бишкека, 5–10 дней до города", "10–20 дней до Владивостока, 7–14 дней по РФ"],
                  ["Контроль", "Своя команда принимает автомобиль лично", "Зависит от брокера в порту"],
                  ["Европейская часть РФ", "Короче плечо автовоза", "Перегон через всю страну"],
                  ["Состояние автомобиля", "Осмотр после разгрузки, фотоотчёт", "Осмотр в порту, часто без клиента"],
                ].map(([c, a, b]) => (
                  <tr key={c}>
                    <td className="px-6 py-4 font-semibold text-navy-900">{c}</td>
                    <td className="px-6 py-4 text-navy-900">
                      <span className="flex items-start gap-2">
                        <Icon.Check className="mt-1 size-4 shrink-0 text-emerald-600" />
                        {a}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaSection
        title="Вопросы по маршруту?"
        description="Расскажем про оформление, документы и сроки для вашего региона."
      />
    </>
  );
}
