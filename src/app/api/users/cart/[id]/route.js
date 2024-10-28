import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import productModels from "@/models/productModels";
import cartModels from "@/models/cartModels";

// Helper function to calculate total price
const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || 0;
    return total + itemPrice * itemQuantity;
  }, 0);
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
      return NextResponse.json({ msg: "User authentication token is missing." }, { status: 401 });
    }

    const decodedToken = jwt.decode(authToken.value);
    console.log("Decoded token:", decodedToken);

    if (!decodedToken || !decodedToken.id) {
      return NextResponse.json({ msg: "Invalid token." }, { status: 401 });
    }

    const userId = decodedToken.id;
    console.log('User ID from token:', userId);

    let cart = await cartModels.findOne({ userId });
    console.log('Fetched cart for user:', cart);

    if (!cart) {
      // Create a new cart if one does not exist
      cart = new cartModels({
        userId,
        items: [{ productId: id, quantity: 1, price: product.originalPrice }],
        totalPrice: product.originalPrice,
      });
      console.log('Created new cart:', cart);
    } else {
      if (!cart.items) {
        cart.items = [];
      }

      const itemInCart = cart.items.find(item => item.productId.toString() === id);

      if (itemInCart) {
        // Update the quantity if the product is already in the cart
        itemInCart.quantity += 1;
        console.log('Updated product quantity in cart:', itemInCart);
      } else {
        // Add the new product to the cart
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

// List products in the cart
export const GET = async (request) => {
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
      return NextResponse.json({ msg: "Cart not found", items: [], totalPrice: 0 }, { status: 404 });
    }

    return NextResponse.json({ msg: "Cart retrieved successfully", items: cart.items, totalPrice: cart.totalPrice }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    return NextResponse.json({ msg: "Error retrieving cart", error: error.message }, { status: 500 });
  }
};

// Update the quantity of a product in the cart

export const PUT = async (request, { params }) => {
  const { id } = params; // This is the user ID, not the product ID
  const { items } = await request.json(); // Get the items array from the request body

  console.log('Request Params:', params);
  console.log('User ID:', id);
  console.log('Updated Cart Items:', items);

  try {
    await connectDB();
    console.log('Database connected.');

    const cookieStore = cookies();
    const authToken = cookieStore.get("userAuthToken");

    if (!authToken) {
      return NextResponse.json({ msg: "User authentication token is missing." }, { status: 401 });
    }

    const decodedToken = jwt.decode(authToken.value);
    const userId = decodedToken?.id;

    if (!userId) {
      return NextResponse.json({ msg: "Invalid token." }, { status: 401 });
    }

    const cart = await cartModels.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ msg: "Cart not found" }, { status: 404 });
    }

    // Update the cart with the new items
    items.forEach(({ productId, quantity }) => {
      const itemInCart = cart.items.find(item => item.productId.toString() === productId);
      
      if (itemInCart) {
        if (quantity <= 0) {
          // Optionally remove item from cart if quantity is 0
          cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        } else {
          // Update existing item's quantity
          itemInCart.quantity = quantity;
        }
      } else if (quantity > 0) {
        // Add new item to cart if it doesn't exist
        cart.items.push({ productId, quantity });
      }
    });

    // Recalculate total price
    cart.totalPrice = calculateTotalPrice(cart.items);
    await cart.save();

    return NextResponse.json({ msg: "Cart updated successfully", cart }, { status: 200 });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ msg: "Error updating cart", error: error.message }, { status: 500 });
  }
};

// Remove a product from the cart
export const DELETE = async (request, { params }) => {
  const { id: productId } = params; // Rename id to productId for clarity
  console.log('Request Params:', params);
  console.log('Product ID:', productId);

  try {
    await connectDB();
    console.log('Database connected.');

    const cookieStore = cookies();
    const authToken = cookieStore.get("userAuthToken");
    console.log('Auth token:', authToken);

    if (!authToken) {
      return NextResponse.json({ msg: "User authentication token is missing." }, { status: 401 });
    }

    const decodedToken = jwt.decode(authToken.value);
    console.log("Decoded token:", decodedToken);

    if (!decodedToken || !decodedToken.id) {
      return NextResponse.json({ msg: "Invalid token." }, { status: 403 });
    }

    const userId = decodedToken.id;
    console.log('User ID from token:', userId);

    // Find the user's cart
    const cart = await cartModels.findOne({ userId });
    console.log('Fetched cart for user:', cart);

    if (!cart) {
      return NextResponse.json({ msg: "Cart not found" }, { status: 404 });
    }

    // Check if cart items exist
    if (!cart.items || cart.items.length === 0) {
      return NextResponse.json({ msg: "Cart is empty" }, { status: 400 });
    }

    // Find the index of the product to remove
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
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

    // Save the updated cart
    await cart.save();
    console.log('Cart saved after deletion:', cart);

    return NextResponse.json({ msg: "Product removed from cart successfully" }, { status: 200 });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return NextResponse.json({ msg: "Error removing product from cart", error: error.message }, { status: 500 });
  }
};

// Clear the entire cart
export const DELETE_CART = async (request) => {
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

    // Clear the cart
    cart.items = [];
    cart.totalPrice = 0;
    console.log('Cleared cart:', cart);

    await cart.save();
    console.log('Cart saved after clearing:', cart);

    return NextResponse.json({ msg: "Cart cleared successfully" }, { status: 200 });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json({ msg: "Error clearing cart", error: error.message }, { status: 500 });
  }
};
