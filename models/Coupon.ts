import mongoose, { Schema, Document } from "mongoose";
import { ICoupon } from "../types";

const CouponSchema: Schema = new Schema<ICoupon>({
  code: { type: String, required: true, unique: true },
  status: { type: String, enum: ["available", "claimed"], default: "available" },
});

export default mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", CouponSchema);
