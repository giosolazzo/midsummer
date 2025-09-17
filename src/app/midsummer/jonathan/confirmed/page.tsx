"use client";

import { useEffect } from "react";

export default function Confirmed() {
  useEffect(() => {
    try {
      // Mark this browser as confirmed
      localStorage.setItem("ms_jonathan_status", "confirmed");

      // Capture email from querystring (optional)
      const sp = new URLSearchParams(window.location.search);
      const em =
        sp.get("email_address") || sp.get("email") || sp.get("subscriber") || "";
      if (em) localStorage.setItem("ms_jonathan_email", em);
    } catch {}

    // Tell any open /pending tab (same browser profile) to proceed
    try {
      const ch = new BroadcastChannel("ms_midsummer");
      ch.postMessage({ type: "confirmed", guest: "jonathan" });
      ch.close();
    } catch {}
  }, []);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-xl mx-auto text-center space-y-4">
        <div className="text-5xl">✅</div>
        <h1 className="text-3xl font-semibold">You’re in!</h1>
        <p className="text-zinc-300">
          Return to the other tab — it should continue automatically.
        </p>
        <p className="text-sm text-zinc-500">
          Or continue here:&nbsp;
          <a className="underline" href="/midsummer/jonathan/workshop">
            Go to the workshop
          </a>
          .
        </p>
      </div>
    </main>
  );
}
