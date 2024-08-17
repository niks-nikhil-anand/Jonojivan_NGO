import connectDB from "@/lib/dbConnect";
import uploadImage from "@/lib/uploadImages";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import WelcomeEmail from "@/emails/welcomeEmail";
import { generateRandomToken, generateVerifyLink } from "@/lib/verifyUserToken";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const formData = await req.formData();
    console.log("Form data received:", formData);

    const companyName = formData.get("companyName");
    const email = formData.get("email");
    const mobileNumber = formData.get("mobileNumber");
    const password = formData.get("password");
    const city = formData.get("city");
    const state = formData.get("state");
    const officeAddress = formData.get("officeAddress");

    if (!companyName || !email || !mobileNumber || !password || !city || !state || !officeAddress) {
      console.log("Missing required fields:", { companyName, email, mobileNumber, password, city, state, officeAddress });
      return NextResponse.json({ msg: "Please provide all the required fields." }, { status: 400 });
    }

    // Add +91 prefix to mobile number
    const formattedMobileNumber = `+91 ${mobileNumber}`;
    console.log("Formatted mobile number:", formattedMobileNumber);

    const logo = formData.get("logo");
    let logoUrl = "";

    if (logo) {
      console.log("Uploading logo...");
      const uploadResult = await uploadImage(logo, "partnerLogos");
      logoUrl = uploadResult.secure_url;
      console.log("Logo upload result:", uploadResult);
    } else {
      console.log("No logo uploaded.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const partnerData = {
      companyName,
      email,
      mobileNumber: formattedMobileNumber,
      password: hashedPassword,
      city,
      state,
      officeAddress,
      profilePic: logoUrl,
    };

    console.log("Partner data to be saved:", partnerData);

    // Create user and save in the database
    console.log("Creating user in the database...");
    const user = new userModel(partnerData);
    await user.save();
    console.log("User created:", user);

    // Generate verification token and link
    const token = generateRandomToken();
    const expiration = new Date(Date.now() + 3600000); 
    console.log("Generated token and expiration:", { token, expiration });
    
    
    console.log("User updated with token and expiry.");
    await userModel.updateOne(
      { _id: user._id },
      { $set: { isToken: token, isVerifiedExpires: expiration } }
    );

    const verifyLink = generateVerifyLink(token);
    console.log("Generated verification link:", verifyLink);

    console.log("Sending welcome email to:", email);
    await resend.emails.send({
      from: 'no-reply@flyingalpha.in',
      to: email,
      subject: 'Welcome to FlyingAlpha',
      react: <WelcomeEmail username={companyName} activationLink={verifyLink} />,
    });
    console.log("Welcome email sent.");

    return NextResponse.json({ msg: "Partner added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding partner:", error);
    return NextResponse.json({ msg: "Error adding partner", error: error.message }, { status: 500 });
  }
};
