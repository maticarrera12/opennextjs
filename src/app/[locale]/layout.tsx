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

export const metadata: Metadata = {
  title: "Open Next",
  description: "Free open source NextJS SaaS Starter Kit",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  twitter: {
    card: "summary_large_image",
    title: "OpenNextJS",
    description: "Free open source NextJS SaaS Starter Kit",
    images: ["/og-image.png"],
    creator: "@mcarreradev",
    site: "mcarreradev.com",
  },
};

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
