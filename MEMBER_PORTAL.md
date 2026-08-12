# Member / Volunteer Portal — how it works

Covers the signup/login system, member profiles, project participation and
ranking, the admin tools, and the shakha locator. Built on the real Supabase
project already wired via `.env` (project ref `frwvwapdmjtveaxuvvsn`).

## Data model & who can see what

Six tables, all RLS-enabled (`src/lib/members/types.ts` mirrors these in TS):

- **`subgroups`** — public read; admin write. Powers signup dropdowns and the
  member directory filter.
- **`profiles`** — the non-sensitive half of a member record (name, photo,
  contact, subgroup, volunteer history, education, work type, role/
  contribution, `status`, `role`). A row is readable by: its owner, any
  signed-in user if `status = 'approved'`, or an admin. **No client INSERT
  policy exists at all** — rows are created only by the `handle_new_user`
  trigger on signup. UPDATE is column-restricted: a user can edit their own
  name/photo/contact/bio fields, but **cannot** change `role`, `status`, or
  `subgroup_current_id` themselves (see "the bug I caught" below) — those go
  through admin-only RPCs.
- **`profile_sensitive`** — religion, gender, date of birth, split into its
  own table specifically so it can carry a strictly tighter policy: **only
  the owning user or an admin can ever `SELECT` this table.** Other members,
  including people in the same subgroup, never see it — not hidden in the
  UI, actually unreachable at the database level.
- **`member_projects`** / **`member_project_participants`** — projects are
  publicly readable (they're meant to be showcased), admin-managed. The
  participants join table is readable by any signed-in user (drives rosters
  and the ranking calculation) and admin-managed.
- **`shakha_locations`** — public read (prospective members need to find a
  shakha without signing in first), admin write, added to the
  `supabase_realtime` publication so the map updates live everywhere it's
  open when an admin adds/edits/removes a pin.

### The bug I caught and fixed mid-build

The first draft of the `profiles` RLS policy let a user `UPDATE` their own
row with no column restriction — which meant any signed-up member could set
their own `role` to `'admin'` or `status` to `'approved'` directly through
the Supabase client. Fixed by revoking blanket `UPDATE` from the
`authenticated` Postgres role and re-granting it only on the safe columns,
then adding three `SECURITY DEFINER` RPCs (`admin_set_profile_status`,
`admin_set_profile_role`, `admin_set_profile_subgroup`) that re-check
`is_admin()` internally before touching the restricted columns. All admin
actions in `src/app/admin/actions.ts` go through these RPCs, not a direct
`.update()`.

### Bootstrapping the first admin

No one is an admin by default (there's no real user yet to assign it to).
After your first real signup, promote it manually in the SQL editor:

```sql
update public.profiles set role = 'admin' where id = '<the user's auth uid>';
```

From then on, that admin can promote others via a direct call to the
`admin_set_profile_role` RPC (no UI wired for this yet — deliberately, since
it's a rare, high-stakes action).

## Ranking formula (documented, per the brief)

`src/lib/members/ranking.ts`. A member's score is the sum of `points` (an
admin-set integer per project, default 10) across every project they're
linked to via `member_project_participants`. No decay, no weighting by
role-in-project, no recency bonus. Tiers:

| Tier | Points |
|---|---|
| Swayamsevak (स्वयंसेवक) | 0+ |
| Sahayak (सहायक) | 50+ |
| Karyakarta (कार्यकर्ता) | 150+ |
| Pramukh (प्रमुख) | 350+ |

Change the thresholds/names in one place (`TIERS` in `ranking.ts`) — every
page that shows a tier badge reads from it.

## Signup flow specifics

- Auth (password hashing, sessions) is entirely handled by Supabase Auth —
  the app never touches a raw password. Email confirmation is on by default
  for a new Supabase project; the signup form requires it before login works.
- All profile fields (including the sensitive ones) are passed as
  `options.data` to `supabase.auth.signUp()`, landing in
  `auth.users.raw_user_meta_data`. A trigger (`handle_new_user`, security
  definer) reads that metadata and writes the `profiles` +
  `profile_sensitive` rows — this works even though there's no active
  session yet (email unconfirmed), since it's a DB trigger, not a
  client-authenticated call.
- Server-side validation: `src/lib/validation/signup.ts` (zod) — every field
  is re-validated server-side in `src/app/portal/actions.ts` regardless of
  client-side `required` attributes.
- **Known tradeoff:** the optional photo upload happens before email
  confirmation (no session exists yet), so it goes through a public-insert
  storage policy on the `avatars` bucket rather than an authenticated one.
  Uploaded files land under `avatars/pending/<random-uuid>.<ext>` — the
  random path is the only thing preventing enumeration. Good enough for a
  working demo; if you need this airtight, move photo upload to a
  post-confirmation "complete your profile" step instead.

## Shakha locator

`src/components/portal/ShakhaLocatorMap.tsx` — Leaflet + OpenStreetMap tiles
(no API key, no billing account needed), live via a Supabase realtime
subscription. Used on the public `/contact` page and in `/admin/shakhas`.

Only two locations are seeded, both flagship, already-public HQ buildings
with coordinates confirmed via web search (not guessed): the RSS national HQ
in Nagpur and the Delhi HQ (Keshav Kunj). **Deliberately not seeded:**
comprehensive real addresses for individual local shakhas — I don't have
verified data for those, and fabricating plausible-looking ones would put
fake locations in front of real people trying to find a real one. Add real,
verified ones through `/admin/shakhas` (admin-only, requires a `source_url`
field to encourage citing how each one was verified).

If you specifically want Google-branded maps later: swap the `import
"leaflet"` + tile layer in `ShakhaLocatorMap.tsx` for the Google Maps
JavaScript API — everything else (the Supabase query, the realtime
subscription, the admin CRUD) stays the same. That requires your own Google
Cloud project, an API key, and a billing account, none of which I can set up
on your behalf.

## Routes

- `/portal/signup`, `/portal/login` — public
- `/portal` — own dashboard (profile, projects, rank); shows a pending/
  rejected state if not yet approved
- `/portal/settings` — self-view of sensitive fields
- `/portal/members`, `/portal/members/[id]` — directory, approved members only
- `/admin`, `/admin/members`, `/admin/projects`, `/admin/projects/[id]`,
  `/admin/shakhas` — admin-only, redirect to `/portal` for non-admins
- `/contact` — public shakha locator
