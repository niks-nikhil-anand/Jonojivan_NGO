import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Campaign from "@/models/campaignModels"; // Capitalize model name for consistency

// GET request to fetch a campaign by its ID
export const GET = async (request, { params }) => {
  console.log("GET Request Initiated: Fetch Campaign by ID");

  const { id } = params; 
  if (!id) {
    console.warn("GET Request Warning: Missing 'id' parameter");
    return NextResponse.json({ msg: "Missing campaign ID" }, { status: 400 });
  }

  console.log("GET Request Params:", params);
  console.log("GET Request Campaign ID:", id);

  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connection successful");

    const campaignData = await Campaign.findById(id);
    if (!campaignData) {
      console.warn("GET Request: Campaign not found for ID:", id);
      return NextResponse.json({ msg: "Campaign not found" }, { status: 404 });
    }

    console.log("GET Request: Campaign found:", campaignData);
    return NextResponse.json(campaignData, { status: 200 });
  } catch (error) {
    console.error("GET Request Error:", error);
    return NextResponse.json({ msg: "Error fetching campaign", error: error.message }, { status: 500 });
  }
};

// DELETE request to delete a campaign by its ID
export const DELETE = async (request, { params }) => {
  console.log("DELETE Request Initiated: Delete Campaign by ID");
  console.log(params);
  const { id } = params; 
  if (!id) {
    console.warn("DELETE Request Warning: Missing 'id' parameter");
    return NextResponse.json({ msg: "Missing campaign ID" }, { status: 400 });
  }

  console.log("DELETE Request Params:", params);
  console.log("DELETE Request Campaign ID:", id);

  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connection successful");

    const campaignData = await Campaign.findByIdAndDelete(id);
    if (!campaignData) {
      console.warn("DELETE Request: Campaign not found for ID:", id);
      return NextResponse.json({ msg: "Campaign not found" }, { status: 404 });
    }

    console.log("DELETE Request: Campaign deleted successfully for ID:", id);
    return NextResponse.json({ msg: "Campaign deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Request Error:", error);
    return NextResponse.json({ msg: "Error deleting campaign", error: error.message }, { status: 500 });
  }
};
