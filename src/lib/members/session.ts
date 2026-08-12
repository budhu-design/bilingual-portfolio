import { createClient } from "@/lib/supabase/server";
import type { Profile, ProfileSensitive } from "./types";

/** Server-only: current user + their own profile row (RLS already scopes this to "self"). */
export async function getSessionProfile() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null, sensitive: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  const { data: sensitive } = await supabase
    .from("profile_sensitive")
    .select("*")
    .eq("profile_id", user.id)
    .maybeSingle<ProfileSensitive>();

  return { user, profile, sensitive };
}
