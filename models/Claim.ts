import mongoose, { Schema, Document } from "mongoose";
import { IClaim } from "../types";

const ClaimSchema: Schema = new Schema<IClaim>({
  ip: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Claim || mongoose.model<IClaim>("Claim", ClaimSchema);
