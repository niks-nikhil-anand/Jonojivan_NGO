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

    // Find the campaign by ID
    const campaignData = await campaignModels.findById(id);
    if (!campaignData) {
      console.warn("PUT Request: Campaign not found for ID:", id);
      return NextResponse.json({ msg: "Campaign not found" }, { status: 404 });
    }

    // Get the current status of the campaign
    const currentStatus = campaignData.status;

    // Toggle the status from Active to Pending or Pending to Active
    const newStatus = currentStatus === 'Active' ? 'Pending' : 'Active';

    // Update the campaign status
    const updatedCampaignData = await campaignModels.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true } // Return the updated campaign data
    );

    console.log(updatedCampaignData);

    return NextResponse.json({ msg: `Campaign status updated to ${newStatus}` }, { status: 200 });
  } catch (error) {
    console.error("PUT Request Error:", error);
    return NextResponse.json({ msg: "Error updating campaign status", error: error.message }, { status: 500 });
  }
};
