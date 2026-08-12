"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/members/admin";

// Every action re-verifies admin status via requireAdmin() for a fast, clear
// failure — but the actual security boundary is the database: RLS policies
// and the admin_set_profile_* RPCs independently re-check is_admin() no
// matter how the mutation is triggered.

export async function approveMemberAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const supabase = createClient();
  await supabase.rpc("admin_set_profile_status", { target_id: id, new_status: "approved" });
  revalidatePath("/admin/members");
}

export async function rejectMemberAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const supabase = createClient();
  await supabase.rpc("admin_set_profile_status", { target_id: id, new_status: "rejected" });
  revalidatePath("/admin/members");
}

export async function setSubgroupAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const subgroupId = String(formData.get("subgroup_id") || "");
  const supabase = createClient();
  await supabase.rpc("admin_set_profile_subgroup", { target_id: id, new_subgroup_id: subgroupId || null });
  revalidatePath("/admin/members");
}

export async function createProjectAction(formData: FormData) {
  const { user } = await requireAdmin();
  const supabase = createClient();
  const photos = String(formData.get("photos") || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  await supabase.from("member_projects").insert({
    title: String(formData.get("title") || ""),
    title_hi: String(formData.get("title_hi") || "") || null,
    description: String(formData.get("description") || "") || null,
    activity_date: String(formData.get("activity_date") || new Date().toISOString().slice(0, 10)),
    points: Number(formData.get("points") || 10),
    subgroup_id: String(formData.get("subgroup_id") || "") || null,
    photos,
    created_by: user.id,
  });
  revalidatePath("/admin/projects");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  await supabase.from("member_projects").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/projects");
}

export async function assignMemberAction(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  const project_id = String(formData.get("project_id"));
  const profile_id = String(formData.get("profile_id"));
  await supabase.from("member_project_participants").upsert({ project_id, profile_id });
  revalidatePath(`/admin/projects/${project_id}`);
}

export async function removeMemberAction(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  const project_id = String(formData.get("project_id"));
  const profile_id = String(formData.get("profile_id"));
  await supabase.from("member_project_participants").delete().match({ project_id, profile_id });
  revalidatePath(`/admin/projects/${project_id}`);
}

export async function createShakhaAction(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  await supabase.from("shakha_locations").insert({
    name: String(formData.get("name") || ""),
    name_hi: String(formData.get("name_hi") || "") || null,
    address: String(formData.get("address") || "") || null,
    city: String(formData.get("city") || "") || null,
    state: String(formData.get("state") || "") || null,
    lat: Number(formData.get("lat")),
    lng: Number(formData.get("lng")),
    contact: String(formData.get("contact") || "") || null,
    verified: formData.get("verified") === "on",
    source_url: String(formData.get("source_url") || "") || null,
  });
  revalidatePath("/admin/shakhas");
  revalidatePath("/contact");
}

export async function deleteShakhaAction(formData: FormData) {
  await requireAdmin();
  const supabase = createClient();
  await supabase.from("shakha_locations").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/shakhas");
  revalidatePath("/contact");
}
