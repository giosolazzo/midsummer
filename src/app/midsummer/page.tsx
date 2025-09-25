import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function MidsummerHome() {
  return (
    <main className="min-h-screen bg-[--color-bg] text-[--color-fg]">
      {/* HERO */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
        {/* background image — swap /hero.jpg with your asset in /public */}
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* dark gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        {/* copy */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight">
            Midsummer Workshop
          </h1>
          <p className="mt-6 max-w-3xl text-xl sm:text-2xl opacity-90">
            workshop that started with a simple idea — less right, more alive.
          </p>
          <div className="mt-10">
            <Button as="link" href="#catalog" variant="primary">Begin</Button>
          </div>
        </div>
      </section>

      {/* CATALOG / CARDS (your existing section) */}
      <section id="catalog" className="px-6 py-14">
        <div className="max-w-3xl mx-auto space-y-8">
          <header className="space-y-2">
            <h2 className="text-4xl font-semibold text-[--color-navy]">Midsummer Workshops</h2>
            <p className="text-zinc-700">
              Spoken explorations + hands-on workshops to break perfectionism.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Jonathan */}
            <Link
              href="/midsummer/jonathan"
              className="rounded-[var(--radius-lg)] border border-zinc-700/40 p-5 hover:bg-black hover:text-white transition block bg-black text-white"
            >
              <h3 className="text-xl font-medium">Jonathan — Guided Workshop</h3>
              <p className="text-sm mt-1 text-white/80">Watch the talk → do the 15-min workshop.</p>
            </Link>

            {/* placeholder card */}
            <div className="rounded-[var(--radius-lg)] border border-zinc-300/70 p-5 text-zinc-600 bg-[--color-ivory]">
              <h3 className="text-xl font-medium">Next guest</h3>
              <p className="text-sm mt-1">Coming soon.</p>
            </div>
          </div>

          {/* global prompt */}
          <div className="rounded-[var(--radius-lg)] border border-zinc-300/70 p-5">
            <p className="text-sm text-zinc-700">Get new workshops by email:</p>
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
              <Button as="button" variant="secondary" className="px-4">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
