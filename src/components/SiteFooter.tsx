export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 text-zinc-400 text-xs">
      <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Giuseppe Solazzo</p>
        <a href="/privacy" className="hover:text-white">Privacy</a>
      </div>
    </footer>
  );
}
