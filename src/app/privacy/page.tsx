export default function Privacy() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-semibold">Privacy</h1>
        <p className="text-zinc-300">
          We collect email addresses via Buttondown to send workshop updates. You can
          unsubscribe anytime via the link in each email.
        </p>
        <p className="text-zinc-300">
          We use Vercel Web Analytics and Speed Insights, which are cookie-less and do not
          store personally identifiable information. We also keep minimal server logs to
          keep the site reliable and secure.
        </p>
        <p className="text-zinc-300">
          Questions? Email <a className="underline" href="mailto:hey@midsummerlab.com">hey@midsummerlab.com</a>.
        </p>
      </div>
    </main>
  );
}
