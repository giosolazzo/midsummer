import { notFound } from "next/navigation";
import Link from "next/link";
import EmailGate from "@/components/EmailGate";
import { WORKSHOPS } from "@/workshops";

export default function WorkshopLanding({ params }: { params: { slug: string } }) {
  const w = WORKSHOPS[params.slug];
  if (!w) return notFound();

  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">{w.title}</h1>
        <p className="text-zinc-300">
          Watch the conversation on YouTube, then get the hands-on workshop here.
        </p>

        <ul className="list-disc pl-6 text-zinc-300">
          <li>Video workshop (10–20+ min)</li>
          <li>1-page worksheet</li>
          <li>A 15-minute action you’ll finish today</li>
        </ul>

        <EmailGate slug={params.slug} tag={w.tag} />

        <p className="text-xs text-zinc-500">
          Already confirmed on this browser?{" "}
          <Link
            href={`/midsummer/${params.slug}/pending`}
            className="underline underline-offset-4"
          >
            Check & continue
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
