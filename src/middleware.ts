import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Canonical redirect: /midsummer -> /
  if (req.nextUrl.pathname === "/midsummer") {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 301);
  }

  // Only log normal page views (skip assets/API)
  const accept = req.headers.get("accept") || "";
  if (!accept.includes("text/html")) return NextResponse.next();

  // Derive fields
  const ipHeader = req.headers.get("x-forwarded-for") || "";
  const ip = ipHeader.split(",")[0]?.trim() || "unknown"; // first IP in the list
  const ua = req.headers.get("user-agent") || "unknown";
  const country = req.headers.get("x-vercel-ip-country") || "unknown";
  const city = req.headers.get("x-vercel-ip-city") || "unknown";
  const region = req.headers.get("x-vercel-ip-country-region") || "unknown";
  const path = req.nextUrl.pathname;
  const ref = req.headers.get("referer") || "";

  // Pseudonymous Visitor ID (no raw IP stored in logs)
  const salt = process.env.VISITOR_HASH_SALT || "dev-salt";
  const enc = new TextEncoder();
  const data = enc.encode(`${ip}|${ua}|${salt}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  const vid = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 12); // short, readable

  // Single JSON line you can filter in Vercel logs
  console.log(
    JSON.stringify({
      type: "visit",
      ts: Date.now(),
      vid,
      country,
      region,
      city,
      path,
      ref,
    })
  );

  return NextResponse.next();
}

// Exclude static assets, Next internals, and API routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
