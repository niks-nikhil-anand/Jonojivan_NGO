import connectDB from "@/lib/dbConnect";
import Donation from "@/models/donationModels";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Ensure that the database is connected
    await connectDB();
    console.log('Database connected successfully.');

    console.log('Incoming GET request to donation endpoint...');

    // Extract startDate and endDate from query parameters
    const { startDate, endDate } = req.query;

    // Check if both dates are provided and are valid
    if (!startDate || !endDate) {
      console.log('Start Date or End Date is missing.');
      return NextResponse.json({ message: 'Start Date and End Date are required.' }, { status: 400 });
    }

    // Parse the dates from query parameters
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Check for invalid date formats
    if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
      console.log('Invalid date format.');
      return NextResponse.json({ message: 'Invalid date format.' }, { status: 400 });
    }

    // Build the filter object based on the date range
    const filter = {
      date: {
        $gte: parsedStartDate, // Greater than or equal to startDate
        $lte: parsedEndDate,   // Less than or equal to endDate
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
