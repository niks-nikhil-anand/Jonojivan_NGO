import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import productModels from "@/models/productModels";
import cartModels from "@/models/cartModels";

// Helper function to calculate total price
const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Add a product to the cart
export const POST = async (request, { params }) => {
  const { id } = params;
  console.log('Request Params:', params);
  console.log('ID:', id);

  try {
    await connectDB();
    console.log('Database connected.');

    const product = await productModels.findById(id);
    console.log('Fetched product:', product);

    if (!product) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }

    const cookieStore = cookies();
    const authToken = cookieStore.get("userAuthToken");
    console.log('Auth token:', authToken);

    if (!authToken) {
      throw new Error("User authentication token is missing.");
    }

    const decodedToken = jwt.decode(authToken.value);
    console.log("Decoded token:", decodedToken);

    if (!decodedToken || !decodedToken.id) {
      throw new Error("Invalid token.");
    }

    const userId = decodedToken.id;
    console.log('User ID from token:', userId);

    let cart = await cartModels.findOne({ userId });
    console.log('Fetched cart for user:', cart);

    if (!cart) {
      // If no cart exists for the user, create a new one
      cart = new cartModels({
        userId,
        items: [{ productId: id, quantity: 1, price: product.originalPrice }],
        totalPrice: product.originalPrice,
      });
      console.log('Created new cart:', cart);
    } else {
      // Initialize items array if undefined
      if (!cart.items) {
        cart.items = [];
      }

      // If the product is already in the cart, update the quantity
      const itemInCart = cart.items.find(item => item.productId.toString() === id);

      if (itemInCart) {
        itemInCart.quantity += 1;
        console.log('Updated product quantity in cart:', itemInCart);
      } else {
        // If the product is not in the cart, add it
        cart.items.push({ productId: id, quantity: 1, price: product.originalPrice });
        console.log('Added new product to cart:', cart.items);
      }

      // Recalculate total price
      cart.totalPrice = calculateTotalPrice(cart.items);
      console.log('Updated total price:', cart.totalPrice);
    }

    await cart.save();
    console.log('Cart saved:', cart);

    return NextResponse.json({ msg: "Product added to cart successfully" }, { status: 200 });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return NextResponse.json({ msg: "Error adding product to cart", error: error.message }, { status: 500 });
  }
};

// Remove a product from the cart
export const DELETE = async (request, { params }) => {
  const { id } = params;
  console.log('Request Params:', params);
  console.log('ID:', id);

  try {
    await connectDB();
    console.log('Database connected.');

    const cookieStore = cookies();
    const authToken = cookieStore.get("userAuthToken");
    console.log('Auth token:', authToken);

    if (!authToken) {
      throw new Error("User authentication token is missing.");
    }

    const decodedToken = jwt.decode(authToken.value);
    console.log("Decoded token:", decodedToken);

    if (!decodedToken || !decodedToken.id) {
      throw new Error("Invalid token.");
    }

    const userId = decodedToken.id;
    console.log('User ID from token:', userId);

    const cart = await cartModels.findOne({ userId });
    console.log('Fetched cart for user:', cart);

    if (!cart) {
      return NextResponse.json({ msg: "Cart not found" }, { status: 404 });
    }

    // Initialize items array if undefined
    if (!cart.items) {
      cart.items = [];
    }

    // Find the product in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === id);
    console.log('Product index in cart:', itemIndex);

    if (itemIndex === -1) {
      return NextResponse.json({ msg: "Product not found in cart" }, { status: 404 });
    }

    // Remove the product from the cart
    cart.items.splice(itemIndex, 1);
    console.log('Removed product from cart:', cart.items);

    // Recalculate total price
    cart.totalPrice = calculateTotalPrice(cart.items);
    console.log('Updated total price:', cart.totalPrice);

    await cart.save();
    console.log('Cart saved after deletion:', cart);

    return NextResponse.json({ msg: "Product removed from cart successfully" }, { status: 200 });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return NextResponse.json({ msg: "Error removing product from cart", error: error.message }, { status: 500 });
  }
};
