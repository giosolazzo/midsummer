"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Confirmed({ params }: { params: { slug: string } }) {
  const { slug } = params;

  useEffect(() => {
    try {
      localStorage.setItem(`ms_${slug}_status`, "confirmed");
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
  }, [slug]);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-xl mx-auto text-center space-y-5">
        <div className="text-5xl">✅</div>
        <h1 className="text-3xl font-semibold">You’re in!</h1>
        <p className="text-zinc-300">
          Return to the other tab — it should continue automatically.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            className="px-4 py-2 rounded-md border border-zinc-600 hover:bg-zinc-100 hover:text-black transition"
            href={`/midsummer/${slug}/workshop`}
          >
            Go to the workshop
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
