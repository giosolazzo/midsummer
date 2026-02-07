"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PERSONAL_SITE = "https://giuseppesolazzo.com";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // ESC closes
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Click outside closes
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(t)) setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-black text-zinc-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* left (logo) */}
          <Link
            href="/midsummer"
            className="inline-flex items-center text-zinc-300 hover:text-zinc-100 transition whitespace-nowrap"
            aria-label="Midsummer home"
          >
            <Image
              src="/images/midsummer.png.png"
              alt="Midsummer"
              width={420}
              height={120}
              className="h-8 sm:h-10 w-auto"
              priority
            />
          </Link>

          {/* right */}
          <nav className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-400 justify-end">
            <Link
              href="/midsummer#catalog"
              className="text-zinc-100 font-medium hover:font-normal transition whitespace-nowrap"
            >
              Workshops
            </Link>

            <span className="text-zinc-700 select-none">/</span>

            <a
              href={PERSONAL_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-100 transition whitespace-nowrap"
            >
              Giuseppe
            </a>
          </nav>
        </div>
      </header>

      {/* (No backdrop/dropdown yet — keeping it simple for Midsummer) */}
    </>
  );
}
