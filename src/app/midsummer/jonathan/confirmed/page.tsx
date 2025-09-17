"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Confirmed() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    try {
      // Mark this browser as confirmed and remember the email if present
      localStorage.setItem("ms_jonathan_status", "confirmed");
      const em =
        sp.get("email_address") ||
        sp.get("email") ||
        sp.get("subscriber") ||
        "";
      if (em) localStorage.setItem("ms_jonathan_email", em);
    } catch {}

    // Nudge any open /pending tab in the same browser profile
    try {
      const ch = new BroadcastChannel("ms_midsummer");
      ch.postMessage({ type: "confirmed", guest: "jonathan" });
      ch.close();
    } catch {}

    // Continue to workshop shortly
    const t = setTimeout(
      () => router.replace("/midsummer/jonathan/workshop"),
      300
    );
    return () => clearTimeout(t);
  }, [router, sp]);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-xl mx-auto text-center space-y-4">
        <div className="text-5xl">✅</div>
        <h1 className="text-3xl font-semibold">You’re in!</h1>
        <p className="text-zinc-300">
          Taking you to the workshop…
        </p>
        <p className="text-sm text-zinc-500">
          If this tab doesn’t continue automatically,{" "}
          <a className="underline" href="/midsummer/jonathan/workshop">
            click here
          </a>.
        </p>
      </div>
    </main>
  );
}
