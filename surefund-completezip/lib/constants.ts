export const LEAD_STATUSES = [
  "New Lead",
  "Contacted",
  "Documents Pending",
  "Under Review",
  "Approved",
  "Rejected",
  "Disbursed",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const PRODUCT_TYPES = [
  "Personal Loan",
  "Business Loan",
  "Credit Card",
] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number];
