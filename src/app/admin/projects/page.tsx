import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/members/admin";
import { createProjectAction, deleteProjectAction } from "../actions";
import { Field, TextInput, TextArea, Select } from "@/components/portal/FormField";
import type { MemberProject, Subgroup } from "@/lib/members/types";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const supabase = createClient();

  const [{ data: projects }, { data: subgroups }] = await Promise.all([
    supabase.from("member_projects").select("*").order("activity_date", { ascending: false }).returns<MemberProject[]>(),
    supabase.from("subgroups").select("*").returns<Subgroup[]>(),
  ]);
  const subgroupMap = new Map((subgroups ?? []).map((s) => [s.id, s.name]));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[#c8a24e]">Admin</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#f6f3ec]">Projects & activities</h1>

      <details className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <summary className="cursor-pointer text-sm font-medium text-[#c8a24e]">+ New project</summary>
        <form action={createProjectAction} className="mt-4 space-y-4">
          <Field label="Title (EN)" required>
            <TextInput name="title" required />
          </Field>
          <Field label="Title (HI)">
            <TextInput name="title_hi" />
          </Field>
          <Field label="Description">
            <TextArea name="description" rows={3} />
          </Field>
          <Field label="Date" required>
            <TextInput type="date" name="activity_date" required defaultValue={new Date().toISOString().slice(0, 10)} />
          </Field>
          <Field label="Points (used by the ranking formula)" required>
            <TextInput type="number" name="points" defaultValue={10} min={0} required />
          </Field>
          <Field label="Subgroup">
            <Select name="subgroup_id" defaultValue="">
              <option value="">— Organisation-wide —</option>
              {subgroups?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Photo URLs (one per line)">
            <TextArea name="photos" rows={2} placeholder="https://..." />
          </Field>
          <button className="rounded-full bg-[#c8a24e] px-6 py-2 text-sm font-medium text-[#0d0d10]">Create</button>
        </form>
      </details>

      <div className="mt-8 space-y-3">
        {projects?.map((p) => (
          <div key={p.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#c8a24e]">
                  {new Date(p.activity_date).toLocaleDateString()} · {p.points} pts ·{" "}
                  {subgroupMap.get(p.subgroup_id ?? "") ?? "Org-wide"}
                </p>
                <p className="mt-1 font-medium text-[#f6f3ec]">{p.title}</p>
                {p.description && <p className="mt-1 text-sm text-[#f6f3ec]/60">{p.description}</p>}
              </div>
              <form action={deleteProjectAction}>
                <input type="hidden" name="id" value={p.id} />
                <button className="text-xs text-[#a63d40] underline">Delete</button>
              </form>
            </div>
            <a href={`/admin/projects/${p.id}`} className="mt-3 inline-block text-xs text-[#c8a24e] underline">
              Manage participants →
            </a>
          </div>
        ))}
        {projects?.length === 0 && <p className="text-sm text-[#f6f3ec]/50">No projects yet.</p>}
      </div>
    </div>
  );
}
