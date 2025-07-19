import connectDB from "@/lib/dbConnect";
import uploadImage from "@/lib/uploadImages";
import GaribKalyan from "@/models/garibKalyanYojanaModels";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const formData = await req.formData();
    console.log("Form data received.");

    // Extract form fields
    const memberName = formData.get("memberName");
    const contactNumber = formData.get("contactNumber");
    const documentNumber = formData.get("documentNumber");
    const accountNumber = formData.get("accountNumber");
    const referLinkIdCard = formData.get("referLinkIdCard") || "";

    // Extract file uploads
    const photoUpload = formData.get("photoUpload");
    const aadhaarCard = formData.get("aadhaarCard");
    const bankPassbook = formData.get("bankPassbook");

    // Validate required fields
    if (!memberName || !contactNumber || !documentNumber || !accountNumber) {
      console.error("Missing required text fields.");
      return NextResponse.json(
        {
          message:
            "Please provide member name, contact number, document number, and account number.",
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Validate required file uploads
    if (!photoUpload || !aadhaarCard || !bankPassbook) {
      console.error("Missing required file uploads.");
      return NextResponse.json(
        {
          message:
            "Please upload all required documents: photo, Aadhaar card, and bank passbook.",
          error: "Missing required files",
        },
        { status: 400 }
      );
    }

    // Upload images
    console.log("Starting file uploads...");

    const [photoResult, aadhaarResult, bankResult] = await Promise.all([
      uploadImage(photoUpload, "garibKalyan/photos"),
      uploadImage(aadhaarCard, "garibKalyan/aadhaar"),
      uploadImage(bankPassbook, "garibKalyan/bankPassbooks"),
    ]);

    // Check if all uploads were successful
    if (
      !photoResult.secure_url ||
      !aadhaarResult.secure_url ||
      !bankResult.secure_url
    ) {
      console.error("One or more file uploads failed.");
      return NextResponse.json(
        {
          message: "File upload failed. Please try again.",
          error: "File upload error",
        },
        { status: 500 }
      );
    }

    console.log("All files uploaded successfully.");

    // Prepare data for database (mapping frontend field names to schema field names)
    const applicationData = {
      fullName: memberName, // Note: frontend uses 'memberName', schema uses 'fullName'
      contactNumber,
      documentNumber,
      accountNumber,
      referLinkIdCard,
      photoUpload: photoResult.secure_url,
      aadhaarCard: aadhaarResult.secure_url,
      bankPassbook: bankResult.secure_url,
      applicationStatus: "pending",
    };

    // Save to database
    const newApplication = await GaribKalyan.create(applicationData);
    console.log(
      "Garib Kalyan Yojana application submitted successfully:",
      newApplication._id
    );

    return NextResponse.json(
      {
        message:
          "Garib Kalyan Yojana application submitted successfully! We will review your application and contact you soon.",
        applicationId: newApplication._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting Garib Kalyan Yojana application:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        {
          message: "Validation failed",
          error: validationErrors.join(", "),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Error submitting application. Please try again.",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const applications = await GaribKalyan.find(); 
    // console.log(applications)

    return NextResponse.json(
      {
        applications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Garib Kalyan Yojana applications:", error);
    return NextResponse.json(
      {
        message: "Error fetching applications",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
