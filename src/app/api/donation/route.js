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
    const { fullName, emailaddress, panCard, phonenumber, amount, paymentMethod } = body;

    // Optional: Validate PAN format (Example regex for PAN)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (panCard && !panRegex.test(panCard)) {
      console.log("Invalid PAN format:", panCard);
      return NextResponse.json(
        { message: 'Invalid PAN number format.' },
        { status: 400 }
      );
    }
    const phoneRegex = /^\d{10}$/;
    if (phonenumber && !phoneRegex.test(phonenumber)) {
      console.log("Invalid phone number format:", phonenumber);
      return NextResponse.json(
        { message: 'Invalid phone number format.' },
        { status: 400 }
      );
    }

    const donationAmount = amount ? amount : 1000;

    // Save donation to the database
    console.log("Creating donation entry in the database...");
    const donation = await Donation.create({
      fullName,
      email: emailaddress,
      panCardNumber: panCard,
      phoneNumber: phonenumber,
      amount: donationAmount,
      paymentMethod,
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
