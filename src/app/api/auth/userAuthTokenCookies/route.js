import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import connectDB from "@/lib/dbConnect";
import userModels from '@/models/userModels';

export const GET = async (req) => {
  try {
    console.log("Starting the GET request...");

    // Connect to the database
    await connectDB();
    console.log("Database connected successfully.");

    // Retrieve the auth token from cookies
    const cookieStore = cookies();
    const authToken = cookieStore.get("userAuthToken");
    console.log("Fetched auth token:", authToken); // Check if token is being retrieved properly

    if (!authToken) {
      console.error("Error: User authentication token is missing.");
      throw new Error("User authentication token is missing.");
    }

    // Decode the JWT token
    let decodedToken;
    try {
      decodedToken = jwt.verify(authToken.value, process.env.JWT_SECRET);
      console.log("Decoded token:", decodedToken);
    } catch (jwtError) {
      console.error("JWT verification failed:", jwtError);
      throw new Error("Invalid token.");
    }

    // Ensure token contains the email
    if (!decodedToken || !decodedToken.email) {
      console.error("Decoded token is missing email.");
      throw new Error("Invalid token.");
    }

    const email = decodedToken.email;
    console.log("Decoded email from token:", email);

    // Fetch the user using the email
    const User = await userModels.findOne({ email });
    console.log("Fetched user:", User);

    if (!User) {
      console.error("Error: User not found for email:", email);
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    console.log("User found. Returning data.");
    return NextResponse.json(User, { status: 200 });

  } catch (error) {
    console.error("Error retrieving User:", error);
    return NextResponse.json({ msg: "Error retrieving User", error: error.message }, { status: 500 });
  }
};
