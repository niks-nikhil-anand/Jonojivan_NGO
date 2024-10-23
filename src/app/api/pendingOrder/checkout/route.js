import connectDB from "@/lib/dbConnect";
import addressModels from "@/models/addressModels";
import cartModels from "@/models/cartModels";
import pendingOrderModel from "@/models/pendingOrder"; 
import userModels from "@/models/userModels";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';



export const POST = async (req) => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Connected to the database.");

    const body = await req.json();
    console.log("Request body received:", body);

    const {
      email,
      firstName,
      lastName,
      address,
      apartment,
      mobileNumber, // Already formatted with country code
      state,
      landmark,
      city,
      pinCode,
      subscribeChecked,
      cart,
    } = body;

    console.log("Received values:", {
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
    });

    // Validate required fields
    if (!email || !firstName || !lastName || !address || !mobileNumber || !state || !city || !pinCode || !cart) {
      console.log("Validation failed: Missing required fields.");
      return NextResponse.json({ msg: "Please provide all the required fields." }, { status: 400 });
    }

    // Check if the user exists
    let userId = null;
    const existingUser = await userModels.findOne({ email });

    if (existingUser) {
      console.log("User found:", existingUser._id);
      userId = existingUser._id;
    } else {
      console.log("User not found. Proceeding without a user.");
    }

    // Check if a cart exists and update it, otherwise create a new cart
    let existingCart = await cartModels.findOne({ userId });
    if (existingCart) {
      existingCart.products = cart.products;
      existingCart.totalPrice = cart.totalPrice || 0;
      await existingCart.save();
      console.log("Cart updated:", existingCart);
    } else {
      existingCart = new cartModels({
        userId,
        products: cart.products,
        totalPrice: cart.totalPrice || 0,
      });
      await existingCart.save();
      console.log("New cart created:", existingCart);
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
      console.log("Address updated:", existingAddress);
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
      console.log("New address created:", existingAddress);
    }

    let existingPendingOrder = await pendingOrderModel.findOne({ user: userId, isCheckoutCompleted: false });
    if (existingPendingOrder) {
      existingPendingOrder.cart = existingCart._id;
      existingPendingOrder.address = existingAddress._id;
      await existingPendingOrder.save();
      console.log("Pending order updated:", existingPendingOrder);
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
      console.log("New pending order created:", existingPendingOrder);
    }

   
   

      console.log('Generating token...');
      const token = generateToken({   
        orderId: existingPendingOrder._id,
        cartId: existingCart._id,
        addressId: existingAddress._id,
        userId: userId,});


      // Set the cookie with the token
      console.log('Setting cookie with token...');

      const response = NextResponse.json({ msg: "Order processed successfully.", orderId: existingPendingOrder._id }, { status: 200 });
      response.cookies.set('pendingOrder', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', 
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 , // 1 month if 'rememberMe', otherwise 1 week
          path: '/'
      });

      console.log('Response with cookie:', response);
      console.log('Generated token:', token);
      

    return response
  } catch (error) {
    console.log("Error processing request:", error.message);
    return NextResponse.json({ msg: "Error processing request", error: error.message }, { status: 500 });
  }
};


function generateToken(user) {
    console.log('Generating token for user:', user);
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1w' });
}
