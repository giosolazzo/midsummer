"use client";

import { useEffect, useState } from "react";

export default function JonathanLanding() {
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    try {
      setIsConfirmed(localStorage.getItem("ms_jonathan_status") === "confirmed");
    } catch {}
  }, []);

  function rememberEmail() {
    try {
      const input = document.getElementById("bd-email") as HTMLInputElement | null;
      if (input?.value) localStorage.setItem("ms_jonathan_email", input.value);
      localStorage.setItem("ms_jonathan_status", "pending");
    } catch {}
    // IMPORTANT: We do NOT preventDefault — the form posts normally to Buttondown
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">Do the guided workshop</h1>
        <p className="text-zinc-300">
          Watch the conversation on YouTube, then get the hands-on workshop here.
        </p>

        {isConfirmed && (
          <div className="rounded-2xl border border-zinc-700/60 p-4">
            <div className="text-sm text-zinc-300">Welcome back — you’re confirmed.</div>
            <a
              href="/midsummer/jonathan/workshop"
              className="inline-block mt-3 px-4 py-2 rounded-md border border-zinc-500 hover:bg-zinc-100 hover:text-black transition"
            >
              Continue to workshop
            </a>
          </div>
        )}

        <ul className="list-disc pl-6 text-zinc-300">
          <li>Video workshop (10–20 min)</li>
          <li>1-page worksheet</li>
          <li>A 15-minute action you’ll finish today</li>
        </ul>

        <form
  action="https://buttondown.email/api/emails/embed-subscribe/midsummer"
  method="post"
  onSubmit={rememberEmail}
  className="flex gap-2 items-center"
>
          <label htmlFor="bd-email" className="sr-only">Enter your email</label>
          <input
            type="email"
            name="email"
            id="bd-email"
            required
            placeholder="you@domain.com"
            className="w-full max-w-sm px-4 py-2 rounded-md bg-white text-black placeholder:text-zinc-500"
          />
          <input type="hidden" name="tag" value="Midsummer-Jonathan" />
          {/* After submit, Buttondown redirects you to /pending */}
          <input
            type="hidden"
            name="redirect_url"
            value="https://midsummerlab.com/midsummer/jonathan/pending"
          />
          <button className="px-4 py-2 rounded-md border border-zinc-500 hover:bg-zinc-100 hover:text-black transition">
            Get the workshop
          </button>
        </form>

        {/* Always offer a manual path for return visitors */}
        <p className="text-xs text-zinc-500">
          Already confirmed?{" "}
          <a href="/midsummer/jonathan/workshop" className="underline underline-offset-4">
            Continue to the workshop
          </a>
          .
        </p>
      </div>
    </main>
  );
}
