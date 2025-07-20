import connectDB from "@/lib/dbConnect";
import memberModels from "@/models/memberModels";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;

  console.log("📥 Member GET Request - Params:", params);
  console.log("🔍 Fetching member document with ID:", id);

  try {
    await connectDB();

    const member = await memberModels.findById(id);

    if (!member) {
      console.warn("⚠️ Member not found for ID:", id);
      return NextResponse.json({ msg: "Member not found" }, { status: 404 });
    }

    console.log("✅ Member fetched successfully");
    return NextResponse.json(member, { status: 200 });

  } catch (error) {
    console.error("❌ Error fetching member:", error);
    return NextResponse.json(
      {
        msg: "Error fetching member",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  const body = await request.json();
  console.log("✏️ PUT Member ID:", id, "Payload:", body);

  try {
    await connectDB();
    const updatedMember = await memberModels.findByIdAndUpdate(id, body, {
      new: true,
      overwrite: true,
      runValidators: true,
    });

    if (!updatedMember) {
      return NextResponse.json({ msg: "Member not found" }, { status: 404 });
    }

    console.log("✅ Member updated successfully");
    return NextResponse.json(updatedMember, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating member:", error);
    return NextResponse.json({ msg: "Error updating member", error: error.message }, { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { id } = params;
  const updates = await request.json();
  console.log("🩹 PATCH Member ID:", id, "Updates:", updates);

  try {
    await connectDB();
    const patchedMember = await memberModels.findByIdAndUpdate(id, { $set: updates }, {
      new: true,
      runValidators: true,
    });

    if (!patchedMember) {
      return NextResponse.json({ msg: "Member not found" }, { status: 404 });
    }

    console.log("✅ Member patched successfully");
    return NextResponse.json(patchedMember, { status: 200 });
  } catch (error) {
    console.error("❌ Error patching member:", error);
    return NextResponse.json({ msg: "Error patching member", error: error.message }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  console.log("🗑️ DELETE Member ID:", id);

  try {
    await connectDB();
    const deletedMember = await memberModels.findByIdAndDelete(id);

    if (!deletedMember) {
      return NextResponse.json({ msg: "Member not found" }, { status: 404 });
    }

    console.log("✅ Member deleted successfully");
    return NextResponse.json({ msg: "Member deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting member:", error);
    return NextResponse.json({ msg: "Error deleting member", error: error.message }, { status: 500 });
  }
};
