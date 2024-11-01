import connectDB from "@/lib/dbConnect";
import cartModels from "@/models/cartModels";
import { NextResponse } from "next/server";


export const GET = async (request, { params }) => {
  try {
    await connectDB();
    console.log('Database connected.');

    const { cartId } = params;  // Assuming cartId is passed in params
    console.log('Request Params:', params);

    // Find the cart by cartId
    const cart = await cartModels.findById(cartId);
    console.log('Cart Retrieved:', cart);

    if (!cart) {
      console.log('Cart not found for cartId:', cartId);
      return NextResponse.json({ msg: "Cart not found" }, { status: 404 });
    }

    console.log('Processing order for cartId:', cartId);

    // Return a response with the pending order details
    return NextResponse.json({ msg: "Order processed", cart }, { status: 200 });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ msg: "Error processing request", error: error.message }, { status: 500 });
  }
};