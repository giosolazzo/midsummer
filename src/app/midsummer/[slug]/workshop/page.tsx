"use client";

import { useEffect } from "react";
import Link from "next/link";
import { WORKSHOPS } from "@/workshops";

export default function Workshop({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const w = WORKSHOPS[slug];

  // Mark this browser as confirmed so /pending can auto-continue
  useEffect(() => {
    try {
      localStorage.setItem(`ms_${slug}_status`, "confirmed");
    } catch {}
  }, [slug]);

  if (!w) {
    return (
      <main className="min-h-screen bg-[--color-bg] text-[--color-fg] px-6 py-14">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold">Unknown workshop.</h1>
          <p className="mt-3">
            <Link href="/midsummer" className="underline underline-offset-4">
              Back to all workshops
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[--color-bg] text-[--color-fg] px-6 py-14">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <p className="text-sm/6 opacity-70">
            <Link href="/midsummer" className="underline underline-offset-4">
              ← Back to Midsummer
            </Link>
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold">{w.title}</h1>
          <p className="text-zinc-700">
            A focused exercise to move from <em>stuck</em> to{" "}
            <em>specific action</em>.
          </p>
        </header>

        {/* Video (or placeholder) */}
        {w.video ? (
          <video
            controls
            className="w-full rounded-[var(--radius-lg)] border border-black/15 bg-black"
            src={w.video}
            poster={w.poster || undefined}
          />
        ) : (
          <div className="w-full aspect-video rounded-[var(--radius-lg)] border border-black/15 bg-black/80 grid place-items-center text-white/70">
            Video placeholder — add file path in WORKSHOPS.
          </div>
        )}

        {/* Worksheet link */}
        {w.sheet ? (
          <a
            className="inline-block rounded-[9999px] px-5 py-2 border border-black/20 hover:bg-black/[.04] transition"
            href={w.sheet}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download the 1-page worksheet
          </a>
        ) : (
          <p className="text-sm text-zinc-600">
            Worksheet coming soon. (Set <code>sheet</code> in <code>WORKSHOPS</code>.)
          </p>
        )}

        {/* Simple step list (optional scaffold) */}
        <section className="rounded-[var(--radius-lg)] border border-black/10 bg-white p-5">
          <h2 className="text-lg font-medium mb-2">Suggested flow (15–25 min)</h2>
          <ol className="list-decimal pl-6 text-zinc-800 space-y-1">
            <li>Open the worksheet.</li>
            <li>Watch the video section-by-section.</li>
            <li>Pause when prompted and complete each prompt.</li>
            <li>Commit to one concrete action today.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
