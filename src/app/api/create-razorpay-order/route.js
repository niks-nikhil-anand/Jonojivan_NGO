import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay instance with your credentials
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Your Razorpay key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Your Razorpay key secret
});

export async function POST(req) {
  try {
    const { amount, currency, receipt } = await req.json();

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
      return NextResponse.json(
        { error: 'Razorpay credentials are missing.' },
        { status: 400 }
      );
    }

    // Razorpay order creation payload
    const orderOptions = {
      amount, // Amount in paise (1 INR = 100 paise)
      currency: currency || "INR",
      receipt: receipt || `receipt_${new Date().getTime()}`,
      payment_capture: 1,
    };

    // Create the Razorpay order
    const order = await razorpayInstance.orders.create(orderOptions);

    // Return the order details in the response
    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);

    // Log the error more clearly
    if (error?.response?.error) {
      console.error('Razorpay error details:', error.response.error);
    }

    return NextResponse.json(
      { error: 'Failed to create Razorpay order. Please try again.' },
      { status: 500 }
    );
  }
}
