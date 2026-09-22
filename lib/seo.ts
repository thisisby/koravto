import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

/** Build a complete Metadata object with canonical, OG and Twitter tags. */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex,
}: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ---------- JSON-LD builders ---------- */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.png"),
    description: siteConfig.description,
    foundingDate: String(siteConfig.foundingYear),
    email: siteConfig.contacts.email,
    telephone: siteConfig.contacts.phoneRaw,
    areaServed: siteConfig.areaServed.map((name) => ({ "@type": "Country", name })),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.hubCity,
      addressCountry: "KG",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contacts.phoneRaw,
        contactType: "sales",
        areaServed: "KG",
        availableLanguage: ["Russian"],
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contacts.phoneKoreaRaw,
        contactType: "sales",
        areaServed: "KR",
        availableLanguage: ["Russian"],
      },
    ],
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "ru-RU",
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Подбор и доставка премиальных автомобилей из Южной Кореи в Россию",
    serviceType: "Импорт автомобилей",
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: { "@type": "Country", name: "Россия" },
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "2500",
      description: "Фиксированная комиссия за подбор, выкуп, доставку и оформление",
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

export function howToJsonLd(steps: { title: string; short: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Как купить премиальный автомобиль из Кореи с доставкой в Россию",
    description:
      "Шесть этапов: подбор, договор, выкуп в Корее, доставка в Бишкек, оформление в ЕАЭС, передача в России.",
    totalTime: "P60D",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.short,
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(a: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    inLanguage: "ru-RU",
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    mainEntityOfPage: absoluteUrl(a.path),
    author: { "@id": absoluteUrl("/#organization") },
    publisher: { "@id": absoluteUrl("/#organization") },
    image: absoluteUrl("/opengraph-image"),
  };
}

export function productJsonLd(c: {
  brand: string;
  model: string;
  description: string;
  path: string;
  low: number;
  high: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${c.brand} ${c.model} из Кореи`,
    brand: { "@type": "Brand", name: c.brand },
    description: c.description,
    url: absoluteUrl(c.path),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: c.low,
      highPrice: c.high,
      offerCount: 1,
      availability: "https://schema.org/PreOrder",
      seller: { "@id": absoluteUrl("/#organization") },
    },
  };
}
