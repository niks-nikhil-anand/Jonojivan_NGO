import connectDB from "@/lib/dbConnect";
import addressModels from "@/models/addressModels";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;

  console.log("GET request received. ID:", id); // Debugging ID in GET request

  if (!id) {
    console.log("ID parameter is missing in GET request");
    return NextResponse.json({ status: "error", msg: "ID parameter is required" }, { status: 400 });
  }

  try {
    await connectDB();
    console.log("Database connected successfully for GET request");

    const address = await addressModels.findById(id);
    console.log("Address data fetched:", address); // Debug fetched address data

    if (!address) {
      console.log("Address not found with ID:", id);
      return NextResponse.json({ status: "error", msg: "Address not found" }, { status: 404 });
    }

    return NextResponse.json({ status: "success", data: address }, { status: 200 });
  } catch (error) {
    console.error("Error fetching address:", error);
    return NextResponse.json({ status: "error", msg: "Error fetching address", error: error.message }, { status: 500 });
  }
};


export const DELETE = async (request, { params }) => {
  const { id } = params;

  console.log("DELETE request received. ID:", id); // Debugging ID in DELETE request

  if (!id) {
    console.log("ID parameter is missing in DELETE request");
    return NextResponse.json({ status: "error", msg: "ID parameter is required" }, { status: 400 });
  }

  try {
    await connectDB();
    console.log("Database connected successfully for DELETE request");

    const address = await addressModels.findByIdAndDelete(id);
    console.log("Address data deleted:", address); // Debug deleted address data

    if (!address) {
      console.log("Address not found for deletion with ID:", id);
      return NextResponse.json({ status: "error", msg: "Address not found" }, { status: 404 });
    }

    return NextResponse.json({ status: "success", msg: "Address deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json({ status: "error", msg: "Error deleting address", error: error.message }, { status: 500 });
  }
};
