"use client";

type Props = {
  slug: string;       // e.g., "jonathan"
  tag: string;        // e.g., "Midsummer-Jonathan"
};

export default function EmailGate({ slug, tag }: Props) {
  // Buttondown endpoint for your publication
  const ACTION = "https://buttondown.email/api/emails/embed-subscribe/midsummer";
  // Where Buttondown should send unconfirmed users right after submit
  const REDIRECT = `https://midsummerlab.com/midsummer/${slug}/pending`;

  return (
    <form
      action={ACTION}
      method="post"
      className="flex gap-2 items-center"
      onSubmit={() => {
        // Remember the last signup path so /confirm can route correctly
        try { localStorage.setItem("ms_last_signup", `midsummer:${slug}`); } catch {}
      }}
    >
      <label htmlFor="bd-email" className="sr-only">Enter your email</label>
      <input
        id="bd-email"
        name="email"
        type="email"
        required
        placeholder="you@domain.com"
        className="w-full max-w-sm px-4 py-2 rounded-md bg-white text-black placeholder:text-zinc-500"
      />
      {/* Tag the subscriber so you know which workshop they wanted */}
      <input type="hidden" name="tag" value={tag} />
      {/* After submit, Buttondown sends them to the pending page */}
      <input type="hidden" name="redirect_url" value={REDIRECT} />

      <button className="gs-btn gs-btn-5 text-zinc-100" type="submit">
        Get the workshop
      </button>
    </form>
  );
}
