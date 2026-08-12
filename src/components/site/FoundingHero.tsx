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

// A stacked, offset text-shadow — each layer a touch darker/further —
// reads as an extruded/3D title rather than flat type. Cheap, no images.
const DEPTH_TEXT_SHADOW = [
  "1px 1px 0 rgba(178,155,95,0.9)",
  "2px 2px 0 rgba(160,138,80,0.8)",
  "3px 3px 0 rgba(140,118,64,0.7)",
  "4px 4px 0 rgba(120,98,50,0.6)",
  "5px 5px 0 rgba(100,80,38,0.5)",
  "8px 10px 18px rgba(0,0,0,0.55)",
].join(", ");

/**
 * Bold masthead treatment: a thin black bar carries just the flag icon;
 * the real branding moment is the large Devanagari title over the photo,
 * given a layered-shadow "extrusion" for depth plus its own scroll parallax
 * (moving/scaling at a different rate than the photo beneath it — that
 * separation, not a watermark, is what reads as depth).
 */
export function FoundingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const photoY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 90]);
  const photoScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -70]);
  const titleScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0.92]);
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -30]);

  return (
    <div ref={ref} className="relative overflow-hidden bg-black text-[#F2E8D5]">
      <div className="flex items-center border-b-4 border-black bg-black px-6 py-2.5 sm:px-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={FLAG_URL} alt="Flag of the Rashtriya Swayamsevak Sangh" className="h-6 w-auto sm:h-7" />
      </div>

      <div className="relative h-[80vh] min-h-[560px] max-h-[820px] overflow-hidden">
        <motion.img
          src={FOUNDING_PHOTO_URL}
          alt="The building on the Mohitewada grounds in Nagpur where the organisation's first meeting took place"
          style={{ y: photoY, scale: photoScale }}
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/55" />

        <motion.h1
          style={{ y: titleY, scale: titleScale, textShadow: reduced ? "none" : DEPTH_TEXT_SHADOW }}
          className="relative z-10 mt-10 px-6 text-center text-[12vw] font-bold leading-[1.05] text-[#F2E8D5] sm:mt-14 sm:px-10 sm:text-[6.5vw]"
        >
          <span style={{ fontFamily: "var(--font-noto-devanagari)" }}>राष्ट्रीय स्वयंसेवक संघ</span>
        </motion.h1>

        <motion.div style={{ y: textY }} className="relative z-10 flex h-[36%] flex-col justify-end px-6 pb-14 sm:px-10">
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
