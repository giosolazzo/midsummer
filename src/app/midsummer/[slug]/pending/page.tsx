"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

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

export default function Pending() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  useEffect(() => {
    if (!slug) return;

    if (isFreshConfirmed(slug)) {
      router.replace(`/midsummer/${slug}/workshop`);
      return;
    }

    // Listen for broadcast from /confirmed (when user clicks email link)
    let ch: BroadcastChannel | null = null;
    try {
      ch = new BroadcastChannel(`ms_midsummer_${slug}`);
      ch.onmessage = (msg) => {
        if (msg?.data?.type === "confirmed") {
          router.replace(`/midsummer/${slug}/workshop`);
        }
      };
    } catch {}

    // Also poll in case BroadcastChannel fails
    const t = setInterval(() => {
      if (isFreshConfirmed(slug)) router.replace(`/midsummer/${slug}/workshop`);
    }, 800);

    return () => {
      try {
        ch?.close();
      } catch {}
      clearInterval(t);
    };
  }, [router, slug]);

  if (!slug) return null;

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="text-5xl">📬</div>
        <h1 className="text-3xl font-semibold">Check your email</h1>
        <p className="text-zinc-300">
          We sent a confirmation link. Click it - this page will continue automatically.
        </p>

        <div className="rounded-[var(--radius-lg)] border border-zinc-800 bg-zinc-950 p-5 text-left text-zinc-200">
          <p className="font-medium mb-2">If you don’t see it:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Check <span className="font-medium">Spam</span> or{" "}
              <span className="font-medium">Promotions</span>.
            </li>
            <li>Give it up to a minute to arrive.</li>
            <li>
              Still nothing?{" "}
              <Link
                href={`/midsummer/${slug}`}
                className="underline underline-offset-4"
              >
                submit your email again
              </Link>
              .
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-center pt-1">
          <Link className="gs-btn gs-btn-5 text-zinc-100" href={`/midsummer/${slug}`}>
            Back to signup
          </Link>
          <Link className="gs-btn gs-btn-5 text-zinc-100" href="/midsummer">
            Back to Midsummer
          </Link>
        </div>

        <p className="text-sm text-zinc-400">
          After confirmation, the workshop unlocks on this device for 24 hours.
        </p>
      </div>
    </main>
  );
}
