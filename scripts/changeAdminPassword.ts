/**
 * Run once to change the admin's password:
 *   npx tsx scripts/changeAdminPassword.ts
 *
 * Reads ADMIN_EMAIL from .env.local (to find the account) and
 * NEW_ADMIN_PASSWORD from .env.local (the password to set).
 */
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../lib/mongodb";
import Admin from "../models/Admin";

async function main() {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || "admin@surefund.in").toLowerCase();
  const newPassword = process.env.NEW_ADMIN_PASSWORD;

  if (!newPassword) {
    console.error("Set NEW_ADMIN_PASSWORD in .env.local before running this script.");
    process.exit(1);
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    console.error(`No admin found for ${email}.`);
    process.exit(1);
  }

  admin.passwordHash = await bcrypt.hash(newPassword, 12);
  await admin.save();

  console.log(`Password updated for ${email}.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});