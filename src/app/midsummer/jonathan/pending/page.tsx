export const metadata = {
  robots: { index: false, follow: false },
};

export default function Pending() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="text-5xl">📬</div>
        <h1 className="text-3xl font-semibold">Check your email</h1>
        <p className="text-zinc-300">
          We just sent a confirmation link. Click it to unlock the workshop.
        </p>

        <div className="rounded-2xl border border-zinc-700/60 p-5 text-left text-zinc-300">
          <p className="font-medium mb-2">If you don’t see it:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Look in <span className="font-medium">Spam</span> or <span className="font-medium">Promotions</span>.</li>
            <li>Give it up to a minute to arrive.</li>
            <li>Still nothing? Submit your email again.</li>
          </ul>
        </div>

        <a
          href="/midsummer/jonathan"
          className="inline-block mt-2 text-sm text-zinc-400 hover:text-zinc-200 underline underline-offset-4"
        >
          Go back to the form
        </a>
      </div>
    </main>
  );
}
