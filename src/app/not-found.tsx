export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 grid place-items-center p-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="text-zinc-400">Let’s get you back.</p>
        <a className="underline underline-offset-4" href="/">Go home</a>
      </div>
    </main>
  );
}
