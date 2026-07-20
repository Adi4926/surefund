import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken, TokenPayload } from "@/lib/auth";

/**
 * Call at the top of any protected customer-portal server component/page.
 * Redirects to /portal/login if there's no valid customer session.
 */
export async function requireCustomer(): Promise<Extract<TokenPayload, { type: "customer" }>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("surefund_token")?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload || payload.type !== "customer") {
    redirect("/portal/login");
  }

  return payload as Extract<TokenPayload, { type: "customer" }>;
}
