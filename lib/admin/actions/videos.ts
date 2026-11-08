"use server";

import { requireAdmin } from "@/lib/admin/auth";
import { revalidateContent } from "@/lib/admin/revalidate";
import { steps } from "@/lib/content/steps";
import { VIDEOS_TAG, saveStepVideos } from "@/lib/data/videos";
import { errorMessage, lines, type ActionState } from "./types";

const YT_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be", "www.youtu.be", "youtube-nocookie.com", "www.youtube-nocookie.com"]);

/** Accepts full YouTube URLs (watch / youtu.be / shorts / embed) or bare 11-char ids. */
function normalizeYouTube(input: string): string | null {
  const value = input.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return `https://www.youtube.com/watch?v=${value}`;
  let url: URL;
  try {
    url = new URL(value.startsWith("http") ? value : `https://${value}`);
  } catch {
    return null;
  }
  if (!YT_HOSTS.has(url.hostname)) return null;
  const t = url.searchParams.get("t") ?? url.searchParams.get("start");
  const seconds = t ? Number.parseInt(t, 10) || 0 : 0;
  const parts = url.pathname.split("/").filter(Boolean);
  let id: string | null = null;
  if (url.hostname.endsWith("youtu.be")) id = parts[0] ?? null;
  else if (parts[0] === "shorts" || parts[0] === "embed" || parts[0] === "live") id = parts[1] ?? null;
  else id = url.searchParams.get("v");
  if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) return null;
  if (parts[0] === "shorts") return `https://www.youtube.com/shorts/${id}`;
  return `https://www.youtube.com/watch?v=${id}${seconds ? `&t=${seconds}s` : ""}`;
}

export async function saveVideosAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const byStep: Record<string, string[]> = {};
  for (let i = 0; i < steps.length; i++) {
    const raw = lines(formData, `step-${i}`, 30);
    const normalized: string[] = [];
    for (const r of raw) {
      const v = normalizeYouTube(r);
      if (!v) return { ok: false, error: `Этап ${i + 1}: не похоже на ссылку YouTube — «${r}»` };
      if (!normalized.includes(v)) normalized.push(v);
    }
    byStep[String(i)] = normalized;
  }
  try {
    await saveStepVideos(byStep);
    revalidateContent(VIDEOS_TAG);
    return { ok: true, message: "Сохранено" };
  } catch (err) {
    return { ok: false, error: errorMessage(err) };
  }
}
