import connectDB from "@/lib/dbConnect";
import memberModels from "@/models/memberModels";
import User from "@/models/userModels";
import uploadImage from "@/lib/uploadImages";
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
  console.log("🩹 PATCH Member ID:", id);

  try {
    await connectDB();

    // Check content type to determine how to parse body
    const contentType = request.headers.get("content-type") || "";
    let updates = {};
    let imageFile = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const entries = Array.from(formData.entries());

      // Separate image and other fields
      for (const [key, value] of entries) {
        if (key === "image" && value instanceof File) {
          imageFile = value;
        } else if (key !== "image") {
          // Handle nested keys if any, though FormData usually is flat
          // For now, assume flat keys that match schema or simple dot notation if manually structured
          updates[key] = value;
        }
      }
    } else {
      updates = await request.json();
    }

    console.log("📝 Updates received:", Object.keys(updates));

    // 1. Handle Image Upload if present
    if (imageFile) {
      console.log("🖼️ Uploading new profile image...");
      // Import needed dynamically if not at top, but usually imports are top-level. 
      // Assuming uploadImage is imported or needs to be. 
      // It was not imported in the original file, so we need to add the import or check if it's available.
      // Checking imports... 'uploadImage' is NOT imported in the original file view for [id]/route.js.
      // I will add the import in a separate tool call to be safe, or I should have checked imports.
      // To be safe, I'll rely on the existing imports in the file which I saw earlier.
      // Wait, I saw imports in `api/member/route.js` but `api/member/[id]/route.js` only had `connectDB`, `memberModels`, `NextResponse`.
      // I need to ADD `import uploadImage from "@/lib/uploadImages";` and `import User from "@/models/userModels";` to this file first.

      // I will assume I can add imports in a separate `replace_file_content` or `multi_replace_file_content`.
      // For this block, I will write the logic assuming imports exist.

      const imageResult = await uploadImage(imageFile, "member/profiles");
      if (imageResult.secure_url) {
        updates.profileImage = imageResult.secure_url;
        console.log("✅ New image uploaded:", updates.profileImage);
      }
    }

    // 2. Separate User updates vs Member updates if necessary
    // The current Schema structure: Member -> has `user` ref. 
    // Usually updates to name/email go to User model, rest to Member.
    // However, the Edit Form in frontend seems to send everything.

    // We should first fetch the member to get the User ID
    const member = await memberModels.findById(id);
    if (!member) {
      return NextResponse.json({ msg: "Member not found" }, { status: 404 });
    }

    // Identify User fields (Name, Email, Mobile, ProfilePic)
    const userUpdates = {};
    if (updates.name) userUpdates.fullName = updates.name;
    if (updates['user.fullName']) userUpdates.fullName = updates['user.fullName'];
    if (updates.email) userUpdates.email = updates.email;
    if (updates['user.email']) userUpdates.email = updates['user.email'];
    if (updates.mobile) userUpdates.mobileNumber = updates.mobile;
    if (updates['user.mobileNumber']) userUpdates.mobileNumber = updates['user.mobileNumber'];
    if (updates.profileImage) userUpdates.profilePic = updates.profileImage; // Sync profile pic

    // 3. Update User Model
    if (Object.keys(userUpdates).length > 0) {
      console.log("👤 Updating Linked User:", member.user, userUpdates);
      await User.findByIdAndUpdate(member.user, { $set: userUpdates });
    }

    // 4. Update Member Model
    // Remove user-specific fields from updates to avoid schema strict mode issues if any,
    // though Mongoose usually ignores unknowns.
    // We explicitly set fields that belong to Member.
    // Also handle nested `user.x` keys from FormData if they leaked in.
    const memberUpdates = { ...updates };
    delete memberUpdates.name;
    delete memberUpdates.email;
    delete memberUpdates.mobile;
    delete memberUpdates['user.fullName'];
    delete memberUpdates['user.email'];
    delete memberUpdates['user.mobileNumber'];

    // If we have a new profile image, ensure it updates in Member too
    if (updates.profileImage) memberUpdates.profileImage = updates.profileImage;

    const patchedMember = await memberModels.findByIdAndUpdate(id, { $set: memberUpdates }, {
      new: true,
      runValidators: true,
    }).populate('user');

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
