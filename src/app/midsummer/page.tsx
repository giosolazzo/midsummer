import Link from "next/link";

export default function MidsummerHome() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-semibold">Midsummer Workshops</h1>
          <p className="text-zinc-300">
            Spoken explorations + hands-on workshops to break perfectionism.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {/* Jonathan */}
          <Link
            href="/midsummer/jonathan"
            className="rounded-2xl border border-zinc-700/60 p-5 hover:bg-zinc-100 hover:text-black transition block"
          >
            <h2 className="text-xl font-medium">Jonathan — Guided Workshop</h2>
            <p className="text-sm mt-1 text-current/70">
              Watch the talk → do the 15-min workshop.
            </p>
          </Link>

          {/* Add new workshops by duplicating this card */}
          <div className="rounded-2xl border border-zinc-800/60 p-5 text-zinc-500">
            <h2 className="text-xl font-medium">Next guest</h2>
            <p className="text-sm mt-1">Coming soon.</p>
          </div>
        </section>

        {/* Global newsletter prompt (optional) */}
        <div className="rounded-2xl border border-zinc-700/60 p-5">
          <p className="text-sm text-zinc-300">Get new workshops by email:</p>
          <form
            action="https://buttondown.email/api/emails/embed-subscribe/midsummer"
            method="post"
            className="mt-3 flex gap-2 max-w-md"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@domain.com"
              className="flex-1 px-4 py-2 rounded-md bg-white text-black placeholder:text-zinc-500"
            />
            <button className="px-4 py-2 rounded-md border border-zinc-500 hover:bg-zinc-100 hover:text-black transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
