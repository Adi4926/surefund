/**
 * Integration point for a real bureau API. Swap the body for your
 * CIBIL/Experian data-partner's actual request/response contract —
 * the rest of the app (models, admin UI) already expects this shape.
 */
export async function fetchCibilScore(_input: {
  pan: string;
  mobile: string;
}): Promise<{ score: number } | null> {
  throw new Error("CIBIL bureau API not yet configured");
}
