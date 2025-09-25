// src/components/SiteHeader.tsx
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/midsummer" className="font-semibold">Midsummer</Link>
        <nav className="flex gap-4 text-sm text-zinc-300">
          <Link href="/midsummer">Workshops</Link>
          <a href="https://giuseppesolazzo.com">Giuseppe</a>
        </nav>
      </div>
    </header>
  );
}
