import Image from "next/image";
import Link from "next/link";

export default function MidsummerHome() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <style>{`
        :root { --ms-radius: 24px; }

        .hero-wrap {
          position: relative;
          border-radius: var(--ms-radius);
        }

        /* This is the actual image box */
        .hero-surface {
          position: relative;
          border-radius: var(--ms-radius);
          overflow: hidden;
          background: #000;
          transition: transform 220ms ease;
        }

        .hero-wrap:hover .hero-surface {
          transform: translateY(-2px);
        }

        /* SNAKE sits OUTSIDE the image surface */
        .snake-svg {
          position: absolute;
          inset: -2px;                         /* hug the box */
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          pointer-events: none;
          border-radius: calc(var(--ms-radius) + 2px);
          overflow: visible;
        }

        /* The rect matches the same radius in px (no viewBox = no distortion) */
        .snake-rect {
          rx: calc(var(--ms-radius) + 2px);
          ry: calc(var(--ms-radius) + 2px);
        }

        /* One long moving segment + one long gap (single “snake”) */
        .snake {
          fill: none;
          stroke: rgba(244,244,245,0.85);
          stroke-width: 0.55;                  /* thinner */
          stroke-linecap: round;
          stroke-linejoin: round;
          vector-effect: non-scaling-stroke;

          /* Normalize path to 1.0, then: one segment + one gap */
          stroke-dasharray: 0.22 0.78;

          /* slower + smooth */
          animation: snakeMove 12s linear infinite;

          filter: drop-shadow(0 0 10px rgba(244,244,245,0.10));
          shape-rendering: geometricPrecision;
        }

        @keyframes snakeMove {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -1; }
        }

        /* Jonathan card: same “button-5” vibe on hover */
        .workshop-card {
          position: relative;
          border: 1px solid rgba(63, 63, 70, 0.70);
          border-radius: var(--radius-lg);
          transition: all 900ms cubic-bezier(0.19, 1, 0.22, 1);
          outline: 1px solid rgba(244, 244, 245, 0.22);
          outline-offset: 0px;
          box-shadow: inset 0 0 20px rgba(244, 244, 245, 0);
        }
        .workshop-card:hover {
          border-color: rgba(244, 244, 245, 0.30);
          box-shadow:
            inset 0 0 20px rgba(244, 244, 245, 0.25),
            0 0 18px rgba(244, 244, 245, 0.10);
          outline-color: rgba(244, 244, 245, 0);
          outline-offset: 10px;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-wrap:hover .hero-surface { transform: none !important; }
          .snake { animation: none !important; }
          .workshop-card,
          .workshop-card:hover { transition: none !important; }
        }
      `}</style>

      {/* HERO */}
      <section className="px-1 sm:px-3 pt-6 sm:pt-8">
        <div className="mx-auto max-w-[92rem]">
          <div className="hero-wrap">
            <div className="hero-surface">
              <div className="relative h-[520px] sm:h-[620px]">
                <Image src="/hero.jpg" alt="" fill priority className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-black/85" />

                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <div className="max-w-3xl text-center">
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight">
                      Midsummer Lab
                    </h1>

                    <p className="mt-4 text-base sm:text-xl text-zinc-200">
                      Borrow the tools. See what shifts.
                    </p>

                    <div className="mt-10 flex justify-center">
                      <a href="#catalog" className="gs-btn gs-btn-5 text-zinc-100">
                        Begin
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SNAKE BORDER (single long segment, hugs corners, outside the image) */}
            <svg className="snake-svg" aria-hidden="true">
              <rect
                className="snake-rect snake"
                x="0"
                y="0"
                width="100%"
                height="100%"
                pathLength="1"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="px-4 sm:px-8 py-14">
        <div className="mx-auto max-w-5xl space-y-8">
          <header className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-100">
              Workshops
            </h2>
            <p className="text-zinc-400">
              Tools for the postponed life.
            </p>
          </header>

          <div className="grid gap-4">
            <Link
              href="/midsummer/jonathan"
              className="workshop-card bg-black p-5 block"
            >
              <p className="text-sm text-zinc-400">MS01 - May 2025</p>
              <h3 className="mt-1 text-xl sm:text-2xl font-medium text-zinc-100">
                A different version of you
              </h3>
              <p className="mt-2 text-sm sm:text-base text-zinc-400">
                Jonathan Reichental, PhD
              </p>
            </Link>

            <div className="rounded-[var(--radius-lg)] border border-zinc-800 bg-black p-5">
              <p className="text-zinc-300">Next guest - coming soon</p>
            </div>
          </div>

          {/* Subscribe (button wraps text) */}
          <div className="pt-4">
            <div className="mx-auto max-w-md text-center space-y-3">
              <p className="text-sm text-zinc-400">Get workshops by email</p>

              <form
                action="https://buttondown.email/api/emails/embed-subscribe/midsummer"
                method="post"
                className="flex flex-col gap-3 items-center"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@domain.com"
                  className="w-full px-4 py-2 rounded-md bg-zinc-950 text-zinc-100 placeholder:text-zinc-600 border border-zinc-800"
                />

                <button className="gs-btn gs-btn-5" type="submit">
                  Subscribe to Midsummer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
