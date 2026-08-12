"use client";

import Link from "next/link";
import { Reveal, ScrambleText } from "@/components/anim-kit";
import { ShakhaLocatorMap } from "@/components/portal/ShakhaLocatorMap";
import { DIRECTIONS } from "@/lib/directions";

export default function ContactPage() {
  return (
    <div style={DIRECTIONS.sanghSmriti as React.CSSProperties} className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
            <ScrambleText en="Contact" hi="संपर्क" />
          </p>
          <h1 className="mt-2 text-4xl font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
            <ScrambleText en="Find a shakha near you" hi="अपने पास की शाखा खोजें" />
          </h1>
          <p className="mt-3 max-w-xl text-lg opacity-70">
            <ScrambleText
              en="Gold pins are locations an administrator has personally verified. Don't see one near you? Reach out through the members portal and someone will follow up."
              hi="सुनहरे पिन वे स्थान हैं जिन्हें किसी प्रशासक ने व्यक्तिगत रूप से सत्यापित किया है। अपने पास कोई नहीं दिख रहा? सदस्य पोर्टल के माध्यम से संपर्क करें।"
            />{" "}
            <Link href="/portal/signup" className="underline" style={{ color: "var(--accent)" }}>
              <ScrambleText en="members portal" hi="सदस्य पोर्टल" />
            </Link>
            .
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <ShakhaLocatorMap />
        </Reveal>
      </div>
    </div>
  );
}
