import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // NOTE: one level up from /midsummer
import { Analytics } from "@vercel/analytics/react";
import SiteHeader from "@/components/SiteHeader";   // ← UNCOMMENTED
import SiteFooter from "@/components/SiteFooter";

// --- SEO base ---
const isProd = process.env.NODE_ENV === "production";
const site = isProd ? "https://midsummerlab.com" : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Midsummer", template: "%s · Midsummer" },
  description: "Spoken explorations + hands-on workshops to break perfectionism.",
  openGraph: {
    type: "website",
    url: site,
    title: "Midsummer",
    description: "Spoken explorations + hands-on workshops to break perfectionism.",
    siteName: "Midsummer",
  },
  twitter: { card: "summary_large_image" },
};

// --- Fonts ---
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// --- Layout with <body> ---
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SiteHeader />                     {/* ← ADDED */}
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
