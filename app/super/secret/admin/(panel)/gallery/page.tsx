import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ActionButton } from "@/components/admin/ActionButton";
import { AlbumForm } from "@/components/admin/AlbumForm";
import { Card, EmptyState, LinkButton, PageTitle } from "@/components/admin/ui";
import { moveAlbumAction } from "@/lib/admin/actions/gallery";
import { adminRoutes } from "@/lib/admin/paths";
import { loadAlbums } from "@/lib/data/gallery";

export const metadata: Metadata = { title: "Галерея" };

export default async function AdminGalleryPage() {
  const albums = await loadAlbums();

  return (
    <>
      <PageTitle title="Галерея" description="Альбомы — по одному на каждый реальный автомобиль. Фото показываются на странице «Галерея»." />

      {albums.length === 0 ? (
        <EmptyState title="Альбомов пока нет">Создайте первый альбом ниже и загрузите в него фото.</EmptyState>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((a, i) => {
            const cover = a.photos.find((p) => p.kind === "car") ?? a.photos[0];
            return (
              <li key={a.slug} className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
                <Link href={adminRoutes.album(a.slug)} className="block">
                  <div className="relative aspect-[4/3] bg-surface">
                    {cover ? (
                      <Image src={cover.src} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" unoptimized={cover.src.startsWith("/uploads/")} />
                    ) : (
                      <div className="flex size-full items-center justify-center text-sm text-muted">Нет фото</div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-navy-900">{a.title}</p>
                    <p className="mt-0.5 truncate text-[13px] text-muted">{a.meta || "—"}</p>
                    <p className="mt-2 text-xs text-muted">
                      {a.photos.length} фото · {a.photos.filter((p) => p.kind === "car").length} авто / {a.photos.filter((p) => p.kind === "process").length} осмотр
                    </p>
                  </div>
                </Link>
                <div className="flex items-center gap-1.5 border-t border-line p-3">
                  <ActionButton action={moveAlbumAction.bind(null, a.slug, "up")} disabled={i === 0} className="px-2.5" title="Выше">
                    ↑
                  </ActionButton>
                  <ActionButton action={moveAlbumAction.bind(null, a.slug, "down")} disabled={i === albums.length - 1} className="px-2.5" title="Ниже">
                    ↓
                  </ActionButton>
                  <LinkButton href={adminRoutes.album(a.slug)} variant="secondary" className="ml-auto">
                    Открыть
                  </LinkButton>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Card className="mt-8">
        <h2 className="font-display text-lg font-bold text-navy-900">Новый альбом</h2>
        <div className="mt-4">
          <AlbumForm />
        </div>
      </Card>
    </>
  );
}
