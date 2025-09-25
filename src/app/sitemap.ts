// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { WORKSHOPS } from "@/workshops";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://midsummerlab.com";
  const now = new Date();

  return [
    { url: `${base}/midsummer`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...Object.keys(WORKSHOPS).map((slug) => ({
      url: `${base}/midsummer/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
