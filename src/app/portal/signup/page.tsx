import { createClient } from "@/lib/supabase/server";
import { signUpAction } from "../actions";
import { PrivacyNotice } from "@/components/portal/PrivacyNotice";
import { Field, TextInput, TextArea, Select } from "@/components/portal/FormField";
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
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[#c8a24e]">Members Portal</p>
      <h1 className="mt-2 text-3xl font-semibold text-[#f6f3ec] sm:text-4xl">Join as a volunteer</h1>
      <p className="mt-2 text-sm text-[#f6f3ec]/60">
        Already have an account? <a href="/portal/login" className="text-[#c8a24e] underline">Log in</a>
      </p>

      {searchParams.error && (
        <div className="mt-6 rounded-lg border border-[#a63d40]/40 bg-[#a63d40]/10 px-4 py-3 text-sm text-[#f6f3ec]">
          {searchParams.error}
        </div>
      )}

      <form action={signUpAction} className="mt-8 space-y-8">
        <fieldset className="space-y-4">
          <legend className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#c8a24e]">Account</legend>
          <Field label="Email" required>
            <TextInput type="email" name="email" required autoComplete="email" />
          </Field>
          <Field label="Password" required>
            <TextInput type="password" name="password" required minLength={8} autoComplete="new-password" />
          </Field>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#c8a24e]">Profile</legend>
          <Field label="Official name" required>
            <TextInput type="text" name="official_name" required />
          </Field>
          <Field label="Photo">
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="block w-full text-sm text-[#f6f3ec]/70 file:mr-3 file:rounded-lg file:border-0 file:bg-[#c8a24e] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#0d0d10]"
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
          <legend className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#c8a24e]">Affiliation</legend>
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
          <legend className="mb-1 text-sm font-semibold uppercase tracking-wide text-[#c8a24e]">
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

        <label className="flex items-start gap-3 text-sm text-[#f6f3ec]/80">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#c8a24e]" />
          I have read the privacy notice above and consent to my data being collected and stored as described.
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-[#c8a24e] px-8 py-3 text-sm font-medium text-[#0d0d10] transition-transform hover:scale-[1.01]"
        >
          Submit application
        </button>
        <p className="text-xs text-[#f6f3ec]/40">
          Your account is created immediately but marked &quot;pending&quot; until an administrator reviews and approves it.
        </p>
      </form>
    </div>
  );
}
