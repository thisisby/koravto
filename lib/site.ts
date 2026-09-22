/**
 * Central site configuration.
 * Everything brand-specific (name, contacts, domain) lives here so it can be
 * changed in one place without touching page content.
 */

export const siteConfig = {
  name: "KorAvto",
  legalName: "KorAvto — авто из Кореи в Россию через Кыргызстан",
  tagline: "Автомобили из Кореи в Россию через Кыргызстан",
  description:
    "Подбор, выкуп и доставка автомобилей из Южной Кореи в Россию через Кыргызстан. Прозрачная стоимость, официальное оформление в ЕАЭС, сопровождение на каждом этапе — от аукциона в Сеуле до передачи ключей в вашем городе.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://koravto.ru",
  locale: "ru_RU",
  language: "ru",
  // Regions used in metadata / structured data
  areaServed: ["Россия", "Кыргызстан"],
  hubCity: "Бишкек",
  foundingYear: 2021,

  contacts: {
    // Displayed number (formatted) and raw for tel: links
    phoneDisplay: "+7 (900) 000-00-00",
    phoneRaw: "+79000000000",
    whatsapp: "79000000000",
    telegram: "koravto",
    email: "hello@koravto.ru",
    address: "г. Бишкек, Кыргызстан",
    workingHours: "Ежедневно, 09:00–21:00 (МСК)",
  },

  social: {
    telegramChannel: "https://t.me/koravto",
    youtube: "",
    vk: "",
  },

  // Key numbers shown on the landing page. Update as the business grows.
  stats: [
    { value: "300+", label: "автомобилей доставлено" },
    { value: "45–60", label: "дней от заказа до передачи" },
    { value: "15–30%", label: "экономия относительно цен в РФ" },
    { value: "100%", label: "легальное оформление в ЕАЭС" },
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
  email: () => `mailto:${siteConfig.contacts.email}`,
};

export const nav = [
  { href: "/kak-eto-rabotaet", label: "Как это работает", short: "Процесс" },
  { href: "/stoimost", label: "Стоимость", short: "Стоимость" },
  { href: "/pochemu-kyrgyzstan", label: "Почему через Кыргызстан", short: "Маршрут" },
  { href: "/avtomobili", label: "Автомобили", short: "Автомобили" },
  { href: "/blog", label: "Блог", short: "Блог" },
  { href: "/faq", label: "FAQ", short: "FAQ" },
  { href: "/kontakty", label: "Контакты", short: "Контакты" },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
