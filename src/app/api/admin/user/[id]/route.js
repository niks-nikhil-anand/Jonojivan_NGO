import connectDB from "@/lib/dbConnect";
import userModels from "@/models/userModels";
import { NextResponse } from "next/server";


export const GET = async (request, { params }) => {
  const { id } = params;

  console.log("📥 User GET Request - Params:", params);
  console.log("🔍 Fetching user document with ID:", id);

  try {
    await connectDB();

    const user = await userModels.findById(id);

    if (!user) {
      console.warn("⚠️ User not found for ID:", id);
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    console.log("✅ User fetched successfully");
    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return NextResponse.json(
      {
        msg: "Error fetching user",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  const body = await request.json();
  console.log("✏️ PUT User ID:", id, "Payload:", body);

  try {
    await connectDB();
    const updatedUser = await userModels.findByIdAndUpdate(id, body, {
      new: true,
      overwrite: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    console.log("✅ User updated successfully");
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return NextResponse.json({ msg: "Error updating user", error: error.message }, { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { id } = params;
  const updates = await request.json();
  console.log("🩹 PATCH User ID:", id, "Updates:", updates);

  try {
    await connectDB();
    const patchedUser = await userModels.findByIdAndUpdate(id, { $set: updates }, {
      new: true,
      runValidators: true,
    });

    if (!patchedUser) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    console.log("✅ User patched successfully");
    return NextResponse.json(patchedUser, { status: 200 });
  } catch (error) {
    console.error("❌ Error patching user:", error);
    return NextResponse.json({ msg: "Error patching user", error: error.message }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  console.log("🗑️ DELETE User ID:", id);

  try {
    await connectDB();
    const deletedUser = await userModels.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    console.log("✅ User deleted successfully");
    return NextResponse.json({ msg: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    return NextResponse.json({ msg: "Error deleting user", error: error.message }, { status: 500 });
  }
};
