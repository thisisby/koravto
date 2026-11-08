import type { Metadata } from "next";
import { VideosForm } from "@/components/admin/VideosForm";
import { PageTitle } from "@/components/admin/ui";
import { steps } from "@/lib/content/steps";
import { loadStepVideos } from "@/lib/data/videos";

export const metadata: Metadata = { title: "Видео" };

export default async function AdminVideosPage() {
  const videos = await loadStepVideos();
  const info = steps.map((s, index) => ({ index, title: s.title, heading: s.videosHeading, duration: s.duration }));

  return (
    <>
      <PageTitle
        title="Видео"
        description="Ролики YouTube под этапами на странице «Как это работает». Видео остаются на YouTube — здесь только ссылки."
      />
      <VideosForm steps={info} videos={videos} />
    </>
  );
}
