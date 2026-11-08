import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionButton } from "@/components/admin/ActionButton";
import { AlbumForm } from "@/components/admin/AlbumForm";
import { AlbumPhotosForm } from "@/components/admin/AlbumPhotosForm";
import { PhotoUploader } from "@/components/admin/PhotoUploader";
import { Card, LinkButton, PageTitle } from "@/components/admin/ui";
import { deleteAlbumAction } from "@/lib/admin/actions/gallery";
import { adminRoutes } from "@/lib/admin/paths";
import { loadAlbums } from "@/lib/data/gallery";
import { getUploadMode } from "@/lib/storage";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = (await loadAlbums()).find((a) => a.slug === decodeURIComponent(slug));
  return { title: album ? album.title : "Альбом" };
}

export default async function AdminAlbumPage({ params }: Props) {
  const { slug } = await params;
  const album = (await loadAlbums()).find((a) => a.slug === decodeURIComponent(slug));
  if (!album) notFound();

  return (
    <>
      <PageTitle
        title={album.title}
        description={album.meta || "Альбом галереи"}
        action={
          <>
            <LinkButton href={adminRoutes.gallery} variant="secondary">
              ← Все альбомы
            </LinkButton>
            <ActionButton
              action={deleteAlbumAction.bind(null, album.slug)}
              confirm={`Удалить альбом «${album.title}» и все ${album.photos.length} фото?`}
              variant="danger"
            >
              Удалить альбом
            </ActionButton>
          </>
        }
      />

      <Card>
        <h2 className="font-display text-lg font-bold text-navy-900">Об альбоме</h2>
        <div className="mt-4">
          <AlbumForm album={album} />
        </div>
      </Card>

      <div className="mt-6">
        <h2 className="font-display mb-3 text-lg font-bold text-navy-900">Загрузить фото</h2>
        <PhotoUploader albumSlug={album.slug} mode={getUploadMode()} />
      </div>

      <div className="mt-6">
        <h2 className="font-display mb-3 text-lg font-bold text-navy-900">Фотографии</h2>
        <AlbumPhotosForm album={album} />
      </div>
    </>
  );
}
