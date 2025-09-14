"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function JonathanLanding() {
  const router = useRouter();
  const submitted = useRef(false);

  function handleSubmit() {
    if (submitted.current) return;         // avoid double-click issues
    submitted.current = true;

    // Let the form POST to Buttondown in the hidden iframe,
    // then move the user to your pending page.
    setTimeout(() => {
      router.push("/midsummer/jonathan/pending");
    }, 200);
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">Do the guided workshop</h1>
        <p className="text-zinc-300">
          Watch the conversation on YouTube, then get the hands-on workshop here.
        </p>

        <ul className="list-disc pl-6 text-zinc-300">
          <li>Video workshop (10–20 min)</li>
          <li>1-page worksheet</li>
          <li>A 15-minute action you’ll finish today</li>
        </ul>

        {/* Post to Buttondown in a hidden iframe; your site controls navigation */}
        <form
  action="https://buttondown.com/api/emails/embed-subscribe/midsummer"
  method="post"
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
  {/* no redirect_url here — Buttondown settings handle both redirects */}
  <button className="px-4 py-2 rounded-md border border-zinc-500 hover:bg-zinc-100 hover:text-black transition">
    Get the workshop
  </button>
</form>

        {/* Hidden target so the page itself doesn't navigate away */}
        <iframe name="bd-subscribe" className="hidden" />

        <p className="text-xs text-zinc-500">No spam. Unsubscribe anytime.</p>
      </div>
    </main>
  );
}
