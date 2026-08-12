import { ShakhaLocatorMap } from "@/components/portal/ShakhaLocatorMap";
import { DIRECTIONS } from "@/lib/directions";

export default function ContactPage() {
  return (
    <div style={DIRECTIONS.sanghSmriti as React.CSSProperties} className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
        <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
          Contact
        </p>
        <h1 className="mt-2 text-3xl font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
          Find a shakha near you
        </h1>
        <p className="mt-2 max-w-xl text-sm opacity-70">
          Gold pins are locations an administrator has personally verified. Don&apos;t see one near you? Reach out
          through the{" "}
          <a href="/portal/signup" className="underline" style={{ color: "var(--accent)" }}>
            members portal
          </a>{" "}
          and someone will follow up.
        </p>
        <div className="mt-8">
          <ShakhaLocatorMap />
        </div>
      </div>
    </div>
  );
}
