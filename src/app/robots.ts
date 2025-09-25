// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // we don’t want these indexed
        disallow: ["/midsummer/*/pending", "/midsummer/*/confirmed"],
      },
    ],
    sitemap: "https://midsummerlab.com/sitemap.xml",
  };
}
