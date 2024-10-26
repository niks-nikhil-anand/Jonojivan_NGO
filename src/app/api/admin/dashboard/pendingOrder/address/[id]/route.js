import connectDB from "@/lib/dbConnect";
import addressModels from "@/models/addressModels";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ status: "error", msg: "ID parameter is required" }, { status: 400 });
  }

  try {
    await connectDB();

    const address = await addressModels.findById(id);

    if (!address) {
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

  if (!id) {
    return NextResponse.json({ status: "error", msg: "ID parameter is required" }, { status: 400 });
  }

  try {
    await connectDB();

    const address = await addressModels.findByIdAndDelete(id);

    if (!address) {
      return NextResponse.json({ status: "error", msg: "Address not found" }, { status: 404 });
    }

    return NextResponse.json({ status: "success", msg: "Address deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json({ status: "error", msg: "Error deleting address", error: error.message }, { status: 500 });
  }
};
