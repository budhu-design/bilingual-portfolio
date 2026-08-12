import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signUpAction } from "../actions";
import { PrivacyNotice } from "@/components/portal/PrivacyNotice";
import { Field, TextInput, TextArea, Select } from "@/components/portal/FormField";
import { DIRECTIONS } from "@/lib/directions";
import type { Subgroup } from "@/lib/members/types";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const supabase = createClient();
  const { data: subgroups } = await supabase
    .from("subgroups")
    .select("id, name, name_hi")
    .order("name")
    .returns<Pick<Subgroup, "id" | "name" | "name_hi">[]>();

  return (
    <div style={DIRECTIONS.civicTech as React.CSSProperties} className="min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:px-10">
        <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
          Members Portal
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl" style={{ fontFamily: "var(--heading-font)" }}>
          Join as a volunteer
        </h1>
        <p className="mt-2 text-sm opacity-70">
          Already have an account?{" "}
          <Link href="/portal/login" className="underline" style={{ color: "var(--accent)" }}>
            Log in
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

        <form action={signUpAction} className="mt-8 space-y-8">
          <fieldset className="space-y-4">
            <legend className="mb-1 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--accent)" }}>
              Account
            </legend>
            <Field label="Email" required>
              <TextInput type="email" name="email" required autoComplete="email" />
            </Field>
            <Field label="Password" required>
              <TextInput type="password" name="password" required minLength={8} autoComplete="new-password" />
            </Field>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-1 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--accent)" }}>
              Profile
            </legend>
            <Field label="Official name" required>
              <TextInput type="text" name="official_name" required />
            </Field>
            <Field label="Photo">
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="block w-full text-sm opacity-70 file:mr-3 file:rounded-lg file:border-0 file:bg-[color:var(--accent)] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
              />
            </Field>
            <Field label="Contact email (if different)">
              <TextInput type="email" name="contact_email" />
            </Field>
            <Field label="Contact phone">
              <TextInput type="tel" name="contact_phone" />
            </Field>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-1 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--accent)" }}>
              Affiliation
            </legend>
            <Field label="Subgroup you currently belong to (if any)">
              <Select name="subgroup_current_id" defaultValue="">
                <option value="">— None yet —</option>
                {subgroups?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Subgroup you wish to join" required>
              <Select name="subgroup_wish_id" defaultValue="" required>
                <option value="" disabled>
                  Select a subgroup
                </option>
                {subgroups?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="History of community / volunteer work">
              <TextArea name="volunteer_history" rows={3} />
            </Field>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-1 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--accent)" }}>
              Personal details
            </legend>
            <Field label="Religion" required>
              <TextInput type="text" name="religion" required />
            </Field>
            <Field label="Gender" required>
              <TextInput type="text" name="gender" required />
            </Field>
            <Field label="Date of birth" required>
              <TextInput type="date" name="date_of_birth" required />
            </Field>
            <Field label="Education" required>
              <TextInput type="text" name="education" required />
            </Field>
            <Field label="Type of work you officially perform" required>
              <TextInput type="text" name="work_type" required />
            </Field>
            <Field label="Your role or contribution to the organisation" required>
              <TextArea name="role_contribution" rows={4} required />
            </Field>
          </fieldset>

          <PrivacyNotice />

          <label className="flex items-start gap-3 text-sm opacity-80">
            <input type="checkbox" name="consent" required className="mt-1 h-4 w-4" style={{ accentColor: "var(--accent)" }} />
            I have read the privacy notice above and consent to my data being collected and stored as described.
          </label>

          <button
            type="submit"
            className="w-full rounded-full px-8 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01]"
            style={{ background: "var(--accent)" }}
          >
            Submit application
          </button>
          <p className="text-xs opacity-50">
            Your account is created immediately but marked &quot;pending&quot; until an administrator reviews and approves it.
          </p>
        </form>
      </div>
    </div>
  );
}
