import connectDB from "@/lib/dbConnect";
import Program from "@/models/programModels";
import { NextResponse } from "next/server";

// GET single program by slug
export const GET = async (req, { params }) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const { slug } = params;
    console.log("Fetching program with slug:", slug);

    // Fetch the program by slug
    const program = await Program.findOne({ slug: slug.toLowerCase().trim() }).lean();

    if (!program) {
      console.error("Program not found with slug:", slug);
      return NextResponse.json(
        { message: "Program not found" },
        { status: 404 }
      );
    }

    console.log("Program fetched successfully:", program.title);

    return NextResponse.json(
      {
        message: "Program fetched successfully",
        data: program,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching program:", error);
    return NextResponse.json(
      { message: "Error fetching program", error: error.message },
      { status: 500 }
    );
  }
};
