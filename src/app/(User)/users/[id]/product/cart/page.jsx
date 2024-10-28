"use client";
import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Loader from '@/components/loader/loader';

const Cart = () => {
  const [cart, setCart] = useState([]); // Store cart data from the API
  const [products, setProducts] = useState([]); // Store product details
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const urlPath = window.location.pathname;
    const userId = urlPath.split('/')[2]; // Extract userId

    const fetchCart = async () => {
      if (userId) { // Ensure userId is available
        try {
          const response = await axios.get(`/api/users/cart/${userId}`);
          const fetchedCart = response.data.items; // Access items directly
          setCart(fetchedCart);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const productDetails = await Promise.all(
          cart.map(async (item) => {
            const response = await axios.get(`/api/admin/dashboard/product/${item.productId}`);
            // Ensure quantity is passed correctly
            return { ...response.data, quantity: item.quantity || 1 }; // Default to 1 if undefined
          })
        );
        setProducts(productDetails);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchProductDetails();
    }
  }, [cart]);

  const updateCartAPI = async (updatedCart) => {
    const urlPath = window.location.pathname;
    const userId = urlPath.split('/')[2];
    
    // Prepare updated cart structure with userId and productId
    const formattedCart = updatedCart.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    await axios.put(`/api/users/cart/${userId}`, { items: formattedCart }); // Update cart on the server
  };

  const incrementQuantity = async (productId) => {
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        return { ...product, quantity: product.quantity + 1 }; // Increment the quantity for the correct product
      }
      return product; // Return other products unchanged
    });

    setProducts(updatedProducts); // Update state

    // Update cart and API
    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item // Default to 1 if undefined
    );

    setCart(updatedCart);
    await updateCartAPI(updatedCart);
  };

  const decrementQuantity = async (productId) => {
    const updatedProducts = products.map((product) => {
      if (product._id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 }; // Decrement the quantity for the correct product
      }
      return product; // Return other products unchanged
    });

    setProducts(updatedProducts); // Update state

    // Update cart and API
    const updatedCart = cart.map((item) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCart(updatedCart);
    await updateCartAPI(updatedCart);
  };

  // Calculate total price for a specific product
  const totalPriceForProduct = (product) => {
    return (product.salePrice * product.quantity).toFixed(2);
  };

  // Calculate estimated total for the entire cart
  const estimatedTotal = () => {
    return products.reduce((total, product) => {
      return total + (product.salePrice * product.quantity);
    }, 0).toFixed(2);
  };

  // Remove item from cart
  const removeItem = async (productId) => {
    const urlPath = window.location.pathname;
    const userId = urlPath.split('/')[2]; // Ensure userId is available
    try {
      // Make an API call to delete the product from the server
      const response = await axios.delete(`/api/users/cart/${productId}`);
      console.log(response.data.msg); // Log success message from server
  
      const updatedProducts = products.filter((product) => product._id !== productId);
      setProducts(updatedProducts);
  
      // Also update cart state
      const updatedCart = cart.filter((item) => item.productId !== productId);
      setCart(updatedCart);
      await updateCartAPI(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen shadow-lg border-b-black-100 border p-4">
      <div className="flex flex-col md:flex-row items-center w-full">
        <h1 className="text-2xl md:text-5xl font-semibold text-orange-600 mb-2 md:mb-4">Your Cart</h1>
        <Link href={"/"}>
          <h1 className="text-sm md:text-xl font-semibold text-blue-500 mb-2 md:mb-4 underline ml-0 md:ml-5 mt-1 md:mt-3 hover:cursor-pointer hover:underline-offset-1">Continue Shopping</h1>
        </Link>
      </div>

      <div className="w-full p-2 md:p-4 bg-white">
        {loading ? (
          <Loader /> // Loader component while fetching
        ) : products.length > 0 ? (
          <>
            <table className="w-full table-auto border-collapse text-xs md:text-base">
              <thead>
                <tr>
                  <th className="px-2 md:px-4 py-2 text-left">Product</th>
                  <th className="px-2 md:px-4 py-2 text-center hidden md:table-cell ">Quantity</th>
                  <th className="px-2 md:px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b">
                    <td className="flex items-center py-2">
                      <img
                        src={product.featuredImage}
                        alt={product.name}
                        className="w-12 md:w-16 h-12 md:h-16 object-cover mr-2 md:mr-4 rounded-lg hover:cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <h2 className="text-xs md:text-lg hover:cursor-pointer hover:underline">{product.name}</h2>
                        <div className="flex gap-2 md:gap-3">
                          <p className="text-gray-500 text-xs md:text-sm">
                            ₹<span className="line-through">{product.originalPrice}</span>
                          </p>
                          <p className="text-black text-sm md:text-lg">₹{product.salePrice}</p>
                        </div>
                      </div>
                    </td>

                    <td className="text-center hidden md:table-cell">
                      <div className="flex items-center justify-center">
                        <button
                          className="px-2 py-1 text-gray-600 border border-gray-300 rounded-l hover:bg-gray-200"
                          onClick={() => decrementQuantity(product._id)}
                        >
                          -
                        </button>
                        <span className="px-2 md:px-4 py-2">{product.quantity}</span>
                        <button
                          className="px-2 py-1 text-gray-600 border border-gray-300 rounded-r hover:bg-gray-200"
                          onClick={() => incrementQuantity(product._id)}
                        >
                          +
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 ml-2 md:ml-4"
                          onClick={() => removeItem(product._id)}
                        >
                          <FaTrashAlt size={16} />
                        </button>
                      </div>
                    </td>

                    <td className="text-right text-xs md:text-lg font-medium">
                      ₹{totalPriceForProduct(product)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-right">
              <p className="text-base md:text-lg font-semibold">
                <span className='text-[#D07021]'>Estimated total:</span> <span className="pl-3">₹{estimatedTotal()}</span>
              </p>
              <p className="text-xs md:text-sm font-semibold">
                Taxes, discounts, and shipping calculated at checkout
              </p>
              <Link href={"cart/information"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-[#6a0dad] text-white rounded-full shadow-lg hover:bg-[#4b0082] transition text-sm md:text-base mt-4">
                  Proceed to Checkout
                </motion.button>
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-lg font-semibold">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
