import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IVaultItem extends Document {
  userId: Types.ObjectId;   // <-- use Types.ObjectId instead of string
  title: string;
  username: string;
  password: string; // encrypted string
  url?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VaultItemSchema = new Schema<IVaultItem>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }, // encrypted before save
    url: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

const VaultItem: Model<IVaultItem> =
  mongoose.models.VaultItem || mongoose.model<IVaultItem>("VaultItem", VaultItemSchema);

export default VaultItem;
