// src/app/midsummer/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import EmailGate from "@/components/EmailGate";
import { WORKSHOPS } from "@/workshops";

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const w = WORKSHOPS[params.slug];
  if (!w) return {};

  const base = "https://midsummerlab.com";
  const url = `${base}/midsummer/${params.slug}`;
  const title = `${w.title} - Midsummer Workshops`;
  const description =
    "Spoken explorations + hands-on workshops to break perfectionism.";

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: `${base}/og-default.jpg` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${base}/og-default.jpg`],
    },
  };
}

export default function WorkshopLanding({ params }: { params: { slug: string } }) {
  const w = WORKSHOPS[params.slug];
  if (!w) return notFound();

  // If a per-workshop link exists, use it. Otherwise, go to the channel.
  const youtubeHref = w.youtube && w.youtube.trim().length > 0
    ? w.youtube
    : "https://www.youtube.com/watch?v=atXMleOvSu0";

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        <h1 className="text-3xl font-semibold">{w.title}</h1>

        <p className="text-zinc-300">
          Watch the conversation on{" "}
          <a
            href={youtubeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-zinc-100 text-zinc-200"
          >
            YouTube
          </a>{" "}
          - do the hands-on workshop here.
        </p>

        {/* Email step */}
        <section className="pt-2 space-y-3">
          <p className="text-sm text-zinc-400">
            Step 1 - confirm your email to open the workshop.
          </p>

          <div className="flex justify-center">
            <EmailGate slug={params.slug} tag={w.tag} />
          </div>
        </section>

        <div className="flex justify-center">
          <div className="text-zinc-600 select-none">------</div>
        </div>

        <div className="pt-1 flex justify-center">
          <Link
            href={`/midsummer/${params.slug}/workshop`}
            className="gs-btn gs-btn-5 text-zinc-100"
          >
            Already confirmed? Continue to workshop.
          </Link>
        </div>
      </div>
    </main>
  );
}
