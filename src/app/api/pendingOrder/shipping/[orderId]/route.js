import connectDB from "@/lib/dbConnect";
import pendingOrder from "@/models/pendingOrder";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  const { id } = params;

  console.log("POST request received. ID:", id); // Debugging ID in POST request

  if (!id) {
    console.log("ID parameter is missing in POST request");
    return NextResponse.json({ status: "error", msg: "ID parameter is required" }, { status: 400 });
  }

  try {
    await connectDB();
    console.log("Database connected successfully for POST request");

    // Fetch pending order
    const order = await pendingOrder.findById(id);
    console.log("Order data fetched:", order); // Debug fetched order data

    if (!order) {
      console.log("Order not found with ID:", id);
      return NextResponse.json({ status: "error", msg: "Order not found" }, { status: 404 });
    }

    // Update `isShippingConfirmed` to true
    order.isShippingConfirmed = true;
    await order.save();
    console.log("Order updated with isShippingConfirmed: true");

    return NextResponse.json({ status: "success", data: order }, { status: 200 });
  } catch (error) {
    console.error("Error updating order shipping status:", error);
    return NextResponse.json({ status: "error", msg: "Error updating order", error: error.message }, { status: 500 });
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
