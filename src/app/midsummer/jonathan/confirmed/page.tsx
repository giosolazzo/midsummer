"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Confirmed() {
  const router = useRouter();

  useEffect(() => {
    try {
      // Mark this browser as confirmed
      localStorage.setItem("ms_jonathan_status", "confirmed");

      // Read email from the URL without useSearchParams (avoids Suspense requirement)
      const sp = new URLSearchParams(window.location.search);
      const em =
        sp.get("email_address") || sp.get("email") || sp.get("subscriber") || "";
      if (em) localStorage.setItem("ms_jonathan_email", em);
    } catch {}

    // Ping any open /pending tab in same profile
    try {
      const ch = new BroadcastChannel("ms_midsummer");
      ch.postMessage({ type: "confirmed", guest: "jonathan" });
      ch.close();
    } catch {}

    // Continue to workshop
    const t = setTimeout(() => router.replace("/midsummer/jonathan/workshop"), 300);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-xl mx-auto text-center space-y-4">
        <div className="text-5xl">✅</div>
        <h1 className="text-3xl font-semibold">You’re in!</h1>
        <p className="text-zinc-300">Taking you to the workshop…</p>
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
