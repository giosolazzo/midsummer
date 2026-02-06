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
  // Use Giuseppe-style buttons as the base everywhere
  const base = "gs-btn gs-btn-5";

  // Keep variants lightweight (mostly spacing / disabled look)
  const styles = {
    primary: "",
    secondary: "",
    tertiary: "underline underline-offset-4 border-transparent outline-none shadow-none hover:opacity-80",
  }[variant];

  const classes = clsx(base, styles, className);

  if (as === "link") return <Link href={href} className={classes}>{children}</Link>;
  if (as === "a") return <a href={href} className={classes}>{children}</a>;
  return <button className={classes}>{children}</button>;
}
