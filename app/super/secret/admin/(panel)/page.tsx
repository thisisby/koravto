import Link from "next/link";
import { Card, LinkButton, PageTitle } from "@/components/admin/ui";
import { adminRoutes } from "@/lib/admin/paths";
import { carsDocExists, loadCars } from "@/lib/data/cars";
import { galleryDocExists, loadAlbums } from "@/lib/data/gallery";
import { leadStats } from "@/lib/data/leads";
import { siteConfig } from "@/lib/site";
import { getStorage, getUploadMode } from "@/lib/storage";

export default async function AdminDashboardPage() {
  const [cars, albums, leads, carsSaved, gallerySaved] = await Promise.all([
    loadCars(),
    loadAlbums(),
    leadStats(),
    carsDocExists(),
    galleryDocExists(),
  ]);
  const photos = albums.reduce((n, a) => n + a.photos.length, 0);
  const storage = getStorage();

  const tiles = [
    { label: "Автомобили", value: cars.length, hint: `${cars.filter((c) => c.hidden).length} скрыто`, href: adminRoutes.cars },
    { label: "Фото в галерее", value: photos, hint: `${albums.length} альбом(а)`, href: adminRoutes.gallery },
    { label: "Новые заявки", value: leads.new, hint: `${leads.total} всего`, href: adminRoutes.leads },
  ];

  return (
    <>
      <PageTitle
        title="Обзор"
        description={`Управление контентом сайта ${siteConfig.name}`}
        action={
          <LinkButton href="/" target="_blank" variant="secondary">
            Открыть сайт ↗
          </LinkButton>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href} className="block rounded-2xl border border-line bg-white p-5 shadow-soft transition hover:shadow-lift">
            <p className="text-[13px] font-semibold text-muted">{t.label}</p>
            <p className="font-display mt-2 text-4xl font-extrabold tracking-tight text-navy-900">{t.value}</p>
            <p className="mt-1 text-xs text-muted">{t.hint}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-bold text-navy-900">Хранилище</h2>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[14px]">
            <dt className="text-muted">Режим</dt>
            <dd className="font-semibold text-navy-900">{storage.mode === "blob" ? "Vercel Blob" : "Локальные файлы (dev)"}</dd>
            <dt className="text-muted">Загрузка фото</dt>
            <dd className="font-semibold text-navy-900">
              {getUploadMode() === "client" ? "напрямую в Blob из браузера" : "через сервер (до 4,5 МБ на файл в Vercel)"}
            </dd>
            <dt className="text-muted">Каталог</dt>
            <dd className="font-semibold text-navy-900">{carsSaved ? "сохранён в хранилище" : "встроенный список (ещё не сохранялся)"}</dd>
            <dt className="text-muted">Галерея</dt>
            <dd className="font-semibold text-navy-900">{gallerySaved ? "сохранена в хранилище" : "встроенные фото из public/ (ещё не переносились)"}</dd>
          </dl>
          {!gallerySaved && (
            <p className="mt-4 text-[13px] leading-relaxed text-muted">
              Чтобы перенести существующие фото в Vercel Blob, выполните <code>npm run migrate:blob</code> (см. README).
              Первое же сохранение в админке тоже зафиксирует текущий список в хранилище.
            </p>
          )}
        </Card>

        <Card>
          <h2 className="font-display text-lg font-bold text-navy-900">Быстрые действия</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <LinkButton href={adminRoutes.newCar}>+ Добавить автомобиль</LinkButton>
            <LinkButton href={adminRoutes.gallery} variant="secondary">
              Загрузить фото
            </LinkButton>
            <LinkButton href={adminRoutes.videos} variant="secondary">
              Ссылки на видео
            </LinkButton>
            <LinkButton href={adminRoutes.leads} variant="secondary">
              Заявки (CRM)
            </LinkButton>
          </div>
        </Card>
      </div>
    </>
  );
}
