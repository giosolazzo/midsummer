export default function JonathanLanding() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">Do the guided workshop</h1>
        <p className="text-zinc-300">
          Watch the conversation on YouTube, then get the hands-on workshop here.
        </p>

        <ul className="list-disc pl-6 text-zinc-300">
          <li>Video workshop (10–20 min)</li>
          <li>1-page worksheet</li>
          <li>A 15-minute action you’ll finish today</li>
        </ul>

        {/* TEMP: simple test form that navigates to the workshop page.
            We'll replace this with Buttondown/MailerLite later. */}
        <form action="/midsummer/jonathan/workshop" method="get" className="space-x-2">
          <input
            type="email"
            name="email"
            placeholder="you@domain.com"
            required
            className="px-4 py-2 rounded-md text-black"
          />
          <button className="px-4 py-2 rounded-md border border-zinc-500 hover:bg-zinc-100 hover:text-black transition">
            Get the workshop
          </button>
        </form>

        <p className="text-xs text-zinc-500">No spam. Unsubscribe anytime.</p>
      </div>
    </main>
  );
}
