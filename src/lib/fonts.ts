import {
  Rozha_One,
  Spectral,
  Tiro_Devanagari_Hindi,
  EB_Garamond,
  Vesper_Libre,
  Cormorant,
  Space_Grotesk,
  IBM_Plex_Mono,
  Fraunces,
  Amita,
  Newsreader,
  Noto_Sans_Devanagari,
  Kalam,
  Caveat,
  Hind,
} from "next/font/google";

// Direction 1A — Sangh Smriti (Home, Contact)
// "Jaini" (the mockup's spec'd Hindi display face) isn't in this Next.js
// version's Google Fonts snapshot — substituting Noto Sans Devanagari per
// the plan's own fallback instruction; see notoDevanagari below.
export const rozhaOne = Rozha_One({ subsets: ["latin"], weight: "400", variable: "--font-rozha" });
export const spectral = Spectral({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-spectral" });
// Hind — a real, clean Devanagari sans (closest match to the requested
// "Lini Regular", which isn't a real distinct font). Used for the large
// home-hero title specifically.
export const hind = Hind({ subsets: ["devanagari", "latin"], weight: "400", variable: "--font-hind" });

// Direction 1B — Classical Library (About/History)
export const tiroDevanagari = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-tiro",
});
export const ebGaramond = EB_Garamond({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-garamond" });

// Direction 1C — Letterpress Elegance (Achievements)
export const vesperLibre = Vesper_Libre({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-vesper" });
export const cormorant = Cormorant({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-cormorant" });

// Direction 1D — Field Ledger (Gallery)
export const kalam = Kalam({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-kalam" });
export const caveat = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-caveat" });

// Direction 2 — Modern Civic-Tech (Organisational Structure, Sangh Parivar)
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
});
export const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

// Direction 3 — Editorial Magazine (News & Events)
export const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-fraunces" });
export const amita = Amita({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-amita" });
export const newsreader = Newsreader({ subsets: ["latin"], style: ["italic"], variable: "--font-newsreader" });

// Fallback Devanagari for headings where a named paid font isn't licensed —
// per RSS_Website_Plan_and_Prompts.md's own instruction to substitute and note it.
export const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "700"],
  variable: "--font-noto-devanagari",
});
