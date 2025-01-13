import connectDB from "@/lib/dbConnect";
import Donation from "@/models/donationModels";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const id = params.id; // Use the correct parameter key
  console.log("Request Params:", params);
  console.log("ID:", id);

  try {
    // Connect to the database
    await connectDB();

    // Find the donation by ID
    const donation = await Donation.findById(id);

    if (!donation) {
      return NextResponse.json({ msg: "Donation not found" }, { status: 404 });
    }

    return NextResponse.json(donation, { status: 200 });
  } catch (error) {
    console.error("Error fetching donation:", error);
    return NextResponse.json(
      { msg: "Error fetching donation", error: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (request, { params }) => {
  const id = params.id; // Extract the donation ID from parameters

  console.log("Request Params:", params);
  console.log("Donation ID:", id);

  try {
    await connectDB(); // Ensure the database is connected

    const donation = await Donation.findByIdAndDelete(id); // Delete the donation by ID

    if (!donation) {
      return NextResponse.json({ msg: "Donation not found" }, { status: 404 });
    }

    return NextResponse.json({ msg: "Donation deleted successfully" }, {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting donation:", error);
    return NextResponse.json(
      { msg: "Error deleting donation", error: error.message },
      { status: 500 },
    );
  }
};

