export const metadata = {
  title: {
    default: "Midsummer Workshops",
    template: "%s • Midsummer",
  },
  description: "Spoken explorations + hands-on workshops to break perfectionism.",
  metadataBase: new URL("https://midsummerlab.com"),
  openGraph: {
    url: "https://midsummerlab.com/midsummer",
    siteName: "Midsummer",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
