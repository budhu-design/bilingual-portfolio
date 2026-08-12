import Link from "next/link";
import { logInAction } from "../actions";
import { Field, TextInput } from "@/components/portal/FormField";
import { DIRECTIONS } from "@/lib/directions";

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div style={DIRECTIONS.civicTech as React.CSSProperties} className="min-h-screen">
      <div className="mx-auto max-w-md px-6 py-24 sm:px-10">
        <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
          Members Portal
        </p>
        <h1 className="mt-2 text-3xl font-semibold" style={{ fontFamily: "var(--heading-font)" }}>
          Log in
        </h1>
        <p className="mt-2 text-sm opacity-70">
          New here?{" "}
          <Link href="/portal/signup" className="underline" style={{ color: "var(--accent)" }}>
            Apply to join
          </Link>
        </p>

        {searchParams.error && (
          <div
            className="mt-6 rounded-lg border px-4 py-3 text-sm"
            style={{ borderColor: "var(--accent)", background: "rgba(232,121,44,0.08)" }}
          >
            {searchParams.error}
          </div>
        )}

        <form action={logInAction} className="mt-8 space-y-4">
          <Field label="Email" required>
            <TextInput type="email" name="email" required autoComplete="email" />
          </Field>
          <Field label="Password" required>
            <TextInput type="password" name="password" required autoComplete="current-password" />
          </Field>
          <button
            type="submit"
            className="w-full rounded-full px-8 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01]"
            style={{ background: "var(--accent)" }}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
