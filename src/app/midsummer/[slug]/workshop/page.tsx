"use client";

import { use, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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

export default function Workshop({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);

  const w = useMemo(() => WORKSHOPS[slug], [slug]);

  useEffect(() => {
    if (!isFreshConfirmed(slug)) {
      router.replace(`/midsummer/${slug}/pending`);
    }
  }, [router, slug]);

  if (!isFreshConfirmed(slug)) return null;

  if (!w) {
    return (
      <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-2xl font-semibold">Unknown workshop.</h1>
          <div className="flex justify-center">
            <Link href="/midsummer" className="gs-btn gs-btn-5 text-zinc-100">
              Back to Midsummer
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const posterSrc = w.poster || "/images/midsummer.png.png";

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <header className="space-y-3 text-center">
          <div className="flex justify-center">
            <Link href="/midsummer" className="gs-btn gs-btn-5 text-zinc-100">
              Back to Midsummer
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold">{w.title}</h1>

          <p className="text-zinc-300">
            A focused exercise to move from <em>stuck</em> to{" "}
            <em>specific action</em>.
          </p>
        </header>

        {/* Video / placeholder (consistent block) */}
        <section className="space-y-4">
          {w.video ? (
            <video
              controls
              className="w-full rounded-[var(--radius-lg)] border border-zinc-800 bg-black"
              src={w.video}
              poster={w.poster || undefined}
            />
          ) : (
            <div className="w-full rounded-[var(--radius-lg)] border border-zinc-800 bg-zinc-950 overflow-hidden">
              <div className="w-full aspect-video relative">
                <Image
                  src={posterSrc}
                  alt={`${w.title} cover`}
                  fill
                  className="object-cover opacity-90"
                  priority
                />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-zinc-200 text-sm sm:text-base px-4 text-center">
                    Video will appear here.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Worksheet CTA */}
          <div className="flex justify-center">
            {w.sheet ? (
              <a
                className="gs-btn gs-btn-5 text-zinc-100"
                href={w.sheet}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download the 1-page worksheet
              </a>
            ) : (
              <p className="text-sm text-zinc-500">Worksheet coming soon.</p>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="text-zinc-600 select-none">------</div>
        </div>

        {/* Suggested flow */}
        <section className="rounded-[var(--radius-lg)] border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-lg font-medium mb-3 text-zinc-100">
            Suggested flow (15-25 min)
          </h2>
          <ol className="list-decimal pl-6 text-zinc-200 space-y-1">
            <li>Open the worksheet.</li>
            <li>Watch the video section-by-section.</li>
            <li>Pause when prompted and complete each prompt.</li>
            <li>Commit to one concrete action today.</li>
          </ol>
        </section>

        {/* Jonathan section */}
        <section className="rounded-[var(--radius-lg)] border border-zinc-800 bg-zinc-950 p-6">
          <div className="grid gap-6 sm:grid-cols-[180px_1fr] items-start">
            <div className="rounded-[var(--radius-lg)] overflow-hidden border border-zinc-800 bg-black">
              <div className="aspect-[3/4] relative">
                <Image
                  src="/workshops/MS01-Reichental/assets/jonathan.png"
                  alt="Jonathan Reichental"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-medium text-zinc-100">
                About Jonathan
              </h2>

              <ul className="text-zinc-200 space-y-2 list-disc pl-5">
                <li>Multiple award-winning technology leader and educator.</li>
                <li>
                  Founder of Human Future - advisory, investment, and education.
                </li>
                <li>
                  Creates online education for LinkedIn Learning and writes for
                  Forbes.
                </li>
              </ul>

              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  className="gs-btn gs-btn-5 text-zinc-100"
                  href="https://www.reichental.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
                <a
                  className="gs-btn gs-btn-5 text-zinc-100"
                  href="https://www.linkedin.com/in/reichental"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="gs-btn gs-btn-5 text-zinc-100"
                  href="https://www.instagram.com/jreichental"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
