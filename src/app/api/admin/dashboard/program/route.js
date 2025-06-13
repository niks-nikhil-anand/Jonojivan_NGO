
import connectDB from "@/lib/dbConnect";
import Program from "@/models/programModels";
import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    // Parse the incoming FormData
    const formData = await req.formData();
    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const slug = formData.get("slug");
    const whatWeDo = formData.get("whatWeDo");
    const description = formData.get("description");
    const image = formData.get("image");

    // Validate required fields
    if (!title || !slug || !whatWeDo || !image) {
      return NextResponse.json(
        { message: "Title, slug, content (What We Do), and image are required" },
        { status: 400 }
      );
    }

    // Check if program with same title or slug already exists
    const existingProgram = await Program.findOne({
      $or: [{ title }, { slug }]
    });

    if (existingProgram) {
      return NextResponse.json(
        { message: "Program with this title or slug already exists" },
        { status: 409 }
      );
    }

    let imagePath = "";

    // Handle image upload if provided
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const timestamp = Date.now();
      const fileExtension = path.extname(image.name);
      const fileName = `program_${timestamp}${fileExtension}`;
      
      // Ensure uploads directory exists
      const uploadsDir = path.join(process.cwd(), "public", "uploads", "programs");
      try {
        await mkdir(uploadsDir, { recursive: true });
      } catch (error) {
        console.log("Directory already exists or error creating:", error.message);
      }

      // Save file
      const filePath = path.join(uploadsDir, fileName);
      await writeFile(filePath, buffer);
      
      // Store relative path for database
      imagePath = `/uploads/programs/${fileName}`;
      console.log("Image saved successfully:", imagePath);
    }

    // Create program data object
    const programData = {
      title: title.trim(),
      subtitle: subtitle?.trim() || "",
      slug: slug.trim().toLowerCase(),
      whatWeDo: whatWeDo.trim(),
      description: description?.trim() || "",
      image: imagePath,
    };

    console.log("Program data to be saved:", {
      ...programData,
      whatWeDo: programData.whatWeDo.substring(0, 100) + "..." // Truncate for logging
    });

    // Save to the database
    const newProgram = await Program.create(programData);
    console.log("Program saved successfully with ID:", newProgram._id);

    return NextResponse.json(
      { 
        message: "Program added successfully",
        program: {
          id: newProgram._id,
          title: newProgram.title,
          slug: newProgram.slug
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error adding program:", error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return NextResponse.json(
        { message: `Program with this ${field} already exists` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Error adding program", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    // Fetch all programs from the database
    const programs = await Program.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .select("-whatWeDo") // Exclude large content field for list view
      .lean(); // Convert to plain JavaScript objects for better performance

    console.log(`Fetched ${programs.length} programs`);

    return NextResponse.json(
      { 
        message: "Programs fetched successfully", 
        data: programs,
        count: programs.length
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching programs:", error);
    return NextResponse.json(
      { message: "Error fetching programs", error: error.message },
      { status: 500 }
    );
  }
};