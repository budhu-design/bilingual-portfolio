import { ShakhaLocatorMap } from "@/components/portal/ShakhaLocatorMap";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[#c8a24e]">Contact</p>
      <h1 className="mt-2 text-3xl font-semibold text-[#f6f3ec]">Find a shakha near you</h1>
      <p className="mt-2 max-w-xl text-sm text-[#f6f3ec]/60">
        Gold pins are locations an administrator has personally verified. Don&apos;t see one near you? Reach out through
        the <a href="/portal/signup" className="text-[#c8a24e] underline">members portal</a> and someone will follow
        up.
      </p>
      <div className="mt-8">
        <ShakhaLocatorMap />
      </div>
    </div>
  );
}
