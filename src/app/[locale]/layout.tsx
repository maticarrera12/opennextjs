import "../globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { AppProviders } from "../../../app-provider";
import { loadMessages } from "@/lib/load-messages";
import MessagesProvider from "@/providers/message-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "OpenNextJS",
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
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "OpenNextJS",
      images: ["https://www.opennextjs.com/og-image.png"],
      site: "@opennextjs",
    },
  };
}

export default async function LocaleLayout({ children, params }: any) {
  const { locale } = params;

  const messages = await loadMessages(locale);

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MessagesProvider locale={locale} messages={messages}>
          <AppProviders>
            {children}
            <Toaster position="top-right" richColors />
            <Analytics />
            <SpeedInsights />
          </AppProviders>
        </MessagesProvider>
      </body>
    </html>
  );
}
