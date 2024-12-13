import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Campaign from "@/models/campaign"; // Capitalize model name for consistency


// GET request to fetch a campaign by its ID
export const GET = async (request, { params }) => {
  const { id } = params; // Destructure 'id' directly from params
  console.log('Request Params:', params); // Log all request params
  console.log('Campaign ID:', id); // Log the ID parameter

  try {
    // Establish a connection to the database
    await connectDB();

    // Fetch campaign by ID
    const campaignData = await Campaign.findById(id); // Use 'Campaign' instead of lowercase 'campaign'

    // Check if campaign exists
    if (!campaignData) {
      return NextResponse.json({ msg: "Campaign not found" }, { status: 404 });
    }

    // Return the campaign data with a successful response
    return NextResponse.json(campaignData, {
      status: 200
    });
  } catch (error) {
    console.error('Error fetching campaign:', error);
    return NextResponse.json({ msg: "Error fetching campaign", error: error.message }, {
      status: 500
    });
  }
};

// DELETE request to delete a campaign by its ID
export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    // Establish a connection to the database
    await connectDB();

    // Delete the campaign by ID
    const campaignData = await Campaign.findByIdAndDelete(id);

    // Check if campaign was found and deleted
    if (!campaignData) {
      return NextResponse.json({ msg: "Campaign not found" }, { status: 404 });
    }

    // Return success message
    return NextResponse.json({ msg: "Campaign deleted successfully" }, {
      status: 200
    });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return NextResponse.json({ msg: "Error deleting campaign", error: error.message }, {
      status: 500
    });
  }
};
