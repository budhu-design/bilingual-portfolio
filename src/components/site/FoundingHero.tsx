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

// Three solid, clearly-stepped layers (not a tight cluster of 1-2px shadows
// that just blurs together at huge font sizes) plus one soft grounding
// shadow — reads as a crisp extruded edge, not a haze.
const DEPTH_TEXT_SHADOW = [
  "3px 4px 0 rgba(178,155,95,1)",
  "6px 8px 0 rgba(150,128,72,0.9)",
  "9px 12px 0 rgba(120,98,50,0.8)",
  "12px 16px 22px rgba(0,0,0,0.45)",
].join(", ");

/**
 * The title gets its own section — full-width, generously padded, set in
 * Hind (a real clean Devanagari sans at Regular weight; "Lini Regular"
 * isn't a real distinct font) — rather than being squeezed into the photo
 * overlay. It still tracks the hero's overall scroll progress for a subtle
 * recede-as-you-scroll depth cue, just from its own dedicated space.
 */
export function FoundingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const photoY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 90]);
  const photoScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60]);
  const titleScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0.94]);
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -30]);

  return (
    <div ref={ref} className="relative overflow-hidden bg-black text-[#F2E8D5]">
      <div className="flex items-center border-b-4 border-black bg-black px-6 py-2.5 sm:px-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={FLAG_URL} alt="Flag of the Rashtriya Swayamsevak Sangh" className="h-6 w-auto sm:h-7" />
      </div>

      <motion.div style={{ y: titleY, scale: titleScale }} className="relative z-10 px-6 py-16 text-center sm:px-10 sm:py-24">
        <h1
          style={{ textShadow: reduced ? "none" : DEPTH_TEXT_SHADOW, fontFamily: "var(--font-hind)" }}
          className="text-[16vw] font-normal leading-[1.08] sm:text-[10vw]"
        >
          राष्ट्रीय स्वयंसेवक संघ
        </h1>
      </motion.div>

      <div className="relative h-[68vh] min-h-[440px] max-h-[680px] overflow-hidden">
        <motion.img
          src={FOUNDING_PHOTO_URL}
          alt="The building on the Mohitewada grounds in Nagpur where the organisation's first meeting took place"
          style={{ y: photoY, scale: photoScale }}
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/55" />

        <motion.div style={{ y: textY }} className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 sm:px-10">
          <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "#B29B5F" }}>
            <ScrambleText en="Mohitewada, Nagpur — where it began" hi="मोहितेवाड़ा, नागपुर — जहाँ से आरंभ हुआ" />
          </p>
          <p className="mt-3 text-2xl font-semibold leading-[1.1] sm:text-4xl" style={{ fontFamily: "var(--font-rozha)" }}>
            <ScrambleText en="A hundred years of Seva" hi="सेवा के सौ वर्ष" />
          </p>
        </motion.div>
      </div>

      <div className="border-t-4 border-black bg-black px-6 py-2.5 text-[11px] text-white/45 sm:px-10">
        Photo: Wikimedia Commons (CC0, uploaded by Katyare) — the organisation&apos;s main office building on the
        grounds where its first meeting took place, Nagpur.
      </div>
    </div>
  );
}
