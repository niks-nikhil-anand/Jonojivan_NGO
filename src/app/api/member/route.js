import connectDB from "@/lib/dbConnect";
import uploadImage from "@/lib/uploadImages";
import User from "@/models/userModels";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import memberModels from "@/models/memberModels";

export const POST = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const formData = await req.formData();
    console.log("Form data received.");

    // Extract form fields from React form
    const name = formData.get("name");
    const gender = formData.get("gender");
    const mobile = formData.get("mobile");
    const whatsapp = formData.get("whatsapp");
    const email = formData.get("email");
    const adhaar = formData.get("adhaar");
    const guardianName = formData.get("guardianName");
    const guardianMobile = formData.get("guardianMobile");
    const maritalStatus = formData.get("maritalStatus");
    const address = formData.get("address");
    const country = formData.get("country");
    const state = formData.get("state");
    const district = formData.get("district");
    const committee = formData.get("committee");
    const subCommittee = formData.get("subCommittee");
    const joiningState = formData.get("joiningState");
    const post = formData.get("post");
    const supportingAmount = formData.get("supportingAmount");
    const pincode = formData.get("pincode");
    const password = formData.get("password");
    const image = formData.get("image");

    // Validate required fields
    const requiredFields = {
      name,
      gender,
      mobile,
      email,
      adhaar,
      guardianName,
      guardianMobile,
      maritalStatus,
      address,
      state,
      district,
      committee,
      subCommittee,
      joiningState,
      post,
      supportingAmount,
      pincode,
      password
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields);
      return NextResponse.json(
        {
          message: `Please provide all required fields: ${missingFields.join(", ")}`,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Check if user with email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "A user with this email already exists.",
          error: "Email already exists",
        },
        { status: 400 }
      );
    }

    // Check if member with Adhaar already exists
    const existingMember = await memberModels.findOne({ adhaarNumber: adhaar });
    if (existingMember) {
      return NextResponse.json(
        {
          message: "A member with this Adhaar number already exists.",
          error: "Adhaar already exists",
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Handle image upload if provided
    let profileImageUrl = '';
    if (image) {
      console.log("Uploading profile image...");
      const imageResult = await uploadImage(image, "member/profiles");
      if (imageResult.secure_url) {
        profileImageUrl = imageResult.secure_url;
        console.log("Profile image uploaded successfully.");
      } else {
        console.error("Profile image upload failed.");
        return NextResponse.json(
          {
            message: "Profile image upload failed. Please try again.",
            error: "Image upload error",
          },
          { status: 500 }
        );
      }
    }

    // Create User first
    const userData = {
      fullName: name,
      email: email.toLowerCase(),
      mobileNumber: mobile,
      password: hashedPassword,
      profilePic: profileImageUrl,
      role: 'User',
      status: 'Pending'
    };

    const newUser = await User.create(userData);
    console.log("User created successfully:", newUser._id);

    // Create Member with reference to User
    const memberData = {
      user: newUser._id,
      gender,
      whatsappNumber: whatsapp || '',
      adhaarNumber: adhaar,
      guardianName,
      guardianMobile,
      maritalStatus,
      address,
      country: country || 'India',
      state,
      district,
      pincode,
      committee,
      subCommittee,
      joiningState,
      post,
      supportingAmount: parseInt(supportingAmount),
      profileImage: profileImageUrl,
      membershipStatus: 'Pending',
      paymentStatus: 'Pending'
    };

    const newMember = await memberModels.create(memberData);
    console.log("Member registration successful:", newMember._id);

    // Populate user details in response
    await newMember.populate('user', 'fullName email mobileNumber profilePic');

    return NextResponse.json(
      {
        message: "Member registration submitted successfully! We will review your application and contact you soon.",
        member: {
          membershipId: newMember.membershipId,
          fullName: newUser.fullName,
          email: newUser.email,
          committee: newMember.committee,
          subCommittee: newMember.subCommittee,
          post: newMember.post,
          membershipStatus: newMember.membershipStatus,
          registrationDate: newMember.registrationDate
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error submitting member registration:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        {
          message: "Validation failed",
          error: validationErrors.join(", "),
        },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        {
          message: `A record with this ${field} already exists.`,
          error: "Duplicate entry",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Error submitting registration. Please try again.",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const members = await memberModels.find().populate("user");

    console.log(`Retrieved ${members.length} members`);

    return NextResponse.json(
      {
        members,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      {
        message: "Error fetching members",
        error: error.message,
      },
      { status: 500 }
    );
  }
};