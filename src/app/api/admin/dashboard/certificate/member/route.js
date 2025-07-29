import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import certificateModels from "@/models/certificateModels";
import jwt from "jsonwebtoken";

// GET request to fetch certificates for authenticated member
export const GET = async (request) => {
  try {
    // Get token from cookies
    const token = request.cookies.get("memberAuthToken")?.value;
    
    if (!token) {
      console.warn("GET Request: No authentication token found");
      return NextResponse.json({ msg: "Authentication required" }, { status: 401 });
    }

    // Verify and decode the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded successfully for member:", decoded.memberId);
    } catch (tokenError) {
      console.error("Token verification failed:", tokenError);
      return NextResponse.json({ msg: "Invalid or expired token" }, { status: 401 });
    }

    // Extract member ID from token
    const memberId = decoded.memberId;
    if (!memberId) {
      console.warn("GET Request: Member ID not found in token");
      return NextResponse.json({ msg: "Invalid authentication data" }, { status: 401 });
    }

    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connection successful");
    
    // Find certificates for the authenticated member with populated member data
    const certificateData = await certificateModels
      .find({ member: memberId })
      .populate('member', 'name email') // Optional: populate member details
      .sort({ createdAt: -1 }); // Sort by newest first

    console.log(`Found ${certificateData.length} certificates for member:`, memberId);
    console.log("Certificate data:", certificateData);

    return NextResponse.json({
      msg: certificateData.length > 0 
        ? "Certificates retrieved successfully" 
        : "No certificates found for this member",
      data: certificateData,
      count: certificateData.length
    }, { status: 200 });

  } catch (error) {
    console.error("GET Request Error:", error);
    return NextResponse.json({ 
      msg: "Error fetching certificates", 
      error: error.message 
    }, { status: 500 });
  }
};
