import mongoose, { Schema, models, model } from "mongoose";

export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "super_admin";
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true, default: "SureFund Admin" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["super_admin"], default: "super_admin" },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export default models.Admin || model<IAdmin>("Admin", AdminSchema);
