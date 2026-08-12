import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/components/anim-kit/kit.css";
import { LanguageProvider } from "@/components/anim-kit";
import { SiteNav } from "@/components/site/SiteNav";
import {
  rozhaOne,
  spectral,
  tiroDevanagari,
  ebGaramond,
  vesperLibre,
  cormorant,
  kalam,
  caveat,
  spaceGrotesk,
  plexMono,
  fraunces,
  amita,
  newsreader,
  notoDevanagari,
} from "@/lib/fonts";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rashtriya Swayamsevak Sangh — बिलिंगुअल पोर्टफोलियो",
  description:
    "A bilingual (English/Hindi) informational site about the RSS: history, organisational structure, affiliated organisations, documented social work, and a volunteer members portal.",
};

const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  rozhaOne.variable,
  spectral.variable,
  tiroDevanagari.variable,
  ebGaramond.variable,
  vesperLibre.variable,
  cormorant.variable,
  kalam.variable,
  caveat.variable,
  spaceGrotesk.variable,
  plexMono.variable,
  fraunces.variable,
  amita.variable,
  newsreader.variable,
  notoDevanagari.variable,
].join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontVariables} anim-kit antialiased`}>
        <LanguageProvider>
          <SiteNav />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
