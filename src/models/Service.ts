import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  name: string;
  duration: number; // minutes
  active: boolean;
}

const ServiceSchema: Schema<IService> = new Schema(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
