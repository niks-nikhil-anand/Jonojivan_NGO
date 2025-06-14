import connectDB from "@/lib/dbConnect";
import uploadImage from "@/lib/uploadImages";
import { Blog } from "@/models/blogModels";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const formData = await req.formData();
    console.log("Form data received.");

    const title = formData.get("title");
    const content = formData.get("content");
    const featuredImage = formData.get("featuredImage");

    if (!title || !content || !featuredImage) {
      console.error("Missing required fields.");
      return NextResponse.json(
        { msg: "Please provide title, content, and featured image." },
        { status: 400 }
      );
    }

    const featuredImageResult = await uploadImage(featuredImage, "blogImages");

    if (!featuredImageResult.secure_url) {
      console.error("Image upload failed.");
      return NextResponse.json({ msg: "Image upload failed." }, { status: 500 });
    }

    const blogData = {
      title,
      content,
      featuredImage: featuredImageResult.secure_url,
    };

    await Blog.create(blogData);
    console.log("Blog added successfully.");

    return NextResponse.json({ msg: "Blog added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding blog:", error);
    return NextResponse.json(
      { msg: "Error adding blog", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const blogs = await Blog.find().sort({ createdAt: -1 }); // Latest first
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { msg: "Error fetching blogs", error: error.message },
      { status: 500 }
    );
  }
};
