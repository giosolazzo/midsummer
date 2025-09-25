"use client";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-black/70 backdrop-blur border-b border-zinc-800">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link href="/midsummer" className="font-medium tracking-wide">
          Midsummer
        </Link>
        <nav className="flex items-center gap-5 text-sm text-zinc-300">
          <Link href="/midsummer" className="hover:text-white">Workshops</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
        </nav>
      </div>
    </header>
  );
}
