import { NextRequest, NextResponse } from "next/server";
// Use require for Razorpay to avoid type issues in Next.js API routes
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Razorpay = require("razorpay");

// Check for required env variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay environment variables are not set");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", receipt = "order_receipt_" + Date.now() } = body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Create order (amount is already in paise from frontend)
    const order = await razorpay.orders.create({
      amount, // Do NOT multiply by 100 again
      currency,
      receipt,
      payment_capture: 1,
    });

    return NextResponse.json(
      {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: error?.message || error?.error?.description || "Failed to create order" },
      { status: 500 }
    );
  }
}
