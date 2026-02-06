"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Pending({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    // if this browser is already marked confirmed, go straight in
    try {
      if (localStorage.getItem(`ms_${slug}_status`) === "confirmed") {
        router.replace(`/midsummer/${slug}/workshop`);
        return;
      }
    } catch {}

    // otherwise, listen for a broadcast from the /confirmed page
    let ch: BroadcastChannel | null = null;
    try {
      ch = new BroadcastChannel(`ms_midsummer_${slug}`);
      ch.onmessage = (msg) => {
        if (msg?.data?.type === "confirmed") {
          router.replace(`/midsummer/${slug}/workshop`);
        }
      };
    } catch {}

    return () => {
      try {
        ch?.close();
      } catch {}
    };
  }, [router, slug]);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="text-5xl">📬</div>
        <h1 className="text-3xl font-semibold">Check your email</h1>
        <p className="text-zinc-300">
          We sent a confirmation link. Click it — this page will continue automatically.
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
              <Link href={`/midsummer/${slug}`} className="underline underline-offset-4">
                submit your email again
              </Link>
              .
            </li>
          </ul>
        </div>

        {/* ❌ Removed the direct “continue to workshop” link (bypass) */}
        <p className="text-sm text-zinc-400">
          After you click the confirmation link, this page will unlock automatically.
        </p>
      </div>
    </main>
  );
}
