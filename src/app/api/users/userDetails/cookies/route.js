import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import connectDB from "@/lib/dbConnect";
import userModels from "@/models/userModels";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    console.log("Starting GET request...");

    await connectDB();
    console.log("Database connected.");

    const cookieStore = cookies();
    const authToken = cookieStore.get("userAuthToken");
    console.log("Auth token from cookies:", authToken);

    if (!authToken) {
      throw new Error("User authentication token is missing.");
    }

    const decodedToken = jwt.decode(authToken.value);
    console.log("Decoded token:", decodedToken);

    if (!decodedToken || !decodedToken.id) {
      throw new Error("Invalid token.");
    }

    const id = decodedToken.id;
    console.log("User ID from token:", id);

    const User = await userModels.find({ _id : id });
    console.log("User retrieved from database:", User);

    return NextResponse.json(User, {
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving Partner:", error);
    return NextResponse.json({ msg: "Error retrieving Partner", error: error.message }, {
      status: 500,
    });
  }
};
