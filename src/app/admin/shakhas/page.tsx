import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/members/admin";
import { createShakhaAction, deleteShakhaAction } from "../actions";
import { Field, TextInput } from "@/components/portal/FormField";
import { ShakhaLocatorMap } from "@/components/portal/ShakhaLocatorMap";
import type { ShakhaLocation } from "@/lib/members/types";

export default async function AdminShakhasPage() {
  await requireAdmin();
  const supabase = createClient();
  const { data: shakhas } = await supabase
    .from("shakha_locations")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<ShakhaLocation[]>();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <p className="text-sm uppercase tracking-[0.3em] text-[#c8a24e]">Admin</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#f6f3ec]">Shakha locations</h1>
      <p className="mt-2 text-sm text-[#f6f3ec]/50">
        Only add locations you can personally verify. This map is public — anyone can view it, signed in or not.
      </p>

      <div className="mt-6">
        <ShakhaLocatorMap />
      </div>

      <details className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <summary className="cursor-pointer text-sm font-medium text-[#c8a24e]">+ Add location</summary>
        <form action={createShakhaAction} className="mt-4 space-y-4">
          <Field label="Name (EN)" required>
            <TextInput name="name" required />
          </Field>
          <Field label="Name (HI)">
            <TextInput name="name_hi" />
          </Field>
          <Field label="Address">
            <TextInput name="address" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="City">
              <TextInput name="city" />
            </Field>
            <Field label="State">
              <TextInput name="state" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Latitude" required>
              <TextInput type="number" step="any" name="lat" required />
            </Field>
            <Field label="Longitude" required>
              <TextInput type="number" step="any" name="lng" required />
            </Field>
          </div>
          <Field label="Contact">
            <TextInput name="contact" />
          </Field>
          <Field label="Source URL (how you verified this)">
            <TextInput type="url" name="source_url" />
          </Field>
          <label className="flex items-center gap-2 text-sm text-[#f6f3ec]/80">
            <input type="checkbox" name="verified" className="h-4 w-4 accent-[#c8a24e]" />
            I&apos;ve personally verified this location
          </label>
          <button className="rounded-full bg-[#c8a24e] px-6 py-2 text-sm font-medium text-[#0d0d10]">Add</button>
        </form>
      </details>

      <div className="mt-8 space-y-2">
        {shakhas?.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3"
          >
            <div>
              <p className="text-sm text-[#f6f3ec]">
                {s.name} {s.verified ? "✓" : <span className="text-[#a63d40]">(unverified)</span>}
              </p>
              <p className="text-xs text-[#f6f3ec]/50">
                {s.city}, {s.state} · {s.lat.toFixed(4)}, {s.lng.toFixed(4)}
              </p>
            </div>
            <form action={deleteShakhaAction}>
              <input type="hidden" name="id" value={s.id} />
              <button className="text-xs text-[#a63d40] underline">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
