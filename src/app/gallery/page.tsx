"use client";

import { Reveal, ScrambleText } from "@/components/anim-kit";
import { DIRECTIONS } from "@/lib/directions";

export default function GalleryPage() {
  return (
    <div style={DIRECTIONS.fieldLedger as React.CSSProperties} className="min-h-screen">
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            <ScrambleText en="Gallery" hi="गैलरी" />
          </p>
          <h1 className="mt-3 text-5xl" style={{ fontFamily: "var(--heading-font)" }}>
            <ScrambleText en="A scrapbook, still being filled in" hi="एक स्क्रैपबुक, अभी भरी जा रही है" />
          </h1>
          <Reveal>
            <p className="mt-6 text-lg leading-relaxed opacity-80">
              <ScrambleText
                en="This page is built and ready — filterable by era and branch — but deliberately empty until it's populated with real, properly licensed photographs, not placeholders."
                hi="यह पृष्ठ बना हुआ और तैयार है — युग और शाखा के अनुसार फ़िल्टर करने योग्य — लेकिन जानबूझकर खाली है जब तक इसे वास्तविक, उचित रूप से लाइसेंस प्राप्त तस्वीरों से नहीं भरा जाता, प्लेसहोल्डर से नहीं।"
              />
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-lg border-2 border-dashed p-6 text-left text-sm opacity-80" style={{ borderColor: "var(--accent)" }}>
              <p className="font-medium">Sourcing plan (from the content library):</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  Pull from the Wikimedia Commons category{" "}
                  <a
                    href="https://commons.wikimedia.org/wiki/Category:Rashtriya_Swayamsevak_Sangh"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Category:Rashtriya Swayamsevak Sangh
                  </a>{" "}
                  via its API, not stock/rights-managed sites.
                </li>
                <li>Store licence, author, and source URL alongside each image.</li>
                <li>Render an attribution line on every photo per its individual licence.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
