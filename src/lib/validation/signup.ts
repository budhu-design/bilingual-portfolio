import { z } from "zod";

const MIN_DOB = new Date(Date.now() - 120 * 365.25 * 24 * 3600 * 1000);

export const signupSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  official_name: z.string().trim().min(2, "Enter your full official name."),
  contact_email: z
    .string()
    .trim()
    .email("Enter a valid contact email.")
    .optional()
    .or(z.literal("")),
  contact_phone: z.string().trim().min(6, "Enter a valid phone number.").optional().or(z.literal("")),
  subgroup_current_id: z.string().uuid().optional().or(z.literal("")),
  subgroup_wish_id: z.string().uuid({ message: "Select the subgroup you wish to join." }),
  volunteer_history: z.string().trim().max(4000).optional().or(z.literal("")),
  religion: z.string().trim().min(1, "This field is required."),
  gender: z.string().trim().min(1, "This field is required."),
  date_of_birth: z
    .string()
    .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date.")
    .refine((v) => new Date(v) <= new Date(), "Date of birth can't be in the future.")
    .refine((v) => new Date(v) >= MIN_DOB, "Enter a realistic date of birth."),
  education: z.string().trim().min(1, "This field is required."),
  work_type: z.string().trim().min(1, "This field is required."),
  role_contribution: z.string().trim().min(1, "Describe your role or contribution.").max(4000),
  consent: z
    .string()
    .refine((v) => v === "on", "You must accept the privacy notice to continue."),
});

export type SignupInput = z.infer<typeof signupSchema>;
