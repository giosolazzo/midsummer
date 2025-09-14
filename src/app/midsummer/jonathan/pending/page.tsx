"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function Pending() {
  const router = useRouter();

  useEffect(() => {
    // If already confirmed (e.g., returning), go immediately.
    if (localStorage.getItem("ms_jonathan_status") === "confirmed") {
      router.replace("/midsummer/jonathan/workshop");
      return;
    }

    // If another tab sets confirmed, this listener fires and we navigate.
    function onStorage(e: StorageEvent) {
      if (e.key === "ms_jonathan_status" && e.newValue === "confirmed") {
        router.replace("/midsummer/jonathan/workshop");
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="text-5xl">📬</div>
        <h1 className="text-3xl font-semibold">Check your email</h1>
        <p className="text-zinc-300">
          We sent a confirmation link. Click it to unlock the workshop — this page will
          automatically continue.
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

