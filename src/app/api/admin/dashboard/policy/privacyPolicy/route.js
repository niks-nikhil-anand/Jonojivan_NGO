import connectDB from "@/lib/dbConnect";
import privacyPolicyModels from "@/models/privacyPolicyModels";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const formData = await req.formData();
    console.log("Form data received.");

    const content = formData.get("content");

    if (!content) {
      console.error("Missing required fields.");
      return NextResponse.json({ msg: "Please provide the privacy policy content." }, { status: 400 });
    }
    await privacyPolicyModels.updateOne({}, { $set: { content } }, { upsert: true });

    console.log("Privacy policy updated successfully.");
    return NextResponse.json({ msg: "Privacy policy updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating privacy policy:", error);
    return NextResponse.json({ msg: "Error updating privacy policy", error: error.message }, { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const privacyPolicy = await privacyPolicyModels.findOne(); 
    console.log("Fetched privacy policy:");
    return NextResponse.json(privacyPolicy, { status: 200 });
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    return NextResponse.json({ msg: "Error fetching privacy policy", error: error.message }, { status: 500 });
  }
};
