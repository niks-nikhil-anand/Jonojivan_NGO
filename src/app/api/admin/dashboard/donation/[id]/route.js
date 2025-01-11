import Donation from "@/models/donationModels";


export const GET = async (request, { params }) => {
  const id = params.id; // Use the correct parameter key
  console.log("Request Params:", params);
  console.log("ID:", id);

  try {
    await connectDB();

    // Find the category by ID and populate subcategories
    const category = await categoryModels.findById(id);

    if (!category) {
      return NextResponse.json({ msg: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { msg: "Error fetching category", error: error.message },
      { status: 500 }
    );
  }
};
import { NextResponse } from 'next/server';
import connectDB from '@/utils/connectDB';
import Donation from '@/models/Donation';

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

