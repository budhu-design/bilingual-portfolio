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
  hind,
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
// User-supplied font pack for the home-hero title specifically.
const aditi = localFont({
  src: "./fonts/A_Aditi_Normal.ttf",
  variable: "--font-aditi",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Rashtriya Swayamsevak Sangh — बिलिंगुअल पोर्टफोलियो",
  description:
    "A bilingual (English/Hindi) informational site about the RSS: history, organisational structure, affiliated organisations, documented social work, and a volunteer members portal.",
};

const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  aditi.variable,
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
  hind.variable,
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
