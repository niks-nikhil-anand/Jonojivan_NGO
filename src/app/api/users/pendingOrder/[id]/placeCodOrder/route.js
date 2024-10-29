import connectDB from "@/lib/dbConnect";
import cartModels from "@/models/cartModels";
import orderModels from "@/models/orderModels";
import pendingOrder from "@/models/pendingOrder";
import userModels from "@/models/userModels";
import addressModels from "@/models/addressModels";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
    try {
        console.log("Connecting to the database...");
        await connectDB();

        const { id } = params; // Use id as user ID from params
        console.log('User ID from params:', id);

        const { 
            orderId, 
            cartId, 
            addressId, 
            paymentMethod, 
            rememberMe, 
            contactInfo, 
            products, 
            totalAmount 
        } = await req.json();

        console.log("Request data:", {
            orderId,
            cartId,
            addressId,
            paymentMethod,
            rememberMe,
            contactInfo,
            products,
            totalAmount
        });

        // Fetch the user by ID
        let user = await userModels.findById(id);
        console.log("Found user:", user);

        if (!user) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }

        // Fetch the existing cart by cartId
        let cart = await cartModels.findById(cartId);
        if (cart) {
            console.log("Fetched cart:", cart);
        } else {
            // Create a new cart if it doesn't exist
            console.log("Creating a new cart...");
            cart = new cartModels({ 
                userId: user._id,
                items: products.map(product => ({
                    productId: product.productId,
                    quantity: product.quantity,
                    price: product.price,
                })) 
            });
            await cart.save();
            console.log("New cart created:", cart);
        }

        // Fetch the existing address by addressId
        let address = await addressModels.findById(addressId);
        if (!address) {
            console.log("Creating a new address...");
            address = new addressModels({
                firstName: contactInfo.firstName,
                lastName: contactInfo.lastName,
                address: contactInfo.address,
                apartment: contactInfo.apartment,
                email: contactInfo.email,
                mobileNumber: contactInfo.mobileNumber,
                state: contactInfo.state,
                city: contactInfo.city,
                landmark: contactInfo.landmark,
                typeOfAddress: contactInfo.typeOfAddress || 'Home',
                User: user._id,
            });
            await address.save();
            console.log("New address created:", address);
        } else {
            console.log("Fetched existing address:", address);
        }

        // Create the new order
        console.log("Creating a new order...");
        const newOrder = new orderModels({
            user: user._id,
            contactInfo,
            totalAmount,
            cart: cart._id,
            address: address._id,
            paymentMethod,
        });
        await newOrder.save();
        console.log("New order created:", newOrder);

        // Delete the specific pending order associated with orderId
        await pendingOrder.deleteOne({ _id: orderId });
        console.log("Deleted specific pending order with orderId:", orderId);

        return NextResponse.json({ msg: "Order processed successfully", order: newOrder });

    } catch (error) {
        console.error('Error processing order:', error);
        return NextResponse.json({ msg: "Error processing order", error: error.message || error }, { status: 500 });
    }
};
