# Elite Cars — авто из Кореи в Россию через Кыргызстан

Информационно-продающий сайт для российской аудитории: подбор, выкуп и доставка автомобилей из Южной Кореи в Россию через Кыргызстан (ЕАЭС).

Стек: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**. Все страницы статически пререндерятся, никаких внешних сервисов или БД не требуется.

## Запуск

```bash
npm install
cp .env.example .env.local   # заполните переменные
npm run dev                  # http://localhost:3000
```

Продакшен: `npm run build && npm start`. Проект деплоится на Vercel, Netlify, любой Node-хостинг или в Docker без дополнительной настройки.

## Что нужно заменить перед публикацией

Все бренд-данные собраны в одном файле — `lib/site.ts`:

| Поле | Что указать |
| --- | --- |
| `name`, `legalName`, `tagline` | Название компании |
| `url` | Домен сайта (или переменная `NEXT_PUBLIC_SITE_URL`) |
| `contacts.*` | Телефон, WhatsApp, Telegram, email, адрес, часы работы |
| `social.*` | Ссылки на канал/соцсети |
| `stats` | Цифры для главной страницы (кол-во авто, сроки, экономия) |

Логотип — `components/Logo.tsx` и `app/icon.svg`.

## Контент

| Файл | Содержимое |
| --- | --- |
| `lib/content/steps.ts` | 6 этапов работы (используются на главной, странице «Как это работает» и в HowTo-разметке) |
| `lib/content/faq.ts` | Вопросы-ответы (главная, `/faq`, FAQPage-разметка) |
| `lib/content/cars.ts` | Каталог моделей: цены, двигатели, описания. Каждая модель — отдельная SEO-страница `/avtomobili/[slug]` |
| `lib/content/articles.ts` | Статьи блога `/blog/[slug]` |

## Заявки

Форма (`components/LeadForm.tsx`) отправляет данные в `POST /api/lead`. Если заданы `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`, заявка приходит сообщением в Telegram; иначе — пишется в лог сервера. Есть honeypot-поле и простой rate-limit.

Кнопки WhatsApp/Telegram открывают чат с предзаполненным текстом.

## SEO

- `metadata` на каждой странице: title, description, canonical, Open Graph, Twitter, keywords.
- Динамические OG-изображения (`opengraph-image.tsx`) для главной, моделей и статей — с кириллическими шрифтами из `assets/`.
- Структурированные данные JSON-LD: `Organization`, `WebSite`, `Service`, `HowTo`, `FAQPage`, `BreadcrumbList`, `Product` (модели), `Article` (блог).
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`.
- Семантическая разметка, `lang="ru"`, `<h1>` на каждой странице, хлебные крошки.
- Яндекс.Метрика и верификация Яндекс/Google Webmaster — через переменные окружения.

## Структура

```
app/                    страницы (App Router)
  page.tsx              главная
  kak-eto-rabotaet/     процесс
  pochemu-kyrgyzstan/   маршрут и легальность
  avtomobili/[slug]/    каталог и страницы моделей
  blog/[slug]/          блог
  faq/  kontakty/
  api/lead/             приём заявок
components/             UI-компоненты
lib/site.ts             конфигурация бренда и контактов
lib/content/            весь текстовый контент
lib/seo.ts              метаданные и JSON-LD
assets/                 шрифты для OG-изображений
```
