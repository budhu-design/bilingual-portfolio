"use client";

import { Reveal, ScrambleText, TiltCard } from "@/components/anim-kit";
import { DIRECTIONS } from "@/lib/directions";

// All sourced from Wikimedia Commons via the stable Special:FilePath
// redirect, resolved and license-checked before use (see git history for
// the verification pass). Only leaders with an actually-findable Commons
// photo are included — no stand-ins.
const PORTRAITS = [
  {
    name: "K. B. Hedgewar",
    role: "Founder, 1st Sarsanghchalak",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Dr_Keshav_Baliram_Hedgewar.jpg",
    license: "CC BY-SA 4.0 · Dhayanithi",
  },
  {
    name: "M. S. Golwalkar",
    role: "2nd Sarsanghchalak",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/27/Madhav_Sadashiv_Golwalkar_%2819_February_1906_%E2%80%93_5_June_1973%29.jpg",
    license: "Wikimedia Commons",
  },
  {
    name: "Madhukar Dattatraya “Balasaheb” Deoras",
    role: "3rd Sarsanghchalak",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Balasaheb_deoras.jpg",
    license: "Wikimedia Commons",
  },
  {
    name: "Rajendra Singh “Rajju Bhaiya”",
    role: "4th Sarsanghchalak",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/72/Rajendra_Singh_Large_Image.jpg",
    license: "Wikimedia Commons",
  },
  {
    name: "Mohan Bhagwat",
    role: "6th Sarsanghchalak (current)",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Dr._mohan_rao_Bhagwat1.jpg",
    license: "CC BY 2.0",
  },
  {
    name: "Dattatreya Hosabale",
    role: "Sarkaryavah (General Secretary)",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Dattatreya_Hosabale.jpg",
    license: "Wikimedia Commons",
  },
];

export default function GalleryPage() {
  return (
    <div style={DIRECTIONS.fieldLedger as React.CSSProperties} className="min-h-screen">
      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            <ScrambleText en="Gallery" hi="गैलरी" />
          </p>
          <h1 className="mt-3 text-5xl" style={{ fontFamily: "var(--heading-font)" }}>
            <ScrambleText en="Leaders, in portrait" hi="नेता, चित्र में" />
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed opacity-80">
            <ScrambleText
              en="Real, properly licensed photographs from Wikimedia Commons — every image below is attributed. K. S. Sudarshan (5th Sarsanghchalak) has no findable Commons photo and is left out rather than filled with a placeholder."
              hi="विकिमीडिया कॉमन्स से वास्तविक, उचित रूप से लाइसेंस प्राप्त तस्वीरें — नीचे दी गई प्रत्येक छवि श्रेय के साथ है।"
            />
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PORTRAITS.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 0.06}>
                <TiltCard
                  className="overflow-hidden rounded-lg border-2"
                  style={{ borderColor: "var(--accent)", background: "#fff" } as React.CSSProperties}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={p.name} className="h-64 w-full object-cover object-top grayscale-[15%]" />
                  <div className="p-4">
                    <p className="font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
                      {p.name}
                    </p>
                    <p className="mt-1 text-sm opacity-70">{p.role}</p>
                    <p className="mt-2 text-xs opacity-45">Wikimedia Commons · {p.license}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 rounded-lg border-2 border-dashed p-6 text-sm opacity-80" style={{ borderColor: "var(--accent)" }}>
              <p className="font-medium">More to come:</p>
              <p className="mt-1">
                Event and activity photography (shakha sessions, relief work, gatherings) still needs proper sourcing
                from the{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/Category:Rashtriya_Swayamsevak_Sangh"
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Commons category
                </a>{" "}
                — left out here rather than filled with stock or placeholder imagery.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
