import connectDB from "@/lib/dbConnect";
import contactUsModels from "@/models/contactUsModels";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    // Parse the incoming request body
    const body = await req.json();
    const { first_name, last_name, email, phone_number, message } = body;

    // Validate required fields
    if (!first_name || !last_name || !email || !phone_number || !message) {
      return NextResponse.json(
        { msg: "All fields are required" },
        { status: 400 }
      );
    }

    // Create data object to save
    const contactData = {
        firstName:first_name,
        lastName:last_name,
         email,
      mobileNumber:phone_number,
      message,
    };

    console.log("Contact data to be saved:", contactData);

    // Save to the database
    await contactUsModels.create(contactData);
    console.log("Contact data saved successfully.");

    return NextResponse.json(
      { msg: "Contact data saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving contact data:", error);
    return NextResponse.json(
      { msg: "Error saving contact data", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    // Fetch all contact data from the database
    const contacts = await contactUsModels.find();
    console.log("Fetched contact data:", contacts);

    return NextResponse.json(
      { msg: "Contact data fetched successfully", data: contacts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return NextResponse.json(
      { msg: "Error fetching contact data", error: error.message },
      { status: 500 }
    );
  }
};
