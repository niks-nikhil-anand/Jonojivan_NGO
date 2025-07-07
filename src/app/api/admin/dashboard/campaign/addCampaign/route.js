import connectDB from "@/lib/dbConnect";
import uploadImage from "@/lib/uploadImages";
import campaignModels from "@/models/campaignModels";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const formData = await req.formData();
    console.log("Received form data:", formData);
    const title = formData.get("title");
    const description = formData.get("description");
    const goal = formData.get("goal");
    const image = formData.get("image");
    const content = formData.get("content");

    console.log("Parsed form data:", { title, description, goal, content });

    if (!title || !description || !goal || !image || !content) {
      console.error("Missing required fields.");
      return NextResponse.json({ msg: "Please provide all the required fields." }, { status: 400 });
    }

    const imageUploadResult = await uploadImage(image, "campaignImages"); 
    console.log("Image upload result:", imageUploadResult);

    if (!imageUploadResult.secure_url) {
      console.error("Image upload failed.");
      return NextResponse.json({ msg: "Image upload failed." }, { status: 500 });
    }

    const imageUrl = imageUploadResult.secure_url;
    console.log("Image URL:", imageUrl);

    const campaignData = {
      title,
      description,
      goal,
      image: imageUrl,
      status: "Pending",
      content // Ensure that content is included in the campaignData
    };

    console.log("Campaign data to be saved:", campaignData);

    // Save the campaign data to the database
    await campaignModels.create(campaignData);
    console.log("Campaign added successfully.");
    return NextResponse.json({ msg: "Campaign added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding campaign:", error);
    return NextResponse.json({ msg: "Error adding campaign", error: error.message }, { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const campaigns = await campaignModels.find(); 
    console.log("Fetched campaigns:", campaigns);
    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json({ msg: "Error fetching campaigns", error: error.message }, { status: 500 });
  }
};
