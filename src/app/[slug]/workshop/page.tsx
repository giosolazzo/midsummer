"use client";

import { useEffect } from "react";
import { WORKSHOPS } from "@/workshops";

export default function Workshop({ params }: { params: { slug: string } }) {
  const w = WORKSHOPS[params.slug];

  useEffect(() => {
    try {
      localStorage.setItem(`ms_${params.slug}_status`, "confirmed");
    } catch {}
  }, [params.slug]);

  if (!w) {
    return (
      <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
        <div className="max-w-2xl mx-auto">Unknown workshop.</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">{w.title}</h1>
        <p className="text-zinc-300">
          A focused exercise to move from [stuck] to [specific action].
        </p>

        {/* Placeholder media for now; replace paths in WORKSHOPS when ready */}
        <video
          controls
          className="w-full rounded-xl border border-zinc-700/60"
          src={w.video}
          poster={w.poster}
        />

        <a
          className="underline underline-offset-4"
          href={w.sheet}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download the 1-page worksheet
        </a>
      </div>
    </main>
  );
}
