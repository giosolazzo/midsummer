"use client";

import { useEffect } from "react";

export default function JonathanWorkshop() {
  // Mark confirmed so /pending can auto-redirect on this device.
  useEffect(() => {
    try {
      localStorage.setItem("ms_jonathan_status", "confirmed");
    } catch {}
  }, []);

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">Jonathan’s Guided Workshop</h1>
        <p className="text-zinc-300">
          A focused 15-minute exercise to move from [stuck] to [specific action].
        </p>

        {/* Replace with your final files when ready */}
        <video
          controls
          className="w-full rounded-xl border border-zinc-700/60"
          src="/workshops/jonathan.mp4"
          poster="/workshops/jonathan-poster.jpg"
        />

        <a
          className="underline underline-offset-4"
          href="/workshops/jonathan-worksheet.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download the 1-page worksheet
        </a>

        <section>
          <h2 className="text-lg font-medium mb-2">Steps (15 minutes)</h2>
          <ol className="list-decimal pl-6 text-zinc-300 space-y-1">
            <li>Open the worksheet.</li>
            <li>Set a 15-minute timer.</li>
            <li>Complete: A) … B) … C) …</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
