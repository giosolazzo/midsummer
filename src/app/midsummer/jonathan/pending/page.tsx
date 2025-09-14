"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pending() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const email =
      searchParams.get("email_address") ||
      (typeof window !== "undefined"
        ? localStorage.getItem("ms_jonathan_email") || ""
        : "");

    if (!email) return;

    async function checkOnce() {
      try {
        const res = await fetch(`/api/bd-status?email=${encodeURIComponent(email)}`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (json?.confirmed) {
          try {
            localStorage.setItem("ms_jonathan_status", "confirmed");
          } catch {}
          router.replace("/midsummer/jonathan/workshop");
        }
      } catch {
        // ignore and retry
      }
    }

    checkOnce();
    const id = setInterval(checkOnce, 2500);
    return () => clearInterval(id);
  }, [router, searchParams]);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="text-5xl">📬</div>
        <h1 className="text-3xl font-semibold">Check your email</h1>
        <p className="text-zinc-300">
          We sent a confirmation link. After you click it, this page will continue
          automatically.
        </p>

        <div className="rounded-2xl border border-zinc-700/60 p-5 text-left text-zinc-300">
          <p className="font-medium mb-2">If you don’t see it:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Look in <span className="font-medium">Spam</span> or <span className="font-medium">Promotions</span>.</li>
            <li>Give it up to a minute to arrive.</li>
            <li>Still nothing? <a href="/midsummer/jonathan" className="underline">submit your email again</a>.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
