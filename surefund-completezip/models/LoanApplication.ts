import { Schema, models, model, Types } from "mongoose";
import { LEAD_STATUSES, LeadStatus, PRODUCT_TYPES, ProductType } from "./Lead";

export interface IUploadedDocument {
  type: "PAN" | "Aadhaar" | "Other";
  url: string;
  publicId: string;
  format: string;
  bytes: number;
  uploadedAt: Date;
}

export interface ILoanApplication {
  _id: string;
  lead: Types.ObjectId;
  customer?: Types.ObjectId;
  productType: ProductType;
  loanAmount: number;
  status: LeadStatus;
  documents: IUploadedDocument[];
  createdAt: Date;
  updatedAt: Date;
}

const UploadedDocumentSchema = new Schema<IUploadedDocument>(
  {
    type: { type: String, enum: ["PAN", "Aadhaar", "Other"], required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    format: { type: String, required: true },
    bytes: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const LoanApplicationSchema = new Schema<ILoanApplication>(
  {
    lead: { type: Schema.Types.ObjectId, ref: "Lead", required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    productType: { type: String, enum: PRODUCT_TYPES, required: true },
    loanAmount: { type: Number, required: true },
    status: { type: String, enum: LEAD_STATUSES, default: "New Lead" },
    documents: { type: [UploadedDocumentSchema], default: [] },
  },
  { timestamps: true }
);

export default models.LoanApplication ||
  model<ILoanApplication>("LoanApplication", LoanApplicationSchema);
