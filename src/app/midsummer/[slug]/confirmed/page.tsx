"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmRouter() {
  const router = useRouter();

  useEffect(() => {
    try {
      const last = localStorage.getItem("ms_last_signup") || "";
      // last can be "eon" or "midsummer:jonathan" (set by forms)
      if (last === "eon") {
        router.replace("/eon/thanks");
        return;
      }
      if (last.startsWith("midsummer:")) {
        const slug = last.split(":")[1] || "jonathan";
        // notify any open pending tab, then continue:
        try {
          const ch = new BroadcastChannel(`ms_midsummer_${slug}`);
          ch.postMessage({ type: "confirmed", guest: slug });
          ch.close();
        } catch {}
        router.replace(`/midsummer/${slug}/workshop`);
        return;
      }
    } catch {}
    // Fallback: let them choose
    router.replace("/midsummer");
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-xl mx-auto text-center space-y-4">
        <div className="text-5xl">✅</div>
        <h1 className="text-3xl font-semibold">You’re confirmed</h1>
        <p className="text-zinc-300">Finishing up…</p>
        <p className="text-sm text-zinc-500">
          If this doesn’t continue, go to{" "}
          <a className="underline" href="/midsummer">Midsummer</a> or{" "}
          <a className="underline" href="/eon/thanks">Eon</a>.
        </p>
      </div>
    </main>
  );
}
