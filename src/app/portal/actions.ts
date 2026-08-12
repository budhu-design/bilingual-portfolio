"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { signupSchema } from "@/lib/validation/signup";

export async function signUpAction(formData: FormData) {
  const raw = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    official_name: String(formData.get("official_name") ?? ""),
    contact_email: String(formData.get("contact_email") ?? ""),
    contact_phone: String(formData.get("contact_phone") ?? ""),
    subgroup_current_id: String(formData.get("subgroup_current_id") ?? ""),
    subgroup_wish_id: String(formData.get("subgroup_wish_id") ?? ""),
    volunteer_history: String(formData.get("volunteer_history") ?? ""),
    religion: String(formData.get("religion") ?? ""),
    gender: String(formData.get("gender") ?? ""),
    date_of_birth: String(formData.get("date_of_birth") ?? ""),
    education: String(formData.get("education") ?? ""),
    work_type: String(formData.get("work_type") ?? ""),
    role_contribution: String(formData.get("role_contribution") ?? ""),
    consent: String(formData.get("consent") ?? ""),
  };

  const parsed = signupSchema.safeParse(raw);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    redirect(`/portal/signup?error=${encodeURIComponent(message)}`);
  }

  const data = parsed.data;
  const supabase = createClient();

  // Optional photo upload. This happens before any session exists (email
  // isn't confirmed yet), so it goes through the public "avatars" bucket
  // insert policy rather than an authenticated one — see anim-kit/README-style
  // note in src/app/portal/README.md for the tradeoff this implies.
  let photo_url: string | null = null;
  const photo = formData.get("photo");
  if (photo instanceof File && photo.size > 0) {
    if (photo.size > 5 * 1024 * 1024) {
      redirect(`/portal/signup?error=${encodeURIComponent("Photo must be under 5MB.")}`);
    }
    const ext = photo.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `pending/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(path, photo, {
      contentType: photo.type,
      upsert: false,
    });
    if (uploadError) {
      redirect(`/portal/signup?error=${encodeURIComponent(`Photo upload failed: ${uploadError.message}`)}`);
    }
    photo_url = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
  }

  const { error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        official_name: data.official_name,
        photo_url,
        contact_email: data.contact_email || data.email,
        contact_phone: data.contact_phone || null,
        subgroup_current_id: data.subgroup_current_id || null,
        subgroup_wish_id: data.subgroup_wish_id,
        volunteer_history: data.volunteer_history || null,
        education: data.education,
        work_type: data.work_type,
        role_contribution: data.role_contribution,
        religion: data.religion,
        gender: data.gender,
        date_of_birth: data.date_of_birth,
      },
    },
  });

  if (signUpError) {
    redirect(`/portal/signup?error=${encodeURIComponent(signUpError.message)}`);
  }

  redirect("/portal/signup/check-email");
}

export async function logInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/portal/login?error=${encodeURIComponent(error.message)}`);
  }
  redirect("/portal");
}

export async function logOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
