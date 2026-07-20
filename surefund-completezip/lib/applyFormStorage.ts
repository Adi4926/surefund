"use client";

const DRAFT_PREFIX = "surefund_apply_draft_";

export interface ApplyDraft {
  step: number;
  fullName: string;
  mobile: string;
  email: string;
  dob: string;
  city: string;
  pan: string;
  employmentType: string;
  companyName: string;
  designation: string;
  monthlyIncome: string;
  workExperienceYears: string;
  existingEmi: string;
  existingLoan: boolean;
  loanAmount: string;
  cibilScore: string;
  businessAgeYears: string;
  annualTurnover: string;
}

export const EMPTY_DRAFT: ApplyDraft = {
  step: 1,
  fullName: "",
  mobile: "",
  email: "",
  dob: "",
  city: "",
  pan: "",
  employmentType: "",
  companyName: "",
  designation: "",
  monthlyIncome: "",
  workExperienceYears: "",
  existingEmi: "",
  existingLoan: false,
  loanAmount: "",
  cibilScore: "",
  businessAgeYears: "",
  annualTurnover: "",
};

export function saveDraft(slug: string, draft: ApplyDraft) {
  try {
    localStorage.setItem(DRAFT_PREFIX + slug, JSON.stringify(draft));
  } catch {
    // localStorage unavailable (private browsing, etc.) — fail silently
  }
}

export function loadDraft(slug: string): ApplyDraft {
  try {
    const raw = localStorage.getItem(DRAFT_PREFIX + slug);
    if (!raw) return EMPTY_DRAFT;
    return { ...EMPTY_DRAFT, ...JSON.parse(raw) };
  } catch {
    return EMPTY_DRAFT;
  }
}

export function clearDraft(slug: string) {
  try {
    localStorage.removeItem(DRAFT_PREFIX + slug);
  } catch {
    // ignore
  }
}
