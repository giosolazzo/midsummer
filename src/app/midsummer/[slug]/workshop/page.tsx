"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WORKSHOPS } from "@/workshops";

const CONFIRM_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

function isFreshConfirmed(slug: string) {
  try {
    const status = localStorage.getItem(`ms_${slug}_status`);
    const atRaw = localStorage.getItem(`ms_${slug}_confirmed_at`);
    const at = atRaw ? Number(atRaw) : 0;
    if (status !== "confirmed" || !at) return false;
    return Date.now() - at < CONFIRM_TTL_MS;
  } catch {
    return false;
  }
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-zinc-700 hover:border-zinc-400 hover:bg-zinc-100/5 transition"
    >
      {children}
    </a>
  );
}

export default function Workshop({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);

  const w = useMemo(() => WORKSHOPS[slug], [slug]);

  useEffect(() => {
    if (!isFreshConfirmed(slug)) {
      router.replace(`/midsummer/${slug}/pending`);
    }
  }, [router, slug]);
  // click-to-play behavior for YouTube embeds (so your thumbnail shows first)
  const [playYoutube, setPlayYoutube] = useState(false);

  // Reset play state when navigating between slugs (safe + keeps behavior clean)
  useEffect(() => {
    setPlayYoutube(false);
  }, [slug]);

  const youtubeSrcAutoplay = useMemo(() => {
    const yt = w?.youtube?.trim();
    if (!yt) return "";
    const joiner = yt.includes("?") ? "&" : "?";
    return `${yt}${joiner}autoplay=1`;
  }, [w?.youtube]);

  if (!isFreshConfirmed(slug)) return null;

  if (!w) {
    return (
      <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-2xl font-semibold">Unknown workshop.</h1>
          <div className="flex justify-center">
            <Link href="/midsummer" className="gs-btn gs-btn-5 text-zinc-100">
              Back to Midsummer
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Big placeholder uses same hero metrics. Not Jonathan’s photo as the main placeholder.
  const heroPlaceholder =
    slug === "jonathan"
      ? "/workshops/MS01-Reichental/assets/youtube_thumbnail_tintin_cartoon_1920x1080_MS01.png"
      : "/hero.jpg";

  const title =
    slug === "jonathan" ? "A different version of you" : w.title || "Workshop";
  const byline = slug === "jonathan" ? "Guided by Jonathan Reichental, PhD" : "";
  const dateLine = slug === "jonathan" ? "MS01 - May 2025 ┃ SF - Werqwise" : "";

  const hasMp4 = Boolean(w.video && w.video.trim().length > 0);
  const hasYoutubeEmbed = Boolean(w.youtube && w.youtube.trim().length > 0);

  // Full conversation link (separate from the embedded workshop video)
  const fullConversationUrl =
    slug === "jonathan" ? "https://www.youtube.com/watch?v=atXMleOvSu0" : "";

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="px-1 sm:px-3 pt-6 sm:pt-8 pb-14">
        <div className="mx-auto max-w-[92rem] space-y-6">
          {/* Header - left, minimal, above the big media block */}
          <header className="px-4 sm:px-8 space-y-2">
            <div className="inline-block scale-[0.85] origin-left">
              <Link href="/midsummer" className="gs-btn gs-btn-5 text-zinc-100">
                Back to Midsummer
              </Link>
            </div>

            {/* title sizing */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              {title}
            </h1>

            {byline ? <p className="text-zinc-300">{byline}</p> : null}
            {dateLine ? (
              <p className="text-sm text-zinc-500">{dateLine}</p>
            ) : null}
          </header>

          {/* Big media block - same height as home HERO */}
          <section className="px-4 sm:px-8">
            <div className="rounded-[var(--ms-radius,24px)] overflow-hidden border border-zinc-800 bg-black">
              <div className="relative h-[520px] sm:h-[620px]">
                {hasMp4 ? (
                  <video
                    controls
                    className="absolute inset-0 h-full w-full object-cover"
                    src={w.video}
                  />
                ) : hasYoutubeEmbed ? (
                  playYoutube ? (
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={youtubeSrcAutoplay}
                      title={`${title} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlayYoutube(true)}
                      className="absolute inset-0 w-full h-full text-left"
                      aria-label="Play workshop video"
                    >
                      <Image
                        src={heroPlaceholder}
                        alt=""
                        fill
                        priority
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/85" />
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="flex items-center gap-3 rounded-full border border-zinc-700 bg-black/40 px-5 py-3 hover:bg-black/55 transition">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100/10 border border-zinc-600">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path d="M8 5v14l11-7L8 5z" />
                            </svg>
                          </span>
                          <span className="text-zinc-100 text-sm sm:text-base"> Play

                          </span>
                        </div>
                      </div>
                    </button>
                  )
                ) : (
                  <>
                    <Image
                      src={heroPlaceholder}
                      alt=""
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/85" />
                    <div className="absolute inset-0 flex items-center justify-center px-6">
                      <div className="max-w-2xl text-center">
                        <p className="text-zinc-200 text-base sm:text-lg">
                          Video will appear here.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Actions row (YouTube + Worksheet) */}
          <section className="px-4 sm:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-3 items-center sm:grid-cols-[1fr_auto_1fr]">
                {/* Left button (right-aligned so it “leans” into the center) */}
                <div className="flex justify-center sm:justify-end">
                  {fullConversationUrl ? (
                    <a
                      className="gs-btn gs-btn-5 text-zinc-100"
                      href={fullConversationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="inline-flex items-center gap-2">
                        <span>Full conversation here →</span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M23.498 6.186C23.223 5.154 22.42 4.351 21.388 4.076C19.506 3.571 12 3.571 12 3.571C12 3.571 4.494 3.571 2.612 4.076C1.58 4.351 0.777 5.154 0.502 6.186C0 8.068 0 12 0 12C0 12 0 15.932 0.502 17.814C0.777 18.846 1.58 19.649 2.612 19.924C4.494 20.429 12 20.429 12 20.429C12 20.429 19.506 20.429 21.388 19.924C22.42 19.649 23.223 18.846 23.498 17.814C24 15.932 24 12 24 12C24 12 24 8.068 23.498 6.186ZM9.545 15.568V8.432L15.818 12L9.545 15.568Z" />
                        </svg>
                      </span>
                    </a>
                  ) : null}
                </div>

                {/* Fixed center slash */}
                <div className="hidden sm:flex justify-center">
                  {fullConversationUrl && w.sheet ? (
                    <span className="text-zinc-600 select-none">/</span>
                  ) : null}
                </div>

                {/* Right button (left-aligned so it “leans” into the center) */}
                <div className="flex justify-center sm:justify-start">
                  {w.sheet ? (
                    <a
                      className="gs-btn gs-btn-5 text-zinc-100"
                      href={w.sheet}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download the worksheet
                    </a>
                  ) : (
                    <p className="text-sm text-zinc-500">Worksheet coming soon.</p>
                  )}
                </div>

                {/* Mobile: show the slash as its own centered row */}
                {fullConversationUrl && w.sheet ? (
                  <div className="sm:hidden flex justify-center">
                    <span className="text-zinc-600 select-none">/</span>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="flex justify-center">
            <div className="text-zinc-600 select-none">------------</div>
          </div>

          {/* Jonathan section (no outer border, PhD included, no YouTube icon) */}
          <section className="px-4 sm:px-8">
            <div className="rounded-[var(--radius-lg)] bg-zinc-950 p-6">
              <div className="grid gap-6 sm:grid-cols-[220px_1fr] items-start">
                <div className="rounded-[var(--radius-lg)] overflow-hidden bg-black">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/workshops/MS01-Reichental/assets/jonathan.png"
                      alt="Jonathan Reichental"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-zinc-100">
                    Jonathan Reichental, PhD
                  </h2>

                  <p className="text-zinc-200 leading-relaxed">
                    Dr. Jonathan Reichental is a multiple-award-winning technology leader and educator. He’s
                    served as CIO at O’Reilly Media and the City of Palo Alto, and previously held roles from
                    senior software engineering manager to director of technology innovation.
                  </p>

                  <p className="text-zinc-200 leading-relaxed">
                    He founded Human Future (advisory, investment, and education), writes for Forbes, and has
                    authored books including <em>Smart Cities for Dummies</em>, <em>Data Governance for Dummies</em>,
                    and <em>Cryptocurrency QuickStart Guide</em>. His LinkedIn Learning courses have reached{" "}
                    <span className="text-zinc-100 font-medium">millions of students</span>.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {/* Website icon */}
                    <IconLink href="https://www.reichental.com/" label="Website">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <path d="M2 12H22" stroke="currentColor" strokeWidth="1.6" />
                        <path
                          d="M12 2C14.8 4.8 16.4 8.3 16.4 12C16.4 15.7 14.8 19.2 12 22C9.2 19.2 7.6 15.7 7.6 12C7.6 8.3 9.2 4.8 12 2Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                      </svg>
                    </IconLink>

                    {/* LinkedIn icon */}
                    <IconLink
                      href="https://www.linkedin.com/in/reichental"
                      label="LinkedIn"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6C1.12 6 0 4.88 0 3.5C0 2.12 1.12 1 2.5 1C3.87 1 4.98 2.12 4.98 3.5ZM0.5 8H4.5V24H0.5V8ZM8 8H11.8V10.2H11.85C12.38 9.2 13.68 8.15 15.6 8.15C19.8 8.15 20.6 10.85 20.6 14.35V24H16.6V15.25C16.6 13.15 16.55 10.45 13.85 10.45C11.1 10.45 10.7 12.6 10.7 15.1V24H6.7V8H8Z" />
                      </svg>
                    </IconLink>

                    {/* Instagram icon */}
                    <IconLink
                      href="https://www.instagram.com/jreichental"
                      label="Instagram"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 2H17C20.314 2 22 3.686 22 7V17C22 20.314 20.314 22 17 22H7C3.686 22 2 20.314 2 17V7C2 3.686 3.686 2 7 2Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <path
                          d="M12 17C14.761 17 17 14.761 17 12C17 9.239 14.761 7 12 7C9.239 7 7 9.239 7 12C7 14.761 9.239 17 12 17Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <path
                          d="M18 6.5H18.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </IconLink>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
