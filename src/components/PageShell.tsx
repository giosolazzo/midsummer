import type { ReactNode } from "react";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[--color-bg] text-[--color-fg]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-10">
        {children}
      </div>
    </main>
  );
}
