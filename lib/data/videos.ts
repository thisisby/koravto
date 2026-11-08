import { unstable_cache } from "next/cache";
import { steps, type Step } from "@/lib/content/steps";
import { readDoc, writeDoc } from "@/lib/storage/docs";

export const VIDEOS_TAG = "videos";
const DOC = "videos";

/**
 * YouTube links shown under the process steps, keyed by step index ("0".."5").
 * Steps themselves (titles, durations, bullet points) stay in `lib/content/steps.ts`;
 * only the video links are editable from the admin panel.
 */
type VideosDoc = { version: 1; updatedAt: string; steps: Record<string, string[]> };

function seedVideos(): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  steps.forEach((s, i) => {
    out[String(i)] = s.videos ?? [];
  });
  return out;
}

/** Uncached read (admin panel). */
export async function loadStepVideos(): Promise<Record<string, string[]>> {
  const doc = await readDoc<VideosDoc>(DOC);
  return doc?.steps ?? seedVideos();
}

/** Steps with the stored video links merged in. Cached; invalidated by `updateTag(VIDEOS_TAG)`. */
export const getSteps = unstable_cache(
  async (): Promise<Step[]> => {
    const videos = await loadStepVideos();
    return steps.map((s, i) => ({ ...s, videos: videos[String(i)] ?? s.videos ?? [] }));
  },
  ["steps-with-videos"],
  { tags: [VIDEOS_TAG], revalidate: 3600 },
);

export async function saveStepVideos(byStep: Record<string, string[]>) {
  const doc: VideosDoc = { version: 1, updatedAt: new Date().toISOString(), steps: byStep };
  await writeDoc(DOC, doc);
}
