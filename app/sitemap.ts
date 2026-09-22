import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { cars } from "@/lib/content/cars";
import { articles } from "@/lib/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/kak-eto-rabotaet"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/stoimost"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/pochemu-kyrgyzstan"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/avtomobili"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/kontakty"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const carPages: MetadataRoute.Sitemap = cars.map((c) => ({
    url: absoluteUrl(`/avtomobili/${c.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: absoluteUrl(`/blog/${a.slug}`),
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...carPages, ...articlePages];
}
