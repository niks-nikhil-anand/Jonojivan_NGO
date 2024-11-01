import connectDB from "@/lib/dbConnect";
import addressModels from "@/models/addressModels";
import cartModels from "@/models/cartModels";
import pendingOrderModel from "@/models/pendingOrder"; 
import userModels from "@/models/userModels";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const POST = async (request, { params }) => {
  try {
    await connectDB();
    console.log('Database connected.');

    const { id } = params;  // Using id as user ID
    console.log('Request Params:', params);
    console.log('User ID:', id);

    const body = await request.json();
    console.log('Request Body:', body);

    const {
      email,
      firstName,
      lastName,
      address,
      apartment,
      mobileNumber, 
      state,
      landmark,
      city,
      pinCode,
      subscribeChecked,
      cart,
    } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !address || !mobileNumber || !state || !city || !pinCode || !cart) {
      console.warn('Missing required fields:', { email, firstName, lastName, address, mobileNumber, state, city, pinCode, cart });
      return NextResponse.json({ msg: "Please provide all the required fields." }, { status: 400 });
    }

    let existingCart = await cartModels.findOne({ userId: id });
    if (existingCart) {
      console.log('Existing cart found, updating:', existingCart);
      existingCart.items = cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price || 0 
      }));
      await existingCart.save();
    } else {
      console.log('Creating new cart.');
      existingCart = new cartModels({
        userId: id,
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price || 0 
        })),
      });
      await existingCart.save();
    }

    // Create a new address without checking for an existing one
    console.log('Creating new address.');
    const newAddress = new addressModels({
      firstName,
      lastName,
      address,
      apartment,
      landmark,
      city,
      state,
      pinCode,
      email,
      mobileNumber,
      user: id,
    });
    await newAddress.save();

    // Update user with new address ID
    await userModels.findByIdAndUpdate(id, { $push: { address: newAddress._id } });

    // Check if a pending order exists and update it, otherwise create a new pending order
    let existingPendingOrder = await pendingOrderModel.findOne({ user: id, isCheckoutCompleted: false });
    if (existingPendingOrder) {
      console.log('Existing pending order found, updating:', existingPendingOrder);
      existingPendingOrder.cart = existingCart._id;
      existingPendingOrder.address = newAddress._id;
      await existingPendingOrder.save();
    } else {
      console.log('Creating new pending order.');
      existingPendingOrder = new pendingOrderModel({
        user: id,
        cart: existingCart._id,
        address: newAddress._id,
        isCheckoutCompleted: true,
        isShippingConfirmed: false,
        isPaymentCompleted: false,
      });
      await existingPendingOrder.save();
    }

    const token = generateToken({   
      orderId: existingPendingOrder._id,
      cartId: existingCart._id,
      addressId: newAddress._id,
      userId: id,
    });
    console.log('Generated JWT Token:', token);

    const response = NextResponse.json({ msg: "Order processed successfully.", orderId: existingPendingOrder._id }, { status: 200 });
    response.cookies.set('pendingOrder', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, 
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ msg: "Error processing request", error: error.message }, { status: 500 });
  }
};

function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1w' });
}
