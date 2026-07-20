import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken, TokenPayload } from "@/lib/auth";

/**
 * Call at the top of any protected admin server component/page.
 * Redirects to /admin/login if there's no valid admin session.
 */
export async function requireAdmin(): Promise<Extract<TokenPayload, { type: "admin" }>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("surefund_admin_token")?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload || payload.type !== "admin") {
    redirect("/admin/login");
  }

  return payload as Extract<TokenPayload, { type: "admin" }>;
}
