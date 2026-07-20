import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in your environment variables");
}

export type TokenPayload =
  | { type: "admin"; id: string; email: string; role: string }
  | { type: "customer"; id: string; email: string };

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

/**
 * Extracts and verifies the bearer/cookie token from an incoming request.
 * Looks first at the Authorization header, then falls back to the
 * `surefund_token` / `surefund_admin_token` cookies set on login.
 */
export function getAuthFromRequest(
  req: NextRequest,
  expected?: "admin" | "customer"
): TokenPayload | null {
  const header = req.headers.get("authorization");
  const bearer = header?.startsWith("Bearer ") ? header.slice(7) : null;

  const cookieName = expected === "admin" ? "surefund_admin_token" : "surefund_token";
  const cookieToken = req.cookies.get(cookieName)?.value;

  const token = bearer || cookieToken;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;
  if (expected && payload.type !== expected) return null;

  return payload;
}
