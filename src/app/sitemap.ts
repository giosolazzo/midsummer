import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const host =
    process.env.NODE_ENV === "production"
      ? "https://midsummerlab.com"
      : "http://localhost:3000";

  return [
    { url: `${host}/midsummer`, changeFrequency: "weekly", priority: 1 },
    { url: `${host}/midsummer/jonathan`, changeFrequency: "monthly", priority: 0.7 },
    // Do NOT list /pending, /confirmed, /workshop
    { url: `${host}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
