import { NextResponse } from 'next/server'; // Import NextResponse
import connectDB from "@/lib/dbConnect";
import paymentModels from "@/models/paymentModels";

export async function GET(req) {
    try {
      console.log('Incoming GET request to payments razorpay endpoint...');
  
      // Connect to the database
      await connectDB();
  
      // Fetch all payment entries from the database
      const payments = await paymentModels.find();
  
      // If no payments found, return an empty array
      if (payments.length === 0) {
        return NextResponse.json({ message: 'No payments found' }, { status: 404 });
      }
  
      console.log(payments);
      return NextResponse.json({ payments }, { status: 200 });
    } catch (error) {
      console.error('Error fetching payments:', error);
      return NextResponse.json(
        { message: 'Failed to fetch payments', error: 'Internal server error.' },
        { status: 500 }
      );
    }
}
