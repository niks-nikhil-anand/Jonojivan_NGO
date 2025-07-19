import connectDB from "@/lib/dbConnect";
import GaribKalyan from "@/models/garibKalyanYojanaModels";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;

  console.log("📥 Garib Kalyan Yojana GET Request - Params:", params);
  console.log("🔍 Fetching document with ID:", id);

  try {
    await connectDB();

    const yojana = await GaribKalyan.findById(id);

    if (!yojana) {
      console.warn("⚠️ Garib Kalyan Yojana not found for ID:", id);
      return NextResponse.json({ msg: "Garib Kalyan Yojana not found" }, { status: 404 });
    }

    console.log("✅ Garib Kalyan Yojana fetched successfully");
    return NextResponse.json(yojana, { status: 200 });

  } catch (error) {
    console.error("❌ Error fetching Garib Kalyan Yojana:", error);
    return NextResponse.json(
      {
        msg: "Error fetching Garib Kalyan Yojana",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  const body = await request.json();
  console.log("✏️ PUT Garib Kalyan ID:", id, "Payload:", body);

  try {
    await connectDB();
    const updatedYojana = await GaribKalyan.findByIdAndUpdate(id, body, {
      new: true,
      overwrite: true,
      runValidators: true,
    });

    if (!updatedYojana) {
      return NextResponse.json({ msg: "Garib Kalyan Yojana not found" }, { status: 404 });
    }

    return NextResponse.json(updatedYojana, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Error updating yojana", error: error.message }, { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { id } = params;
  const updates = await request.json();
  console.log("🩹 PATCH Garib Kalyan ID:", id, "Updates:", updates);

  try {
    await connectDB();
    const patchedYojana = await GaribKalyan.findByIdAndUpdate(id, { $set: updates }, {
      new: true,
      runValidators: true,
    });

    if (!patchedYojana) {
      return NextResponse.json({ msg: "Garib Kalyan Yojana not found" }, { status: 404 });
    }

    return NextResponse.json(patchedYojana, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Error patching yojana", error: error.message }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  console.log("🗑️ DELETE Garib Kalyan ID:", id);

  try {
    await connectDB();
    const deletedYojana = await GaribKalyan.findByIdAndDelete(id);

    if (!deletedYojana) {
      return NextResponse.json({ msg: "Garib Kalyan Yojana not found" }, { status: 404 });
    }

    return NextResponse.json({ msg: "Garib Kalyan Yojana deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Error deleting yojana", error: error.message }, { status: 500 });
  }
};
