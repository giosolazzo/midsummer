"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WORKSHOPS } from "@/workshops";

const CONFIRM_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

function isFreshConfirmed(slug: string) {
  try {
    const status = localStorage.getItem(`ms_${slug}_status`);
    const atRaw = localStorage.getItem(`ms_${slug}_confirmed_at`);
    const at = atRaw ? Number(atRaw) : 0;
    if (status !== "confirmed" || !at) return false;
    return Date.now() - at < CONFIRM_TTL_MS;
  } catch {
    return false;
  }
}

export default function Workshop({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { slug } = params;

  const w = useMemo(() => WORKSHOPS[slug], [slug]);

  useEffect(() => {
    if (!isFreshConfirmed(slug)) {
      router.replace(`/midsummer/${slug}/pending`);
    }
  }, [router, slug]);

  if (!isFreshConfirmed(slug)) return null;

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
