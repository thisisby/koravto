export type StepVideo = {
  /** YouTube video id (the `v=` query param) */
  id: string;
  title: string;
  /** Optional start offset in seconds */
  start?: number;
  /** Vertical video (YouTube Shorts) — rendered in a 9:16 player */
  portrait?: boolean;
};

export type Step = {
  title: string;
  short: string;
  details: string[];
  duration: string;
  /**
   * Optional YouTube videos shown on the detailed process page.
   * Plain YouTube URLs (watch / youtu.be / shorts, `t=` is respected) or video ids are accepted.
   */
  videos?: string[];
  /** Heading above the video block (defaults to "Видео с наших сделок") */
  videosHeading?: string;
  /** Show a link to the photo gallery next to the video heading */
  galleryLink?: boolean;
};

/** Turns a YouTube URL or bare id into a `StepVideo`. */
export function parseVideo(input: string, index: number, titlePrefix = "Видео"): StepVideo {
  let id = input.trim();
  let start: number | undefined;
  let portrait = false;
  if (/^https?:\/\//.test(id)) {
    const url = new URL(id);
    const t = url.searchParams.get("t");
    if (t) start = Number.parseInt(t, 10) || undefined;
    portrait = url.pathname.startsWith("/shorts/");
    id =
      url.searchParams.get("v") ??
      url.pathname.split("/").filter(Boolean).pop() ??
      id;
  }
  return { id, start, portrait, title: `${titlePrefix} — видео ${index + 1}` };
}

export const steps: Step[] = [
  {
    title: "Запрос и подбор",
    short: "Вы описываете автомобиль и бюджет. Мы подбираем варианты на корейском рынке и проверяем историю каждого.",
    details: [
      "Марка, модель, год, двигатель, цвет, пакеты опций, бюджет под ключ.",
      "Поиск у официальных дилеров, на Encar и закрытых аукционах.",
      "Отчёт Carhistory и сервисная история по каждому варианту.",
      "Подборка с фото, отчётами и расчётом стоимости.",
    ],
    duration: "1–3 дня",
  },
  {
    title: "Договор",
    short: "Договор с фиксированной комиссией и поэтапной оплатой. Предоплата покрывает выкуп автомобиля.",
    details: [
      "Договор с юридическим лицом: этапы, сроки, ответственность.",
      "Комиссия фиксирована и не зависит от цены автомобиля.",
      "Оплата по этапам: выкуп → логистика → передача.",
    ],
    duration: "1 день",
  },
  {
    title: "Осмотр и выкуп",
    short: "Специалист в Корее осматривает автомобиль лично, снимает видеоотчёт и выкупает его от вашего имени.",
    details: [
      "Кузов толщиномером, салон, диагностика, тест-драйв.",
      "Видеоотчёт — решение принимаете вы.",
      "Выкуп, снятие с учёта, экспортные документы.",
    ],
    duration: "2–5 дней",
    // prettier-ignore
    videos: ["https://www.youtube.com/watch?v=IXfVp2b-_m4", "https://www.youtube.com/watch?v=LPqKtTDmqfk&t=126s", "https://www.youtube.com/watch?v=a7M8z0Of-bc", "https://www.youtube.com/watch?v=kVBvqIKilV0", "https://www.youtube.com/watch?v=sxD80uiTZps"],
    videosHeading: "Как проходит осмотр — видео с наших сделок",
    galleryLink: true,
  },
  {
    title: "Доставка в Бишкек",
    short: "Из порта Инчхон или Пусан — в Кыргызстан. Груз застрахован на всём пути.",
    details: [
      "Контейнер до порта КНР, далее автовоз или ж/д до Бишкека.",
      "Страхование на полную стоимость автомобиля.",
      "Обновления статуса в вашем чате.",
    ],
    duration: "20–35 дней",
    // prettier-ignore
    videos: ["https://www.youtube.com/shorts/s8Qw713gWjs", "https://www.youtube.com/shorts/fg0PojaZ05Q"],
    videosHeading: "Погрузка и путь в Бишкек — видео с маршрута",
  },
  {
    title: "Оформление в ЕАЭС",
    short: "Таможенное оформление по единым ставкам союза, получение ЭПТС.",
    details: [
      "Таможенная декларация, уплата платежей ЕАЭС.",
      "Оформление ЭПТС, действующего во всех странах союза.",
      "Проверка комплекта документов для ГИБДД.",
    ],
    duration: "3–7 дней",
  },
  {
    title: "Передача в России",
    short: "Закрытый автовоз до вашего города, утилизационный сбор, передача автомобиля и документов.",
    details: [
      "Закрытый автовоз или перегон — на ваш выбор.",
      "Уплата утилизационного сбора.",
      "Передача с полным пакетом документов и актом.",
    ],
    duration: "5–10 дней",
  },
];
