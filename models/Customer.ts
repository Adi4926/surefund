import { Schema, models, model } from "mongoose";

export interface ICustomer {
  _id: string;
  fullName: string;
  mobile?: string; // optional now — email is the login identifier
  email: string; // unique login identifier
  dob?: string;
  city?: string;
  pan?: string;
  isVerified: boolean;
  lastOtpSentAt?: Date;
  otpCode?: string;
  otpExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    fullName: { type: String, required: true, trim: true },
    mobile: { type: String, index: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    dob: { type: String },
    city: { type: String },
    pan: { type: String, uppercase: true, trim: true },
    isVerified: { type: Boolean, default: false },
    lastOtpSentAt: { type: Date },
    otpCode: { type: String },
    otpExpiresAt: { type: Date },
  },
  { timestamps: true }
);

export default models.Customer || model<ICustomer>("Customer", CustomerSchema);