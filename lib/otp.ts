import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID as string;

function client() {
  if (!accountSid || !authToken || !verifyServiceSid) {
    throw new Error(
      "Twilio env vars missing. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID."
    );
  }
  return twilio(accountSid, authToken);
}

/** Normalizes an Indian mobile number to E.164 (+91XXXXXXXXXX). */
export function toE164India(mobile: string): string {
  const digits = mobile.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  if (mobile.startsWith("+")) return mobile;
  throw new Error("Invalid mobile number format");
}

export async function sendOtp(mobile: string): Promise<{ status: string }> {
  const phone = toE164India(mobile);
  const verification = await client()
    .verify.v2.services(verifyServiceSid)
    .verifications.create({ to: phone, channel: "sms" });
  return { status: verification.status };
}

export async function checkOtp(
  mobile: string,
  code: string
): Promise<{ approved: boolean }> {
  const phone = toE164India(mobile);
  const check = await client()
    .verify.v2.services(verifyServiceSid)
    .verificationChecks.create({ to: phone, code });
  return { approved: check.status === "approved" };
}
