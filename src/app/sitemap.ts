// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NODE_ENV === "production"
      ? "https://midsummerlab.com"
      : "http://localhost:3000";

  return [
    { url: `${base}/midsummer`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/privacy`, changeFrequency: "monthly" },
    // Add public workshop landings explicitly:
    { url: `${base}/midsummer/jonathan`, changeFrequency: "weekly", priority: 0.8 },
  ];
}
