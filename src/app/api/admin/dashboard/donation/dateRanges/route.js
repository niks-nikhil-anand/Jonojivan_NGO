import connectDB from "@/lib/dbConnect";
import Donation from "@/models/donationModels";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Ensure that the database is connected
    await connectDB();
    console.log('Database connected successfully.');

    console.log('Incoming GET request to donation endpoint...');

    // Extract query parameters using URL API
    const url = new URL(req.url, `http://${req.headers.host}`);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    console.log(startDate, endDate);

    // Check if both dates are provided and are valid
    if (!startDate || !endDate) {
      console.log('Start Date or End Date is missing.');
      return NextResponse.json({ message: 'Start Date and End Date are required.' }, { status: 400 });
    }

    // Parse the dates from query parameters (ensuring they're in UTC)
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Check for invalid date formats
    if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
      console.log('Invalid date format.');
      return NextResponse.json({ message: 'Invalid date format.' }, { status: 400 });
    }

    // Build the filter object based on the date range
    const filter = {
      createdAt: {
        $gte: parsedStartDate.toISOString(), // Convert to ISO string to ensure UTC comparison
        $lte: parsedEndDate.toISOString(),   // Convert to ISO string to ensure UTC comparison
      },
    };

    console.log('Filter applied:', filter);

    // Fetch donations from the database based on the filter
    const donations = await Donation.find(filter);

    // If no donations found, return a 404 response
    if (donations.length === 0) {
      console.log('No donations found for the specified date range.');
      return NextResponse.json({ message: 'No donations found' }, { status: 404 });
    }

    console.log(`Found ${donations.length} donations.`);

    // Return the donations in the response
    return NextResponse.json({ donations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { message: 'Failed to fetch donations', error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
