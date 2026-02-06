"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";

export default function Confirmed({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const hasBdFlag = useMemo(() => {
    if (typeof window === "undefined") return false;
    const sp = new URLSearchParams(window.location.search);
    return sp.get("bd") === "1";
  }, []);

  useEffect(() => {
    // Only unlock if we came from the Buttondown redirect that includes ?bd=1
    if (!hasBdFlag) return;

    try {
      localStorage.setItem(`ms_${slug}_status`, "confirmed");
      localStorage.setItem(`ms_${slug}_confirmed_at`, String(Date.now()));

      const sp = new URLSearchParams(window.location.search);
      const em =
        sp.get("email_address") || sp.get("email") || sp.get("subscriber") || "";
      if (em) localStorage.setItem(`ms_${slug}_email`, em);
    } catch {}

    try {
      const ch = new BroadcastChannel(`ms_midsummer_${slug}`);
      ch.postMessage({ type: "confirmed", guest: slug });
      ch.close();
    } catch {}
  }, [slug, hasBdFlag]);

  if (!hasBdFlag) {
    return (
      <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
        <div className="max-w-xl mx-auto text-center space-y-5">
          <div className="text-5xl">✉️</div>
          <h1 className="text-3xl font-semibold">Open the confirmation link</h1>
          <p className="text-zinc-300">
            This page unlocks only from the confirmation link in your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              className="px-4 py-2 rounded-md border border-zinc-600 hover:bg-zinc-100 hover:text-black transition"
              href={`/midsummer/${slug}`}
            >
              Back to signup
            </Link>
            <Link
              className="px-4 py-2 rounded-md border border-zinc-600 hover:bg-zinc-100 hover:text-black transition"
              href="/midsummer"
            >
              Back to Midsummer
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-xl mx-auto text-center space-y-5">
        <div className="text-5xl">✅</div>
        <h1 className="text-3xl font-semibold">Email confirmed</h1>
        <p className="text-zinc-300">
          If your pending tab is still open, return to it — it should continue automatically.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            className="px-4 py-2 rounded-md border border-zinc-600 hover:bg-zinc-100 hover:text-black transition"
            href={`/midsummer/${slug}/workshop`}
          >
            Continue to the workshop
          </Link>
          <Link
            className="px-4 py-2 rounded-md border border-zinc-600 hover:bg-zinc-100 hover:text-black transition"
            href="/midsummer"
          >
            Back to Midsummer
          </Link>
        </div>
      </div>
    </main>
  );
}
