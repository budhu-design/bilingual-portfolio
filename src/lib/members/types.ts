export type ProfileStatus = "pending" | "approved" | "rejected";
export type MemberRole = "member" | "admin";

export type Subgroup = {
  id: string;
  name: string;
  name_hi: string | null;
  description: string | null;
};

export type Profile = {
  id: string;
  official_name: string;
  photo_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  subgroup_current_id: string | null;
  subgroup_wish_id: string | null;
  volunteer_history: string | null;
  education: string | null;
  work_type: string | null;
  role_contribution: string | null;
  status: ProfileStatus;
  role: MemberRole;
  created_at: string;
};

export type ProfileSensitive = {
  profile_id: string;
  religion: string | null;
  gender: string | null;
  date_of_birth: string | null;
};

export type MemberProject = {
  id: string;
  title: string;
  title_hi: string | null;
  description: string | null;
  activity_date: string;
  photos: string[];
  points: number;
  subgroup_id: string | null;
  created_by: string | null;
  created_at: string;
};

export type MemberProjectParticipant = {
  project_id: string;
  profile_id: string;
  added_at: string;
};

export type ShakhaLocation = {
  id: string;
  name: string;
  name_hi: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  lat: number;
  lng: number;
  contact: string | null;
  verified: boolean;
  source_url: string | null;
  created_at: string;
};
