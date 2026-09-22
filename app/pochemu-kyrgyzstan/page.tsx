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
    text: "Кыргызстан входит в ЕАЭС вместе с Россией, Казахстаном, Беларусью и Арменией. Автомобиль, выпущенный в свободное обращение в Бишкеке, свободно обращается во всём союзе.",
  },
  {
    icon: Icon.Document,
    title: "ЭПТС — единый документ",
    text: "Электронный паспорт транспортного средства оформляется в общей системе и признаётся ГИБДД России. Постановка на учёт проходит по стандартной процедуре.",
  },
  {
    icon: Icon.Truck,
    title: "Отлаженный коридор",
    text: "Через Кыргызстан ежемесячно проходят тысячи автомобилей из Кореи. Работают проверенные перевозчики, брокеры и склады, а значит — предсказуемые сроки и стоимость.",
  },
  {
    icon: Icon.Globe,
    title: "Русскоязычная среда",
    text: "Русский — официальный язык Кыргызстана. Все документы, переговоры и контроль на месте ведутся на понятном языке, без переводчиков.",
  },
  {
    icon: Icon.Eye,
    title: "Личный контроль",
    text: "Наша команда в Бишкеке лично принимает каждый автомобиль, проверяет состояние после перевозки и сопровождает оформление.",
  },
  {
    icon: Icon.Handshake,
    title: "Гибкая доставка в РФ",
    text: "Из Бишкека автомобиль можно отправить автовозом в любой город России или перегнать своим ходом — маршруты через Казахстан отработаны до мелочей.",
  },
];

export default function WhyKyrgyzstanPage() {
  return (
    <>
      <PageHero
        eyebrow="Маршрут"
        title="Почему автомобили из Кореи едут в Россию через Кыргызстан"
        description="Не «серая схема», а логичный маршрут внутри единого экономического союза. Объясняем, как это работает и почему это безопасно."
        crumbs={[{ name: "Почему через Кыргызстан", path: "/pochemu-kyrgyzstan" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Шесть причин"
            title="Кыргызстан — самый удобный хаб между Кореей и Россией"
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
            title="Что делает схему полностью законной"
            description="Три условия, которые мы соблюдаем в каждой сделке. Именно они отличают надёжный импорт от «серого»."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              {
                n: "01",
                t: "Реальная стоимость в декларации",
                d: "Таможенная стоимость соответствует фактической цене покупки. Занижение — риск доначисления платежей уже в России и отказа в регистрации.",
              },
              {
                n: "02",
                t: "Полная уплата платежей ЕАЭС",
                d: "Пошлина, сборы и акцизы уплачиваются по единым ставкам союза. В ЭПТС отражаются все платежи, и ГИБДД видит их при постановке на учёт.",
              },
              {
                n: "03",
                t: "Утильсбор в России",
                d: "После ввоза в РФ уплачивается утилизационный сбор по действующей ставке. Без него автомобиль не поставят на учёт — мы делаем это до передачи ключей.",
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
            description="Оба маршрута легальны. Мы выбираем Кыргызстан, потому что он даёт клиенту больше предсказуемости."
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
                  ["Таможенное оформление", "По единым ставкам ЕАЭС, отлаженный поток корейских авто", "По тем же ставкам, но с сезонными очередями в порту"],
                  ["Срок доставки", "20–35 дней до Бишкека, далее 5–10 дней до города", "10–20 дней до Владивостока, далее 7–14 дней по РФ"],
                  ["Прозрачность", "Русскоязычная команда на месте, лично принимает авто", "Зависит от брокера в порту"],
                  ["Доставка в европейскую часть РФ", "Ближе к Уралу и Поволжью, короче плечо автовоза", "Длинный перегон через всю страну"],
                  ["Контроль состояния", "Осмотр после разгрузки, фото-отчёт из Бишкека", "Осмотр в порту, часто без клиента"],
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
        title="Остались вопросы по маршруту?"
        description="Расскажем подробно про оформление, документы и сроки именно для вашего региона. Бесплатно и без обязательств."
      />
    </>
  );
}
