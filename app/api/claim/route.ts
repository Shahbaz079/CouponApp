import { NextResponse } from "next/server";
import connectDB from "../connect";
import Coupon from "../../../models/Coupon";
import Claim from "../../../models/Claim";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  await connectDB();

  // Get cookies from request
  const cookieStore =await cookies();

  // Extract real IP address
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1"; // Handle Vercel & proxies

  if (!ip) {
    return NextResponse.json({ error: "Unable to determine IP address." }, { status: 400 });
  }

  // Check if user already claimed a 
  // coupon via cookies


  const claimedCoupon = cookieStore.get("claimed_coupon");
  if (claimedCoupon) {
    return NextResponse.json({ error: "You have already claimed a coupon. Try later." }, { status: 429 });
  }

  // Check for abuse (IP restriction for 1 hour)
  const existingClaim = await Claim.findOne({ ip });
  if (existingClaim && Date.now() - existingClaim.timestamp.getTime() < 3600000) {
    const timeLeft = Math.ceil((3600000 - (Date.now() - existingClaim.timestamp.getTime())) / 60000);
    return NextResponse.json({ error: `Try again in ${timeLeft} minutes.` }, { status: 429 });
  }

  // Find an available coupon (round-robin)
  const coupon = await Coupon.findOneAndUpdate({ status: "available" }, { status: "claimed" });

  if (!coupon) {
    return NextResponse.json({ error: "No coupons available." }, { status: 400 });
  }

  // Store claim record in DB (IP-based)
  await new Claim({ ip }).save();

  // Set cookie to prevent multiple claims from the same browser
  cookieStore.set("claimed_coupon", "true", { maxAge: 3600, httpOnly: true });

  return NextResponse.json({ success: true, coupon: coupon.code });
}
