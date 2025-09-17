"use client";

type Props = {
  slug: string;   // e.g., "jonathan"
  tag: string;    // e.g., "Midsummer-Jonathan"
};

export default function EmailGate({ slug, tag }: Props) {
  function rememberEmail() {
    try {
      const input = document.getElementById("bd-email") as HTMLInputElement | null;
      if (input?.value) localStorage.setItem(`ms_${slug}_email`, input.value);
      localStorage.setItem(`ms_${slug}_status`, "pending");
    } catch {}
  }

  // Use absolute URL for Buttondown redirect (works in prod)
  const redirectUrl = `https://midsummerlab.com/midsummer/${slug}/pending`;

  return (
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/midsummer"
      method="post"
      onSubmit={rememberEmail}
      className="mt-4 flex gap-2 items-center"
    >
      <label htmlFor="bd-email" className="sr-only">Enter your email</label>
      <input
        type="email"
        name="email"
        id="bd-email"
        required
        placeholder="you@domain.com"
        autoComplete="email"
        className="w-full max-w-sm px-4 py-2 rounded-md bg-white text-black placeholder:text-zinc-500"
      />
      <input type="hidden" name="tag" value={tag} />
      <input type="hidden" name="redirect_url" value={redirectUrl} />
      <button className="px-4 py-2 rounded-md border border-zinc-500 hover:bg-zinc-100 hover:text-black transition">
        Get the workshop
      </button>
    </form>
  );
}
