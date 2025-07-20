import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import connectDB from "@/lib/dbConnect";
import userModels from '@/models/userModels';
import memberModels from '@/models/memberModels';

export const GET = async (req) => {
  try {
    console.log("Starting the GET request...");

    // Connect to the database
    await connectDB();
    console.log("Database connected successfully.");

    // Retrieve the auth token from cookies
    const cookieStore = cookies();
    const authToken = cookieStore.get("memberAuthToken");
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

    // Ensure token contains the id
    if (!decodedToken || !decodedToken.id) {
      console.error("Decoded token is missing id.");
      throw new Error("Invalid token.");
    }

    const id = decodedToken.id;
    console.log("Decoded id from token:", id);

    // Fetch the member using the id and populate the user field
    const member = await memberModels.findOne({ user: id }).populate('user');

    if (!member) {
      console.error("Error: Member not found for id:", id);
      return NextResponse.json({ msg: "Member not found" }, { status: 404 });
    }

    console.log("Member found. Returning data.");
    return NextResponse.json(member, { status: 200 });

  } catch (error) {
    console.error("Error retrieving Member:", error);
    return NextResponse.json({ msg: "Error retrieving Member", error: error.message }, { status: 500 });
  }
};
