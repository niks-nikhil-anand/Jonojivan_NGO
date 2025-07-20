import connectDB from "@/lib/dbConnect";
import memberModels from "@/models/memberModels";
import userModels from "@/models/userModels";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Database connection established.");

    // Parse the JSON body of the request
    const { email, password, rememberMe } = await req.json();
    console.log("Received request with:", { email, password, rememberMe });

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { msg: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find the user by email and populate basic info
    console.log("Finding user by email:", email);
    const user = await userModels.findOne({ email }).select('+password');

    // If user not found, return 401
    if (!user) {
      console.log("User not found:", email);
      return NextResponse.json(
        { msg: "Invalid email or password" }, 
        { status: 401 }
      );
    }

    // Compare the provided password with the hashed password in the database
    console.log("Comparing passwords...");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match for email:", email);
      return NextResponse.json(
        { msg: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if the user's role matches the required role first
    console.log("Checking user role...");
    if (user.role !== "Member") {
      console.log("User role is not authorised:", user.role);
      return NextResponse.json(
        { msg: "Access denied. Member role required." }, 
        { status: 403 }
      );
    }

    // Find member details using the user ID with full validation
    console.log("Finding member details for user:", user._id);
    const member = await memberModels.findOne({ user: user._id });

    // Check if member profile exists
    if (!member) {
      console.log("Member profile not found for user:", user._id);
      return NextResponse.json(
        { msg: "Member profile not found. Please contact administrator." },
        { status: 404 }
      );
    }

    // Comprehensive membership status validation
    console.log("Checking member status...");
    
    // Check if member status is Active
    if (member.membershipStatus !== "Active") {
      const statusMessage = {
        'Pending': 'Your membership is pending approval.',
        'Suspended': 'Your membership has been suspended.',
        'Inactive': 'Your membership is inactive. Please contact administrator.',
        'Rejected': 'Your membership application was rejected.',
        'Expired': 'Your membership has expired. Please renew.'
      };
      
      console.log("Member status is not Active:", member.membershipStatus);
      return NextResponse.json(
        { 
          msg: statusMessage[member.membershipStatus] || "Member account is not active",
          membershipStatus: member.membershipStatus
        },
        { status: 403 }
      );
    }

    // Generate a JWT token with comprehensive user data
    console.log("Generating token...");
    const tokenExpiry = rememberMe ? "30d" : "7d";
    const tokenPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
      memberId: member._id,
      membershipId: member.membershipId,
      membershipStatus: member.membershipStatus,
      post: member.post,
      committee: member.committee,
      isVerified: member.isVerified
    };

    const token = generateToken(tokenPayload, tokenExpiry);

    // Prepare response data
    const responseData = {
      msg: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      member: {
        membershipId: member.membershipId,
        membershipStatus: member.membershipStatus,
        post: member.post,
        committee: member.committee,
        subCommittee: member.subCommittee,
        paymentStatus: member.paymentStatus,
        membershipExpiryDate: member.membershipExpiryDate,
        daysUntilExpiry: member.daysUntilExpiry,
        isVerified: member.isVerified
      }
    };

    const response = NextResponse.json(responseData, { status: 200 });

    // Set the cookie with the token
    console.log("Setting cookie with token...");
    response.cookies.set("memberAuthToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7,
      path: "/",
    });

    console.log("Login successful for user:", email);
    return response;
  } catch (error) {
    console.error("Error processing login:", error);
    return NextResponse.json(
      { msg: "Error processing login", error: error.message },
      { status: 500 }
    );
  }
};

// Function to generate a JWT token
function generateToken(payload, expiresIn = "7d") {
  console.log("Generating token for payload:", payload);
  
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}
