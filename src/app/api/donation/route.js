import connectDB from '@/lib/dbConnect';
import Donation from '@/models/donationModels';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const body = await req.json();
    console.log("Request body:", body);

    // Destructure the correct keys from the request body
    const { fullName, emailaddress, panCard, phonenumber, amount, paymentMethod, razorpay_order_id, razorpay_payment_id } = body;

    // Set default donation amount if not provided
    const donationAmount = amount || 1000;

    // Save donation to the database
    console.log("Creating donation entry in the database...");
    const donation = await Donation.create({
      fullName,
      email: emailaddress, // Adjust field name
      panCardNumber: panCard,
      phoneNumber: phonenumber, // Adjust field name
      amount: donationAmount,
      paymentMethod,
      razorpayOrderId: razorpay_order_id, // Save Razorpay order ID
      razorpayPaymentId: razorpay_payment_id, // Save Razorpay payment ID
    });
    console.log("Donation saved:", donation);

    return NextResponse.json(
      { message: 'Donation successful', donation },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing donation:', error);
    return NextResponse.json(
      { message: 'Donation failed', error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
