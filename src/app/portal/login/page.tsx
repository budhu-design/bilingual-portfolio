import { logInAction } from "../actions";
import { Field, TextInput } from "@/components/portal/FormField";

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="mx-auto max-w-md px-6 py-24 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[#c8a24e]">Members Portal</p>
      <h1 className="mt-2 text-3xl font-semibold text-[#f6f3ec]">Log in</h1>
      <p className="mt-2 text-sm text-[#f6f3ec]/60">
        New here? <a href="/portal/signup" className="text-[#c8a24e] underline">Apply to join</a>
      </p>

      {searchParams.error && (
        <div className="mt-6 rounded-lg border border-[#a63d40]/40 bg-[#a63d40]/10 px-4 py-3 text-sm text-[#f6f3ec]">
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
          className="w-full rounded-full bg-[#c8a24e] px-8 py-3 text-sm font-medium text-[#0d0d10] transition-transform hover:scale-[1.01]"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
