// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-14">
      <div className="max-w-xl mx-auto text-center space-y-4">
        <h1 className="text-3xl font-semibold">404</h1>
        <p className="text-zinc-300">This page could not be found.</p>

        {/* Use Link for internal routes */}
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded-md border border-zinc-600 hover:bg-zinc-100 hover:text-black transition"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
