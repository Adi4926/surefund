import { Schema, models, model } from "mongoose";

export interface ICibilRequest {
  _id: string;
  fullName: string;
  mobile: string;
  pan: string;
  consentGiven: boolean;
  consentTimestamp: Date;
  // Populated once a real CIBIL bureau API is integrated (see lib/cibil.ts)
  score?: number;
  reportFetchedAt?: Date;
  status: "Pending" | "Fetched" | "Failed";
  convertedToLead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CibilRequestSchema = new Schema<ICibilRequest>(
  {
    fullName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, index: true },
    pan: { type: String, required: true, uppercase: true, trim: true },
    consentGiven: { type: Boolean, required: true },
    consentTimestamp: { type: Date, required: true, default: Date.now },
    score: { type: Number },
    reportFetchedAt: { type: Date },
    status: { type: String, enum: ["Pending", "Fetched", "Failed"], default: "Pending" },
    convertedToLead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.CibilRequest ||
  model<ICibilRequest>("CibilRequest", CibilRequestSchema);
