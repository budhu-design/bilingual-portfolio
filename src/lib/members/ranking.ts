/**
 * Ranking formula (kept deliberately simple and fully transparent, per the
 * brief): a member's score is the sum of `points` (an admin-set integer per
 * project, default 10) across every project they're linked to via
 * member_project_participants. No decay, no weighting by role-in-project,
 * no recency bonus — one project = its point value, full stop. Tier is the
 * highest threshold in TIERS the member's total meets or exceeds.
 */
export const TIERS = [
  { key: "swayamsevak", name: "Swayamsevak", name_hi: "स्वयंसेवक", minPoints: 0 },
  { key: "sahayak", name: "Sahayak", name_hi: "सहायक", minPoints: 50 },
  { key: "karyakarta", name: "Karyakarta", name_hi: "कार्यकर्ता", minPoints: 150 },
  { key: "pramukh", name: "Pramukh", name_hi: "प्रमुख", minPoints: 350 },
] as const;

export type Tier = (typeof TIERS)[number];

export function tierForPoints(points: number): Tier {
  let current: Tier = TIERS[0];
  for (const tier of TIERS) {
    if (points >= tier.minPoints) current = tier;
  }
  return current;
}

export function nextTier(points: number): { tier: Tier; pointsToGo: number } | null {
  const next = TIERS.find((t) => t.minPoints > points);
  return next ? { tier: next, pointsToGo: next.minPoints - points } : null;
}

export function totalPoints(projectPoints: number[]): number {
  return projectPoints.reduce((sum, p) => sum + p, 0);
}
