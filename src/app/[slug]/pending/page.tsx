"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Pending({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    try {
      if (localStorage.getItem(`ms_${slug}_status`) === "confirmed") {
        router.replace(`/midsummer/${slug}/workshop`);
        return;
      }
    } catch {}

    let ch: BroadcastChannel | null = null;
    try {
      ch = new BroadcastChannel(`ms_midsummer_${slug}`);
      ch.onmessage = (msg) => {
        if (msg?.data?.type === "confirmed") {
          router.replace(`/midsummer/${slug}/workshop`);
        }
      };
    } catch {}

    return () => { try { ch?.close(); } catch {} };
  }, [router, slug]);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="text-5xl">📬</div>
        <h1 className="text-3xl font-semibold">Check your email</h1>
        <p className="text-zinc-300">
          Click the confirmation link. If this tab and your email are in the same browser,
          it will continue automatically.
        </p>

        <a
          href={`/midsummer/${slug}/workshop`}
          className="inline-block mt-2 px-4 py-2 rounded-md border border-zinc-500 hover:bg-zinc-100 hover:text-black transition"
        >
          I’ve confirmed — continue
        </a>
      </div>
    </main>
  );
}
