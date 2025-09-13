export default function MidsummerHub() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-10">
      <h1 className="text-3xl sm:text-5xl font-semibold text-center">Midsummer Workshops — v2</h1>

      <div className="max-w-3xl mx-auto mt-10 space-y-6">
        <a
          href="/midsummer/jonathan"
          className="block rounded-2xl border border-zinc-700/60 p-6 hover:bg-zinc-900 transition"
        >
          <div className="text-lg font-medium">Jonathan — Workshop</div>
          <div className="text-sm text-zinc-400">Turn [X] into [Y] in 15 minutes.</div>
        </a>
      </div>
    </main>
  );
}