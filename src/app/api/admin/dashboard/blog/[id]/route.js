import connectDB from "@/lib/dbConnect";
import { Blog } from "@/models/blogModels";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params; // Directly destructure 'id'
  console.log('Request Params:', params); // Log all request params
  console.log('ID:', id); // Log the ID parameter

  try {
    await connectDB();

    const blog = await Blog.findById(id);
    
    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, {
      status: 200
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ msg: "Error fetching blog", error: error.message }, {
      status: 500
    });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connectDB();

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ msg: "Blog deleted successfully" }, {
      status: 200
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ msg: "Error deleting blog", error: error.message }, {
      status: 500
    });
  }
};
