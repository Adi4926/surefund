import { Schema, models, model, Types } from "mongoose";
import { LEAD_STATUSES, LeadStatus, PRODUCT_TYPES, ProductType } from "@/lib/constants";

// Re-exported for backwards compatibility with existing imports
export { LEAD_STATUSES, PRODUCT_TYPES };
export type { LeadStatus, ProductType };

export interface ILeadNote {
  text: string;
  createdAt: Date;
  createdBy: string;
}

export interface ILead {
  _id: string;
  customer?: Types.ObjectId;
  productType: ProductType;
  fullName: string;
  mobile: string;
  email?: string;
  dob?: string;
  city?: string;
  pan?: string;
  employmentType?: "Salaried" | "Self-Employed" | "Business Owner";
  companyName?: string;
  designation?: string;
  monthlyIncome?: number;
  workExperienceYears?: number;
  existingEmi?: number;
  existingLoan?: boolean;
  loanAmount?: number;
  cibilScore?: number;
  businessAgeYears?: number;
  annualTurnover?: number;
  qualification: "Qualified" | "Needs Review";
  status: LeadStatus;
  notes: ILeadNote[];
  reminderAt?: Date;
  source: "Website" | "CIBIL Check" | "Manual";
  createdAt: Date;
  updatedAt: Date;
}

const LeadNoteSchema = new Schema<ILeadNote>(
  {
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, default: "Admin" },
  },
  { _id: false }
);

const LeadSchema = new Schema<ILead>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    productType: { type: String, enum: PRODUCT_TYPES, required: true },
    fullName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, index: true },
    email: { type: String, lowercase: true, trim: true },
    dob: { type: String },
    city: { type: String },
    pan: { type: String, uppercase: true, trim: true },
    employmentType: {
      type: String,
      enum: ["Salaried", "Self-Employed", "Business Owner"],
    },
    companyName: { type: String },
    designation: { type: String },
    monthlyIncome: { type: Number },
    workExperienceYears: { type: Number },
    existingEmi: { type: Number, default: 0 },
    existingLoan: { type: Boolean, default: false },
    loanAmount: { type: Number },
    cibilScore: { type: Number },
    businessAgeYears: { type: Number },
    annualTurnover: { type: Number },
    qualification: {
      type: String,
      enum: ["Qualified", "Needs Review"],
      default: "Needs Review",
    },
    status: { type: String, enum: LEAD_STATUSES, default: "New Lead" },
    notes: { type: [LeadNoteSchema], default: [] },
    reminderAt: { type: Date },
    source: {
      type: String,
      enum: ["Website", "CIBIL Check", "Manual"],
      default: "Website",
    },
  },
  { timestamps: true }
);

LeadSchema.index({ fullName: "text", mobile: "text", email: "text", pan: "text" });

export default models.Lead || model<ILead>("Lead", LeadSchema);
