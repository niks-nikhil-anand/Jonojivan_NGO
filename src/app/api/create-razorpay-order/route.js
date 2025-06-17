import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(req) {
  try {
    const { amount, currency, receipt } = await req.json();

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
      return NextResponse.json(
        { error: "Razorpay credentials are missing." },
        { status: 400 }
      );
    }
    const orderOptions = {
      amount,
      currency: currency || "INR",
      receipt: receipt || `receipt_${new Date().getTime()}`,
      payment_capture: 1,
    };
    const order = await razorpayInstance.orders.create(orderOptions);
    if (!order || !order.id) {
      return NextResponse.json(
        { error: "Failed to create Razorpay order. Please try again." },
        { status: 500 }
      );
    }
    console.log(order);
    return NextResponse.json({
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create Razorpay order. Please try again." },
      { status: 500 }
    );
  }
}
