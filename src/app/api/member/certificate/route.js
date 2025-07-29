import connectDB from "@/lib/dbConnect";
import certificateModels from "@/models/certificateModels";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    // Get the token from cookies
    const token = req.cookies.get("memberAuthToken")?.value;
    
    if (!token) {
      console.error("No authentication token found");
      return NextResponse.json(
        { msg: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify and decode the token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error("Invalid token:", error);
      return NextResponse.json(
        { msg: "Invalid authentication token" },
        { status: 401 }
      );
    }

    const memberId = decodedToken.memberId;
    console.log("Member ID from token:", memberId);

    // Parse the JSON body of the request
    const { fullName, email, certificateType } = await req.json();
    console.log("Certificate request data received:", { fullName, email, certificateType });

    // Validate required fields
    if (!fullName || !email || !certificateType ) {
      console.error("Missing required fields");
      return NextResponse.json(
        { msg: "Please provide all required fields: fullName, email, certificateType, and category" },
        { status: 400 }
      );
    }

    // Create the certificate data
    const certificateData = {
      name: fullName,
      member: memberId,
      email: email.trim(),
      category : certificateType,
      status: "Pending" 
    };

    console.log(certificateData)

    // Save the certificate request
    const newCertificate = await certificateModels.create(certificateData);
    console.log("Certificate request created successfully:", newCertificate._id);

    return NextResponse.json(
      { 
        msg: "Certificate request submitted successfully",
        certificateId: newCertificate._id,
        status: newCertificate.status
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error processing certificate request:", error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { msg: "Validation error", errors: validationErrors },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      // Duplicate key error
      return NextResponse.json(
        { msg: "A certificate request with this information already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { msg: "Error processing certificate request", error: error.message },
      { status: 500 }
    );
  }
};

// Optional: Add a GET method to retrieve user's certificate requests
export const GET = async (req) => {
  try {
    await connectDB();

    // Get the token from cookies
    const token = req.cookies.get("memberAuthToken")?.value;
    
    if (!token) {
      return NextResponse.json(
        { msg: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify and decode the token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { msg: "Invalid authentication token" },
        { status: 401 }
      );
    }

    const memberId = decodedToken.memberId;

    // Get all certificate requests for this member
    const certificates = await Certificate.find({ member: memberId })
      .populate('member', 'membershipId')
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { 
        msg: "Certificate requests retrieved successfully",
        certificates 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error retrieving certificate requests:", error);
    return NextResponse.json(
      { msg: "Error retrieving certificate requests", error: error.message },
      { status: 500 }
    );
  }
};
