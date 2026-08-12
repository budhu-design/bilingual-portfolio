"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrambleText } from "@/components/anim-kit";
import { usePrefersReducedMotion } from "@/components/anim-kit/useReducedMotion";

// Both sourced from Wikimedia Commons via the stable Special:FilePath
// redirect (resolved + license-checked before use).
const FLAG_URL = "https://upload.wikimedia.org/wikipedia/commons/2/2d/Flag_of_the_Rashtriya_Swayamsevak_Sangh.svg";
const FOUNDING_PHOTO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/6/6f/%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A5%80%E0%A4%AF_%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%AF%E0%A4%82%E0%A4%B8%E0%A5%87%E0%A4%B5%E0%A4%95_%E0%A4%B8%E0%A4%82%E0%A4%98_main_office_where_first_meeting_took_place.JPG";

/**
 * Bold masthead treatment: black bars frame the wordmark (Noto Sans
 * Devanagari substituting for the specified "Vilom Devanagari", which
 * isn't in this Next.js version's font catalog) and the flag icon. The
 * photo below has its own scroll-linked parallax (y + scale) for depth.
 * A full-bleed flag layer over the photo was tried and dropped — at any
 * opacity it read as a solid orange block rather than a subtle watermark.
 */
export function FoundingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const photoY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 90]);
  const photoScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.1, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -30]);

  return (
    <div ref={ref} className="relative overflow-hidden bg-black text-[#F2E8D5]">
      <div className="flex items-center gap-3 border-b-4 border-black bg-black px-6 py-3 sm:px-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={FLAG_URL} alt="Flag of the Rashtriya Swayamsevak Sangh" className="h-7 w-auto sm:h-9" />
        <span className="text-lg font-bold tracking-wide sm:text-2xl" style={{ fontFamily: "var(--font-noto-devanagari)" }}>
          राष्ट्रीय स्वयंसेवक संघ
        </span>
      </div>

      <div className="relative h-[76vh] min-h-[520px] max-h-[760px] overflow-hidden">
        <motion.img
          src={FOUNDING_PHOTO_URL}
          alt="The building on the Mohitewada grounds in Nagpur where the organisation's first meeting took place"
          style={{ y: photoY, scale: photoScale }}
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/45" />

        <motion.div style={{ y: textY }} className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 sm:px-10">
          <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "#B29B5F" }}>
            <ScrambleText en="Mohitewada, Nagpur — where it began" hi="मोहितेवाड़ा, नागपुर — जहाँ से आरंभ हुआ" />
          </p>
          <h1 className="mt-3 text-5xl font-bold leading-[1.05] sm:text-7xl" style={{ fontFamily: "var(--font-rozha)" }}>
            <ScrambleText en="A hundred years of Seva" hi="सेवा के सौ वर्ष" />
          </h1>
        </motion.div>
      </div>

      <div className="border-t-4 border-black bg-black px-6 py-2.5 text-[11px] text-white/45 sm:px-10">
        Photo: Wikimedia Commons (CC0, uploaded by Katyare) — the organisation&apos;s main office building on the
        grounds where its first meeting took place, Nagpur.
      </div>
    </div>
  );
}
