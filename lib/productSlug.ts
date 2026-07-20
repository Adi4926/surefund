import { ProductType } from "@/lib/constants";

export const PRODUCT_SLUG_MAP: Record<string, ProductType> = {
  "personal-loan": "Personal Loan",
  "business-loan": "Business Loan",
  "credit-card": "Credit Card",
};

export function slugToProductType(slug: string): ProductType | null {
  return PRODUCT_SLUG_MAP[slug] || null;
}

export function productTypeToSlug(productType: ProductType): string {
  return Object.entries(PRODUCT_SLUG_MAP).find(([, v]) => v === productType)?.[0] || "";
}
