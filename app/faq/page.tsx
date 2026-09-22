import type { Metadata } from "next";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { faq } from "@/lib/content/faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";

export const metadata: Metadata = buildMetadata({
  title: "Вопросы и ответы о покупке авто из Кореи через Кыргызстан",
  description:
    "Ответы на частые вопросы: законность ввоза через Кыргызстан, сроки, стоимость, проверка автомобиля, документы, постановка на учёт в России, гарантии и контроль сделки.",
  path: "/faq",
  keywords: ["авто из Кореи вопросы", "законно ли авто из Кыргызстана", "постановка на учёт авто из Кореи"],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <PageHero
        eyebrow="FAQ"
        title="Вопросы и ответы"
        description="Что спрашивают перед первым заказом. Не нашли ответ — напишите, ответим лично."
        crumbs={[{ name: "FAQ", path: "/faq" }]}
      />
      <section className="py-20 sm:py-24">
        <div className="container-x max-w-4xl">
          <Faq items={faq} />
        </div>
      </section>
      <CtaSection title="Не нашли ответ?" description="Задайте вопрос менеджеру — ответим в рабочее время." />
    </>
  );
}
