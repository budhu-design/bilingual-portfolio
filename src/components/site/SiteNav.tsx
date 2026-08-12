"use client";

import Link from "next/link";
import { LanguageSwitch } from "@/components/anim-kit/LanguageSwitch";
import { ScrambleText } from "@/components/anim-kit/ScrambleText";
import { ScrollProgress } from "./ScrollProgress";

const LINKS = [
  { href: "/", en: "Home", hi: "मुख्य" },
  { href: "/about", en: "About", hi: "परिचय" },
  { href: "/organisation", en: "Organisation", hi: "संगठन" },
  { href: "/sangh-parivar", en: "Sangh Parivar", hi: "संघ परिवार" },
  { href: "/achievements", en: "Achievements", hi: "उपलब्धियाँ" },
  { href: "/gallery", en: "Gallery", hi: "गैलरी" },
  { href: "/news", en: "News", hi: "समाचार" },
  { href: "/contact", en: "Find a Shakha", hi: "शाखा खोजें" },
];

/**
 * Persistent chrome across every page — kept visually neutral (dark
 * ink/gold, same as the members portal) on purpose while each page's own
 * hero/body switches typographic "direction". Consistent nav = the site
 * still feels like one place even as content sections vary in tone.
 *
 * Uses next/link (client-side transitions) rather than plain <a> tags —
 * that's not just perf, it's what keeps LanguageProvider (which lives in
 * the root layout, above every page) mounted across navigation instead of
 * remounting and flashing back to English before restoring Hindi.
 */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0d0d10]/90 backdrop-blur relative">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <Link href="/" className="shrink-0 text-base font-semibold tracking-wide text-[#f6f3ec]">
          आरएसएस · RSS
        </Link>
        <nav className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-1 overflow-x-auto text-sm text-[#f6f3ec]/60">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="group relative whitespace-nowrap py-1 transition-colors hover:text-[#c8a24e]">
              <ScrambleText en={l.en} hi={l.hi} />
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#c8a24e] transition-transform duration-200 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/portal"
            className="hidden whitespace-nowrap rounded-full border border-white/15 px-3 py-1.5 text-sm text-[#f6f3ec]/80 transition-colors hover:border-[#c8a24e]/50 hover:text-[#c8a24e] sm:block"
          >
            <ScrambleText en="Members Portal" hi="सदस्य पोर्टल" />
          </Link>
          <LanguageSwitch />
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
