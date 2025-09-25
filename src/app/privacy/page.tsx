// src/app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Midsummer handles analytics and email signups (simple, cookieless).",
};

const UPDATED = "2025-09-25";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-semibold">Privacy</h1>
          <p className="text-zinc-400 text-sm">Last updated: {UPDATED}</p>
        </header>

        <section className="space-y-3 text-zinc-200">
          <h2 className="text-xl font-medium">What we collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Cookieless analytics.</span> We use
              Vercel Web Analytics and Speed Insights to see page views, country,
              referrer, device type, and performance metrics. These tools do{" "}
              <span className="font-medium">not</span> use tracking cookies or
              store personal profiles.
            </li>
            <li>
              <span className="font-medium">Server logs.</span> Our hosting
              provider (Vercel) keeps short-lived logs for reliability and abuse
              prevention (e.g., IP address, request URL).
            </li>
            <li>
              <span className="font-medium">Email addresses.</span> If you
              subscribe to a workshop or the list, your email is stored at
              Buttondown (our email provider). We tag subscriptions (e.g.,
              which workshop) so we can send the right follow-ups.
            </li>
          </ul>
        </section>

        <section className="space-y-3 text-zinc-200">
          <h2 className="text-xl font-medium">What we don’t do</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>No ad tech, no cross-site tracking, no third-party cookies.</li>
            <li>No selling of personal data.</li>
          </ul>
        </section>

        <section className="space-y-3 text-zinc-200">
          <h2 className="text-xl font-medium">Email choices</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Every email includes an Unsubscribe link that works instantly.</li>
            <li>
              To delete your data entirely, email{" "}
              <a className="underline" href="mailto:hey@midsummerlab.com">
                hey@midsummerlab.com
              </a>{" "}
              from the address you used.
            </li>
          </ul>
        </section>

        <section className="space-y-3 text-zinc-200">
          <h2 className="text-xl font-medium">Processors we use</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Vercel</span> (hosting, cookieless
              analytics, performance).
            </li>
            <li>
              <span className="font-medium">Buttondown</span> (email storage &
              delivery; uses Mailgun to send).
            </li>
          </ul>
        </section>

        <section className="space-y-3 text-zinc-200">
          <h2 className="text-xl font-medium">Legal basics</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Lawful basis for email is{" "}
              <span className="font-medium">consent</span> (you opt in),
              withdrawable at any time.
            </li>
            <li>
              Lawful basis for analytics is{" "}
              <span className="font-medium">legitimate interests</span> (basic
              product metrics, no profiling).
            </li>
          </ul>
        </section>

        <section className="space-y-2 text-zinc-200">
          <h2 className="text-xl font-medium">Contact</h2>
          <p>
            Questions?{" "}
            <a className="underline" href="mailto:hey@midsummerlab.com">
              hey@midsummerlab.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
