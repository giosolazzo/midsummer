import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json(
      { ok: false, confirmed: false, error: "missing email" },
      { status: 400 }
    );
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, confirmed: false, error: "server missing api key" },
      { status: 500 }
    );
  }

  // Use the "retrieve by email" endpoint and pass the API version header.
  // Docs: /v1/subscribers/{id_or_email} and X-API-Version 2025-06-01
  const url = `https://api.buttondown.com/v1/subscribers/${encodeURIComponent(email)}`;

  const resp = await fetch(url, {
    headers: {
      Authorization: `Token ${apiKey}`,
      "X-API-Version": "2025-06-01",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (resp.status === 404) {
    // Not found (or not yet created) → definitely not confirmed
    return NextResponse.json({ ok: true, confirmed: false });
  }

  if (!resp.ok) {
    const text = await resp.text();
    return NextResponse.json(
      { ok: false, confirmed: false, upstream: text },
      { status: 502 }
    );
  }

  const sub = await resp.json();

  // Confirmation check: "regular" is the confirmed state; "unactivated" is not.
  // (Handle older/newer shapes just in case.)
  const type = sub?.type || sub?.subscription_status || sub?.state;
  const confirmed =
    type === "regular" || type === "active" || sub?.confirmed === true;

  return NextResponse.json({ ok: true, confirmed });
}
