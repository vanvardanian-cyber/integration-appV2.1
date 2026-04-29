import { solve } from "@/lib/engine/solver";
import type { ProfileInput } from "@/lib/actions";
import type { UserProfile } from "@/types/engine";

export const previewProfileInput: ProfileInput = {
  targetCountry: "DE",
  nationality: "non-EU",
  countryOfOrigin: "IN",
  arrivalDate: "2026-06-01",
  city: "Berlin",
  housing: "temporary-employer",
  employment: "employed",
  visaType: "blue-card",
  hasJobOffer: true,
  hasSignedContract: true,
  annualGrossSalary: 75000,
  startDate: "2026-06-15",
  maritalStatus: "single",
  hasChildren: false,
  spouseAccompanying: false,
  speaksTargetLanguage: false,
  hasUniversityDegree: true,
  degreeRecognized: "yes",
  hasIndianDrivingLicense: true,
  hasUSDrivingLicense: false,
  hasOtherNonEUDrivingLicense: false,
  confidence: {
    targetCountry: "confirmed",
    nationality: "confirmed",
    countryOfOrigin: "confirmed",
    city: "confirmed",
    housing: "confirmed",
    employment: "confirmed",
    visaType: "confirmed",
  },
};

export const previewUserProfile: UserProfile = {
  id: "preview-profile",
  userId: "preview-user",
  ...previewProfileInput,
};

export const previewCompletedIds = new Set<string>([
  "temporary_address",
  "anmeldung",
  "online_bank",
]);

export function getPreviewPath() {
  const path = solve(previewUserProfile, previewCompletedIds);
  return {
    profile: previewUserProfile,
    path,
    completedIds: new Set(previewCompletedIds),
  };
}
