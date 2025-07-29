import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import certificateModels from "@/models/certificateModels";

// GET request to fetch a certificate by its ID
export const GET = async (request, { params }) => {
  console.log("GET Request Initiated: Fetch Certificate by ID");

  const { id } = params; 
  if (!id) {
    console.warn("GET Request Warning: Missing 'id' parameter");
    return NextResponse.json({ msg: "Missing certificate ID" }, { status: 400 });
  }

  console.log("GET Request Params:", params);
  console.log("GET Request Certificate ID:", id);

  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connection successful");

    const certificateData = await certificateModels.findById(id);
    if (!certificateData) {
      console.warn("GET Request: Certificate not found for ID:", id);
      return NextResponse.json({ msg: "Certificate not found" }, { status: 404 });
    }

    console.log("GET Request: Certificate found:", certificateData);
    return NextResponse.json(certificateData, { status: 200 });
  } catch (error) {
    console.error("GET Request Error:", error);
    return NextResponse.json({ msg: "Error fetching certificate", error: error.message }, { status: 500 });
  }
};

// PUT request to completely replace a certificate by its ID
export const PUT = async (request, { params }) => {
  console.log("PUT Request Initiated: Replace Certificate by ID");

  const { id } = params;
  if (!id) {
    console.warn("PUT Request Warning: Missing 'id' parameter");
    return NextResponse.json({ msg: "Missing certificate ID" }, { status: 400 });
  }

  console.log("PUT Request Params:", params);
  console.log("PUT Request Certificate ID:", id);

  try {
    const body = await request.json();
    console.log("PUT Request Body:", body);

    if (!body || Object.keys(body).length === 0) {
      console.warn("PUT Request Warning: Empty request body");
      return NextResponse.json({ msg: "Request body cannot be empty" }, { status: 400 });
    }

    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connection successful");

    // Use findByIdAndUpdate with overwrite option to replace the entire document
    const updatedCertificate = await certificateModels.findByIdAndUpdate(
      id,
      body,
      { 
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
        overwrite: true // Replace the entire document
      }
    );

    if (!updatedCertificate) {
      console.warn("PUT Request: Certificate not found for ID:", id);
      return NextResponse.json({ msg: "Certificate not found" }, { status: 404 });
    }

    console.log("PUT Request: Certificate replaced successfully:", updatedCertificate);
    return NextResponse.json({
      msg: "Certificate replaced successfully",
      data: updatedCertificate
    }, { status: 200 });

  } catch (error) {
    console.error("PUT Request Error:", error);
    return NextResponse.json({ 
      msg: "Error replacing certificate", 
      error: error.message 
    }, { status: 500 });
  }
};

// PATCH request to partially update a certificate by its ID
export const PATCH = async (request, { params }) => {
  console.log("PATCH Request Initiated: Update Certificate by ID");

  const { id } = params;
  if (!id) {
    console.warn("PATCH Request Warning: Missing 'id' parameter");
    return NextResponse.json({ msg: "Missing certificate ID" }, { status: 400 });
  }

  console.log("PATCH Request Params:", params);
  console.log("PATCH Request Certificate ID:", id);

  try {
    const body = await request.json();
    console.log("PATCH Request Body:", body);

    if (!body || Object.keys(body).length === 0) {
      console.warn("PATCH Request Warning: Empty request body");
      return NextResponse.json({ msg: "Request body cannot be empty" }, { status: 400 });
    }

    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connection successful");

    // Use findByIdAndUpdate for partial updates
    const updatedCertificate = await certificateModels.findByIdAndUpdate(
      id,
      { $set: body }, // Only update the fields provided in the body
      { 
        new: true, // Return the updated document
        runValidators: true // Run schema validators
      }
    );

    if (!updatedCertificate) {
      console.warn("PATCH Request: Certificate not found for ID:", id);
      return NextResponse.json({ msg: "Certificate not found" }, { status: 404 });
    }

    console.log("PATCH Request: Certificate updated successfully:", updatedCertificate);
    return NextResponse.json({
      msg: "Certificate updated successfully",
      data: updatedCertificate
    }, { status: 200 });

  } catch (error) {
    console.error("PATCH Request Error:", error);
    return NextResponse.json({ 
      msg: "Error updating certificate", 
      error: error.message 
    }, { status: 500 });
  }
};

// DELETE request to delete a certificate by its ID
export const DELETE = async (request, { params }) => {
  console.log("DELETE Request Initiated: Delete Certificate by ID");

  const { id } = params; 
  if (!id) {
    console.warn("DELETE Request Warning: Missing 'id' parameter");
    return NextResponse.json({ msg: "Missing certificate ID" }, { status: 400 });
  }

  console.log("DELETE Request Params:", params);
  console.log("DELETE Request Certificate ID:", id);

  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connection successful");

    const certificateData = await certificateModels.findByIdAndDelete(id);
    if (!certificateData) {
      console.warn("DELETE Request: Certificate not found for ID:", id);
      return NextResponse.json({ msg: "Certificate not found" }, { status: 404 });
    }

    console.log("DELETE Request: Certificate deleted successfully for ID:", id);
    return NextResponse.json({ 
      msg: "Certificate deleted successfully",
      data: certificateData 
    }, { status: 200 });
  } catch (error) {
    console.error("DELETE Request Error:", error);
    return NextResponse.json({ 
      msg: "Error deleting certificate", 
      error: error.message 
    }, { status: 500 });
  }
};
