import connectDB from "@/lib/dbConnect";
import addressModels from "@/models/addressModels";
import cartModels from "@/models/cartModels";
import pendingOrderModel from "@/models/pendingOrder"; 
import userModels from "@/models/userModels";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const POST = async (req) => {
  try {
    await connectDB();

    const body = await req.json();
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
      return NextResponse.json({ msg: "Please provide all the required fields." }, { status: 400 });
    }

    // Check if the user exists
    let userId = null;
    const existingUser = await userModels.findOne({ email });

    if (existingUser) {
      userId = existingUser._id;
    }

    // Check if a cart exists and update it, otherwise create a new cart
    let existingCart = await cartModels.findOne({ userId });
    if (existingCart) {
      existingCart.items = cart.map(item => ({
        productId: item.id, // Update this line to match your schema
        quantity: item.quantity,
        price: item.price || 0 // Assuming price is included in the cart item, or set it to 0 if not
      }));
      await existingCart.save();
    } else {
      existingCart = new cartModels({
        userId,
        items: cart.map(item => ({
          productId: item.id, // Update this line to match your schema
          quantity: item.quantity,
          price: item.price || 0 // Assuming price is included in the cart item, or set it to 0 if not
        })),
      });
      await existingCart.save();
    }

    // Check if an address exists and update it, otherwise create a new address
    let existingAddress = await addressModels.findOne({ user: userId });
    if (existingAddress) {
      existingAddress.firstName = firstName;
      existingAddress.lastName = lastName;
      existingAddress.address = address;
      existingAddress.apartment = apartment;
      existingAddress.landmark = landmark;
      existingAddress.city = city;
      existingAddress.state = state;
      existingAddress.pinCode = pinCode;
      existingAddress.mobileNumber = mobileNumber;
      await existingAddress.save();
    } else {
      existingAddress = new addressModels({
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
        user: userId,
      });
      await existingAddress.save();
    }

    let existingPendingOrder = await pendingOrderModel.findOne({ user: userId, isCheckoutCompleted: false });
    if (existingPendingOrder) {
      existingPendingOrder.cart = existingCart._id;
      existingPendingOrder.address = existingAddress._id;
      await existingPendingOrder.save();
    } else {
      existingPendingOrder = new pendingOrderModel({
        user: userId,
        cart: existingCart._id,
        address: existingAddress._id,
        isCheckoutCompleted: true,
        isDeliveryConfirmed: false,
        isPaymentCompleted: false,
      });
      await existingPendingOrder.save();
    }

    const token = generateToken({   
      orderId: existingPendingOrder._id,
      cartId: existingCart._id,
      addressId: existingAddress._id,
      userId: userId,
    });

    // Set the cookie with the token
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
    return NextResponse.json({ msg: "Error processing request", error: error.message }, { status: 500 });
  }
};

function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1w' });
}
