/**
 * Central site configuration.
 * Everything brand-specific (name, contacts, domain) lives here so it can be
 * changed in one place without touching page content.
 */

export const siteConfig = {
  name: "Elite Cars",
  legalName: "Elite Cars — Export Cars from Korea",
  tagline: "Премиальные автомобили из Кореи с доставкой в Россию",
  /** Short English tagline printed under the wordmark (from the official logo) */
  logoTagline: "Export cars from Korea",
  description:
    "Mercedes-Benz, BMW, Porsche, Land Rover и Genesis с корейского рынка — от 60 000 $. Подбор, проверка, доставка через Кыргызстан и оформление в ЕАЭС под ключ.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://elitecars-korea.ru",
  locale: "ru_RU",
  language: "ru",
  // Regions used in metadata / structured data
  areaServed: ["Россия", "Кыргызстан"],
  hubCity: "Бишкек",
  foundingYear: 2021,

  contacts: {
    // Displayed number (formatted) and raw for tel: links
    phoneDisplay: "+996 220 000 244",
    phoneRaw: "+996220000244",
    // Secondary office number (Korea)
    phoneKoreaDisplay: "+82 10-4463-0686",
    phoneKoreaRaw: "+821044630686",
    whatsapp: "996220000244",
    telegram: "eliteecars",
    email: "elitecars.co.ltd@gmail.com",
    address: "г. Бишкек, Кыргызстан",
    workingHours: "Ежедневно, 09:00–21:00 (МСК)",
  },

  social: {
    telegramChannel: "https://t.me/elitecarsko",
    instagram: "https://www.instagram.com/elitecars.co.ltd/",
    youtube: "",
    vk: "",
  },

  // Key numbers shown on the landing page. Update as the business grows.
  stats: [
    { value: "от 60 000 $", label: "стоимость автомобилей" },
    { value: "45–60", label: "дней до передачи" },
    { value: "15–25%", label: "ниже цен в России" },
    { value: "100%", label: "легальное оформление" },
  ],

  // Verification tokens for webmaster tools (optional)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? "",
  },

  analytics: {
    yandexMetrikaId: process.env.NEXT_PUBLIC_YM_ID ?? "",
  },
} as const;

export const links = {
  whatsapp: (text?: string) =>
    `https://wa.me/${siteConfig.contacts.whatsapp}${
      text ? `?text=${encodeURIComponent(text)}` : ""
    }`,
  telegram: () => `https://t.me/${siteConfig.contacts.telegram}`,
  phone: () => `tel:${siteConfig.contacts.phoneRaw}`,
  phoneKorea: () => `tel:${siteConfig.contacts.phoneKoreaRaw}`,
  email: () => `mailto:${siteConfig.contacts.email}`,
};

export const nav = [
  { href: "/kak-eto-rabotaet", label: "Как это работает", short: "Процесс" },
  { href: "/pochemu-kyrgyzstan", label: "Почему через Кыргызстан", short: "Маршрут" },
  { href: "/avtomobili", label: "Автомобили", short: "Автомобили" },
  { href: "/blog", label: "Блог", short: "Блог" },
  { href: "/faq", label: "FAQ", short: "FAQ" },
  { href: "/kontakty", label: "Контакты", short: "Контакты" },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
