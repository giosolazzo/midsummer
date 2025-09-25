"use client";

import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-black/10 bg-[--color-ivory]/90 backdrop-blur supports-[backdrop-filter]:bg-[--color-ivory]/70">
      <div className="mx-auto max-w-5xl h-14 px-4 flex items-center justify-between">
        <Link href="/midsummer" className="font-semibold tracking-tight text-[--color-ink]">
          Midsummer
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/midsummer" className="hover:opacity-80">Workshops</Link>
          <a href="https://giuseppesolazzo.com" className="hover:opacity-80">Giuseppe</a>
        </nav>
      </div>
    </header>
  );
}
