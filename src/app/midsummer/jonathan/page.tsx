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
<form
  action="https://buttondown.com/api/emails/embed-subscribe/midsummer"
  method="post"
  className="space-x-2"
>
  <label htmlFor="bd-email" className="sr-only">Enter your email</label>
  <input
    type="email"
    name="email"
    id="bd-email"
    placeholder="you@domain.com"
    required
    className="px-4 py-2 rounded-md text-black"
  />

  {/* Tag this subscriber so you know which workshop they wanted */}
  <input type="hidden" name="tag" value="Midsummer-Jonathan" />

  {/* After subscribing, send them straight to the workshop page */}
  <input
    type="hidden"
    name="redirect_url"
    value="https://midsummerlab.com/midsummer/jonathan/workshop"
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
