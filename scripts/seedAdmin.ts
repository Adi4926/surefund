/**
 * Run once to create the single SureFund admin account:
 *   npx tsx scripts/seedAdmin.ts
 *
 * Reads ADMIN_EMAIL and ADMIN_DEFAULT_PASSWORD from .env.local.
 * Change the password immediately after first login (add a
 * change-password route before going to production).
 */import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../lib/mongodb";
import Admin from "../models/Admin";

async function main() {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || "admin@surefund.in").toLowerCase();
  const password = process.env.ADMIN_DEFAULT_PASSWORD || "ChangeMe123!";

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin already exists for ${email}. Skipping.`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.create({
    name: "SureFund Admin",
    email,
    passwordHash,
    role: "super_admin",
  });

  console.log(`Admin created: ${email} / ${password}`);
  console.log("Log in and change this password immediately.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
