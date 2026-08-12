"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrambleText } from "@/components/anim-kit";
import { usePrefersReducedMotion } from "@/components/anim-kit/useReducedMotion";

// Sourced from Wikimedia Commons via the stable Special:FilePath redirect
// (resolved + license-checked before use).
const FLAG_URL = "https://upload.wikimedia.org/wikipedia/commons/2/2d/Flag_of_the_Rashtriya_Swayamsevak_Sangh.svg";
const FOUNDING_PHOTO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/6/6f/%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A5%80%E0%A4%AF_%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%AF%E0%A4%82%E0%A4%B8%E0%A5%87%E0%A4%B5%E0%A4%95_%E0%A4%B8%E0%A4%82%E0%A4%98_main_office_where_first_meeting_took_place.JPG";

// Three clearly-stepped layers plus one grounding shadow — crisp extruded
// edge, not a haze, even with a semi-transparent fill on top.
const DEPTH_TEXT_SHADOW = [
  "3px 4px 0 rgba(178,155,95,0.9)",
  "6px 8px 0 rgba(150,128,72,0.75)",
  "9px 12px 0 rgba(120,98,50,0.6)",
  "12px 16px 22px rgba(0,0,0,0.4)",
].join(", ");

/**
 * No black bars — the flag is a small unobtrusive corner mark, the title
 * sits centred directly over the photo in the user-supplied Aditi Normal
 * font with a translucent fill (the depth shadow still shows through,
 * giving it a "cut into the photo" quality rather than a flat overlay).
 */
export function FoundingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const photoY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 90]);
  const photoScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -50]);
  const titleScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0.94]);
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -30]);

  return (
    <div ref={ref} className="relative overflow-hidden bg-black text-[#F2E8D5]">
      <div className="relative h-[86vh] min-h-[560px] max-h-[820px] overflow-hidden">
        <motion.img
          src={FOUNDING_PHOTO_URL}
          alt="The building on the Mohitewada grounds in Nagpur where the organisation's first meeting took place"
          style={{ y: photoY, scale: photoScale }}
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FLAG_URL}
          alt="Flag of the Rashtriya Swayamsevak Sangh"
          className="absolute left-6 top-6 h-6 w-auto drop-shadow-lg sm:left-10 sm:top-8 sm:h-8"
        />

        <motion.div
          style={{ y: titleY, scale: titleScale }}
          className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-6 text-center sm:px-10"
        >
          <h1
            style={{ textShadow: reduced ? "none" : DEPTH_TEXT_SHADOW, fontFamily: "var(--font-aditi)" }}
            className="text-[13vw] font-bold leading-[1.08] text-[#F2E8D5] sm:text-[8vw]"
          >
            राष्ट्रीय स्वयंसेवक संघ
          </h1>
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 sm:px-10">
          <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "#B29B5F" }}>
            <ScrambleText en="Mohitewada, Nagpur — where it began" hi="मोहितेवाड़ा, नागपुर — जहाँ से आरंभ हुआ" />
          </p>
          <p className="mt-3 text-2xl font-semibold leading-[1.1] sm:text-4xl" style={{ fontFamily: "var(--font-rozha)" }}>
            <ScrambleText en="A hundred years of Seva" hi="सेवा के सौ वर्ष" />
          </p>
          <p className="mt-6 text-[10px] text-white/40">
            Photo: Wikimedia Commons (CC0, uploaded by Katyare) — the organisation&apos;s main office building on the
            grounds where its first meeting took place, Nagpur.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
