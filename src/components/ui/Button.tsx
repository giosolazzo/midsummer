import Link from "next/link";
import clsx from "clsx";

type Props = {
  as?: "button" | "a" | "link";
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
};

export default function Button({
  as = "button",
  href = "#",
  children,
  variant = "primary",
  className,
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-pill px-5 py-2 text-sm transition-colors duration-200";

  const styles = {
    primary: "bg-[--color-navy] text-white hover:opacity-90",
    secondary:
      "border border-[--color-navy] text-[--color-navy] bg-transparent hover:bg-[--color-navy] hover:text-white",
    tertiary: "underline underline-offset-4 text-[--color-navy] hover:opacity-80",
  }[variant];

  const classes = clsx(base, styles, className);

  if (as === "link") return <Link href={href} className={classes}>{children}</Link>;
  if (as === "a") return <a href={href} className={classes}>{children}</a>;
  return <button className={classes}>{children}</button>;
}
