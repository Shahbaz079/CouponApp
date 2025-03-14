import { NextResponse } from "next/server";
import connectDB from "../connect";
import Coupon from "../../../models/Coupon";
import Claim from "../../../models/Claim";
import { cookies } from "next/headers";
export async function POST() {

  await connectDB();


  const cookieStore = await cookies();

  const ip = process.env.NODE_ENV === "production" 
    ? cookieStore.get("x-forwarded-for")?.value 
    : "127.0.0.1";

  if (!ip) {
    return NextResponse.json({ error: "Unable to determine IP address." }, 
      { status: 400 }
    
             );
  }

  const claimedCoupon = cookieStore.get("claimed_coupon");
  
  if (claimedCoupon) {
    return NextResponse.json({ error: "You have already claimed a coupon. Try later." }, { status: 429 });
  }

  const existingClaim = await Claim.findOne({ ip });

  if (existingClaim && Date.now() - existingClaim.timestamp.getTime() < 300000) {
    const timeLeft = Math.ceil((300000 - (Date.now() - existingClaim.timestamp.getTime())) / 60000);
    return NextResponse.json({ error: `Try again in ${timeLeft} minutes.` }, { status: 429 });
  }

  


  const coupon = await Coupon.findOneAndUpdate({ status: "available" }, { status: "claimed" });

  if (!coupon) {
    return NextResponse.json({ error: "No coupons available." }, { status: 400 });
  }
  await new Claim({ ip }).save();

  // Set cookie
  cookieStore.set("claimed_coupon", "true", { maxAge: 3600, httpOnly: true });

  return NextResponse.json({ success: true, coupon: coupon.code });
}
