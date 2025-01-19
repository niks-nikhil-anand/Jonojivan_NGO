import connectDB from "@/lib/dbConnect";
import campaignModels from "@/models/campaignModels";
import { NextResponse } from "next/server";



export const PUT = async (request, { params }) => {
  console.log("PUT Request Initiated: Toggle Campaign Status by ID");
  console.log(params);
  const { id } = params;

  if (!id) {
    console.warn("PUT Request Warning: Missing 'id' parameter");
    return NextResponse.json({ msg: "Missing campaign ID" }, { status: 400 });
  }

  console.log("PUT Request Params:", params);
  console.log("PUT Request Campaign ID:", id);

  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connection successful");

    // Get the current campaign status from the request body
    const { status } = await request.json();
    if (!status) {
      console.warn("PUT Request Warning: Missing status parameter");
      return NextResponse.json({ msg: "Missing status parameter" }, { status: 400 });
    }

    // Toggle the status from Active to Pending or Pending to Active
    const newStatus = status === 'Active' ? 'Pending' : 'Active';

    // Find the campaign by ID and update the status
    const campaignData = await campaignModels.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true } // Return the updated campaign data
    );

    if (!campaignData) {
      console.warn("PUT Request: Campaign not found for ID:", id);
      return NextResponse.json({ msg: "Campaign not found" }, { status: 404 });
    }

    console.log("PUT Request: Campaign status updated successfully for ID:", id);
    return NextResponse.json({ msg: `Campaign status updated to ${newStatus}` }, { status: 200 });
  } catch (error) {
    console.error("PUT Request Error:", error);
    return NextResponse.json({ msg: "Error updating campaign status", error: error.message }, { status: 500 });
  }
};
