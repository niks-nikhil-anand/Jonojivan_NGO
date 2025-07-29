import connectDB from "@/lib/dbConnect";
import certificateModels from "@/models/certificateModels";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    console.log("Database is connecting")
    await connectDB();
    console.log("Database is connected")


    const certificates = await certificateModels.find()
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