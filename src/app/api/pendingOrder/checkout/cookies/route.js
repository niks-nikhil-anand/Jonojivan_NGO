import connectDB from "@/lib/dbConnect";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Database connection successful.");

    const cookieStore = cookies();
    const pendingOrder = cookieStore.get("pendingOrder");
    console.log("Retrieved cookies:", cookieStore);

    if (!pendingOrder) {
      console.error("User authentication token is missing.");
      throw new Error("User authentication token is missing.");
    }

    console.log("Pending order cookie found:", pendingOrder.value);

    const decodedToken = jwt.decode(pendingOrder.value);
    console.log("Decoded token:", decodedToken);

    if (!decodedToken || !decodedToken.orderId) {
      console.error("Invalid token. No order ID found.");
      throw new Error("Invalid token.");
    }

    const orderId = decodedToken.orderId;
    console.log("Extracted Order ID:", orderId);

    return NextResponse.json({ orderId }, {
      status: 200,
    });
    
  } catch (error) {
    console.error("Error retrieving Partner:", error);
    return NextResponse.json({ msg: "Error retrieving Partner", error: error.message }, {
      status: 500,
    });
  }
};
