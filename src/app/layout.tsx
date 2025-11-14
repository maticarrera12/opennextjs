import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenNextJS",
  description: "Free open source NextJS SaaS Starter Kit",
  openGraph: {
    title: "OpenNextJS",
    url: "https://www.opennextjs.com",
    siteName: "OpenNextJS",
    images: [
      {
        url: "https://www.opennextjs.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenNextJS Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenNextJS",
    images: ["https://www.opennextjs.com/og-image.png"],
    site: "opennextjs.com",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
