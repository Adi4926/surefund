import { Schema, models, model, Types } from "mongoose";

export interface INotification {
  _id: string;
  customer: Types.ObjectId;
  title: string;
  message: string;
  read: boolean;
  relatedApplication?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    relatedApplication: { type: Schema.Types.ObjectId, ref: "LoanApplication" },
  },
  { timestamps: true }
);

export default models.Notification ||
  model<INotification>("Notification", NotificationSchema);
