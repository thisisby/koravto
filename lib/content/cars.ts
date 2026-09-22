export type Car = {
  slug: string;
  brand: string;
  model: string;
  segment: string;
  years: string;
  /** Approximate purchase price range in Korea, USD */
  priceKorea: [number, number];
  /** Approximate turnkey price in Russia, USD */
  priceTurnkey: [number, number];
  engines: string[];
  drive: string;
  highlights: string[];
  description: string;
  whyPopular: string[];
  /** Tailwind gradient classes for the card artwork */
  accent: string;
};

export const cars: Car[] = [
  {
    slug: "mercedes-benz-e-class",
    brand: "Mercedes-Benz",
    model: "E-Class",
    segment: "Бизнес-седан",
    years: "2021–2024",
    priceKorea: [45000, 65000],
    priceTurnkey: [62000, 85000],
    engines: ["E 250 (2.0, 204 л.с.)", "E 300 (2.0, 258 л.с.)", "E 350 4MATIC", "E 450 4MATIC (3.0)"],
    drive: "Задний / 4MATIC",
    highlights: ["AMG Line", "Burmester", "MBUX", "Пневмоподвеска*"],
    description:
      "Самый продаваемый Mercedes-Benz в Корее. На рынке много автомобилей 2–4 лет с дилерской историей и пробегом до 40 000 км — в комплектациях AMG Line и Exclusive.",
    whyPopular: [
      "Широкий выбор свежих автомобилей с малым пробегом",
      "Двухлитровые версии — минимальная пошлина в категории 3–5 лет",
      "Полный сервисный архив у официального дилера",
    ],
    accent: "from-zinc-600/80 to-neutral-800/80",
  },
  {
    slug: "mercedes-benz-s-class",
    brand: "Mercedes-Benz",
    model: "S-Class",
    segment: "Представительский седан",
    years: "2021–2024",
    priceKorea: [90000, 140000],
    priceTurnkey: [115000, 175000],
    engines: ["S 400d 4MATIC (3.0 дизель)", "S 450 4MATIC (3.0)", "S 500 4MATIC (3.0)", "S 580 4MATIC (4.0)"],
    drive: "4MATIC",
    highlights: ["W223", "Задняя ось с подруливанием", "Executive-пакет", "Burmester 4D"],
    description:
      "Флагман Mercedes-Benz в поколении W223. Корея — один из крупнейших рынков S-Class в мире, поэтому выбор автомобилей в длиннобазной версии с Executive-пакетом здесь шире, чем в Европе.",
    whyPopular: [
      "Длиннобазные версии с топовыми пакетами — стандарт для корейского рынка",
      "Разница с ценой в России особенно заметна на автомобилях 3–5 лет",
      "Прозрачная история и обслуживание у официального дилера",
    ],
    accent: "from-slate-700/80 to-slate-900/80",
  },
  {
    slug: "mercedes-benz-gle",
    brand: "Mercedes-Benz",
    model: "GLE",
    segment: "Премиальный кроссовер",
    years: "2021–2024",
    priceKorea: [60000, 85000],
    priceTurnkey: [80000, 110000],
    engines: ["GLE 300d (2.0 дизель)", "GLE 400d 4MATIC (3.0 дизель)", "GLE 450 4MATIC (3.0)", "GLE 53 AMG"],
    drive: "4MATIC",
    highlights: ["7 мест*", "AIRMATIC", "AMG Line", "Дизель 400d"],
    description:
      "Семейный кроссовер премиум-класса с возможностью третьего ряда. Дизельные версии 400d — редкость в России, но одни из самых частых в Корее.",
    whyPopular: [
      "Дизель 3.0 с запасом хода более 1 000 км",
      "Пневмоподвеска и полный пакет ассистентов в базовых комплектациях",
      "Хорошая ликвидность на вторичном рынке РФ",
    ],
    accent: "from-stone-600/80 to-stone-800/80",
  },
  {
    slug: "mercedes-benz-g-class",
    brand: "Mercedes-Benz",
    model: "G-Class",
    segment: "Внедорожник",
    years: "2020–2024",
    priceKorea: [130000, 190000],
    priceTurnkey: [165000, 240000],
    engines: ["G 400d (3.0 дизель)", "G 500 (4.0)", "G 63 AMG (4.0)"],
    drive: "Полный с тремя блокировками",
    highlights: ["W463", "AMG G 63", "Manufaktur", "Дизель G 400d"],
    description:
      "Корейские G-Class отличаются высокой долей комплектаций Manufaktur и AMG. Автомобили редко используются вне города, поэтому состояние кузова и рамы обычно безупречно.",
    whyPopular: [
      "Большая доля G 63 AMG и индивидуальных версий Manufaktur",
      "Городская эксплуатация — без следов бездорожья",
      "Стабильно высокий спрос в России",
    ],
    accent: "from-neutral-700/80 to-black/80",
  },
  {
    slug: "bmw-5-series",
    brand: "BMW",
    model: "5 Series",
    segment: "Бизнес-седан",
    years: "2021–2024",
    priceKorea: [40000, 65000],
    priceTurnkey: [60000, 85000],
    engines: ["520i (2.0)", "530i xDrive (2.0)", "523d (2.0 дизель)", "540i xDrive (3.0)"],
    drive: "Задний / xDrive",
    highlights: ["M Sport", "Laserlight", "Harman Kardon", "G30 / G60"],
    description:
      "Корея — крупнейший рынок BMW 5 Series за пределами Германии и Китая. Автомобили в комплектации M Sport с полным приводом — норма, а не редкость.",
    whyPopular: [
      "Огромный выбор: тысячи автомобилей 2–4 лет",
      "Комплектация M Sport Package в большинстве версий",
      "Двухлитровые моторы — выгодная категория по пошлине",
    ],
    accent: "from-sky-800/80 to-slate-900/80",
  },
  {
    slug: "bmw-x5",
    brand: "BMW",
    model: "X5",
    segment: "Премиальный кроссовер",
    years: "2021–2024",
    priceKorea: [60000, 85000],
    priceTurnkey: [80000, 110000],
    engines: ["xDrive30d (3.0 дизель)", "xDrive40i (3.0)", "M50i / M60i (4.4)"],
    drive: "xDrive",
    highlights: ["G05", "Пневмоподвеска", "M Sport", "Панорама Sky Lounge"],
    description:
      "Классика сегмента в поколении G05. В Корее популярны дизельные xDrive30d и бензиновые xDrive40i в пакете M Sport с адаптивной пневмоподвеской.",
    whyPopular: [
      "Проверенные моторы B57 и B58",
      "Богатые комплектации с пневмоподвеской и Laserlight",
      "Стабильный спрос и высокая ликвидность в РФ",
    ],
    accent: "from-blue-900/80 to-slate-900/80",
  },
  {
    slug: "bmw-7-series",
    brand: "BMW",
    model: "7 Series",
    segment: "Представительский седан",
    years: "2023–2024",
    priceKorea: [110000, 150000],
    priceTurnkey: [140000, 190000],
    engines: ["740i (3.0)", "740d xDrive (3.0 дизель)", "760i xDrive (4.4)", "i7 (электро)"],
    drive: "Задний / xDrive",
    highlights: ["G70", "Theatre Screen", "Executive Lounge", "Bowers & Wilkins"],
    description:
      "Новое поколение G70 с 31-дюймовым экраном для задних пассажиров. В Корее продаётся в топовых версиях Executive Lounge, и предложение свежих автомобилей уже достаточно велико.",
    whyPopular: [
      "Технологический флагман в комплектациях Executive Lounge",
      "Электрический i7 — 15% пошлины вместо расчёта по объёму",
      "Свежие автомобили 1–2 лет с минимальным пробегом",
    ],
    accent: "from-indigo-900/80 to-slate-950/80",
  },
  {
    slug: "porsche-cayenne",
    brand: "Porsche",
    model: "Cayenne",
    segment: "Спортивный кроссовер",
    years: "2021–2024",
    priceKorea: [75000, 120000],
    priceTurnkey: [100000, 150000],
    engines: ["Cayenne (3.0)", "Cayenne E-Hybrid (3.0)", "Cayenne S (2.9 / 4.0)", "Cayenne Coupé"],
    drive: "Полный",
    highlights: ["Coupé", "E-Hybrid", "Sport Chrono", "Bose / Burmester"],
    description:
      "Porsche Cayenne в Корее часто заказывают с длинным списком индивидуальных опций — это заметно по конфигурациям на вторичном рынке. Гибридные версии особенно распространены.",
    whyPopular: [
      "Богатые индивидуальные конфигурации",
      "E-Hybrid — комфорт, экономичность и ставка по объёму 3.0",
      "Полная сервисная история у Porsche Centre",
    ],
    accent: "from-red-900/80 to-neutral-900/80",
  },
  {
    slug: "porsche-panamera",
    brand: "Porsche",
    model: "Panamera",
    segment: "Спортивный седан",
    years: "2021–2024",
    priceKorea: [80000, 130000],
    priceTurnkey: [105000, 165000],
    engines: ["Panamera 4 (2.9)", "Panamera 4 E-Hybrid", "Panamera GTS (4.0)", "Sport Turismo"],
    drive: "Полный",
    highlights: ["Sport Turismo", "E-Hybrid", "PASM", "Executive"],
    description:
      "Пятидверный Gran Turismo Porsche. На корейском рынке представлены версии Executive с удлинённой базой и Sport Turismo, которые в России встречаются редко.",
    whyPopular: [
      "Редкие версии Executive и Sport Turismo",
      "Небольшие пробеги — второй автомобиль в семье",
      "Индивидуальные цвета и отделки салона",
    ],
    accent: "from-rose-900/80 to-neutral-900/80",
  },
  {
    slug: "range-rover-sport",
    brand: "Land Rover",
    model: "Range Rover Sport",
    segment: "Премиальный внедорожник",
    years: "2022–2024",
    priceKorea: [85000, 120000],
    priceTurnkey: [110000, 150000],
    engines: ["D300 (3.0 дизель)", "P400 (3.0)", "P530 (4.4 V8)"],
    drive: "Полный",
    highlights: ["L461", "Dynamic SE / HSE", "Meridian", "Пневмоподвеска"],
    description:
      "Третье поколение Range Rover Sport с фирменным минималистичным дизайном. В Корее автомобиль продаётся в комплектациях Dynamic HSE и Autobiography, преимущественно с дизелем D300.",
    whyPopular: [
      "Экономичный и тяговитый дизель D300",
      "Комплектации Autobiography с полным пакетом опций",
      "Городская эксплуатация без бездорожья",
    ],
    accent: "from-emerald-900/80 to-neutral-900/80",
  },
  {
    slug: "audi-q8",
    brand: "Audi",
    model: "Q8",
    segment: "Премиальный кроссовер",
    years: "2021–2024",
    priceKorea: [55000, 80000],
    priceTurnkey: [75000, 105000],
    engines: ["45 TDI quattro (3.0 дизель)", "55 TFSI quattro (3.0)", "SQ8 (4.0)"],
    drive: "quattro",
    highlights: ["S line", "Матричные фары", "Bang & Olufsen", "Пневмоподвеска"],
    description:
      "Флагманский кроссовер-купе Audi. Корейские версии, как правило, в пакете S line с матричной оптикой и адаптивной пневмоподвеской.",
    whyPopular: [
      "Комплектации Premium с полным набором опций",
      "Дизель 45 TDI — экономичный и ресурсный мотор",
      "Одна из лучших цен в сегменте больших кроссоверов-купе",
    ],
    accent: "from-gray-700/80 to-gray-900/80",
  },
  {
    slug: "genesis-g90",
    brand: "Genesis",
    model: "G90",
    segment: "Представительский седан",
    years: "2022–2024",
    priceKorea: [65000, 90000],
    priceTurnkey: [85000, 115000],
    engines: ["3.5 T-GDI (380 л.с.)", "3.5 T-GDI 48V E-Supercharger (415 л.с.)"],
    drive: "Полный",
    highlights: ["Long Wheelbase", "Bang & Olufsen", "Кресла с массажем", "Задняя ось с подруливанием"],
    description:
      "Флагман Genesis нового поколения — прямой конкурент S-Class и 7 Series по комфорту и оснащению при заметно более низкой цене. В Россию официально не поставлялся.",
    whyPopular: [
      "Уровень S-Class по цене E-Class",
      "Удлинённая версия с индивидуальными задними креслами",
      "Родной рынок бренда — большой выбор и лучшие цены",
    ],
    accent: "from-amber-900/80 to-neutral-900/80",
  },
];

export function getCar(slug: string) {
  return cars.find((c) => c.slug === slug);
}

export const formatUsd = (n: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const formatRange = ([a, b]: [number, number]) =>
  `${formatUsd(a)} – ${formatUsd(b)}`;
