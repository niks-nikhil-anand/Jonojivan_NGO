"use client";
import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]); // Store cart data from localStorage
  const [products, setProducts] = useState([]); // Store product details

  // Fetch cart from localStorage and product details from API
  useEffect(() => {
    const fetchCartFromLocalStorage = () => {
      const cartData = JSON.parse(localStorage.getItem('cart')); // Retrieve from localStorage
      if (cartData) {
        setCart(cartData);
      }
    };

    fetchCartFromLocalStorage();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await Promise.all(
          cart.map(async (item) => {
            const response = await axios.get(`/api/admin/dashboard/product/${item.id}`);
            return { ...response.data, quantity: item.quantity }; // Add quantity from the cart
          })
        );
        setProducts(productDetails);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (cart.length > 0) {
      fetchProductDetails();
    }
  }, [cart]);

  const incrementQuantity = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        return { ...product, quantity: product.quantity + 1 }; // Only increment the quantity for the correct product
      }
      return product; // Return other products unchanged
    });
  
    setProducts(updatedProducts); // Update state
  
    // Update cart and localStorage
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  const decrementQuantity = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product._id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 }; // Only decrement the quantity for the correct product
      }
      return product; // Return other products unchanged
    });
  
    setProducts(updatedProducts); // Update state
  
    // Update cart and localStorage
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  

  // Calculate total price for a specific product
  const totalPriceForProduct = (product) => {
    return (product.salePrice * product.quantity).toFixed(2);
  };

  // Calculate estimated total for the entire cart
  const estimatedTotal = () => {
    return products.reduce((total, product) => {
      return total + product.salePrice * product.quantity;
    }, 0).toFixed(2);
  };

  // Remove item from cart
  const removeItem = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    
    // Also update localStorage
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full  p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-orange-600 mb-4">Your Cart</h1>
        {products.length > 0 ? (
          <>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row justify-between items-center mb-4"
              >
                {/* Product Image and Name */}
                <div className="flex items-center">
                  <img
                    src={product.featuredImage}
                    alt={product.name}
                    className="w-24 h-24 object-cover mr-4"
                  />
                  <div>
                    <h2 className="text-lg ">{product.name}</h2>
                    <div className='flex gap-3 '>
                    <p className="text-gray-500">₹<span className='line-through'>{product.originalPrice}</span></p>
                    <p className="text-black text-lg">₹{product.salePrice}</p>
                    </div>
                   
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center mt-4 md:mt-0">
                  <button
                    className="px-2 py-1 text-gray-600 border border-gray-300 rounded-l hover:bg-gray-200"
                    onClick={() => decrementQuantity(product._id)}
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{product.quantity}</span>
                  <button
                    className="px-2 py-1 text-gray-600 border border-gray-300 rounded-r hover:bg-gray-200"
                    onClick={() => incrementQuantity(product._id)}
                  >
                    +
                  </button>
                </div>

                {/* Total Price for the product */}
                <p className="text-lg font-medium mt-4 md:mt-0">₹{totalPriceForProduct(product)}</p>

                {/* Remove Button */}
                <button
                  className="text-red-500 hover:text-red-700 ml-4"
                  onClick={() => removeItem(product._id)}
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            ))}

            {/* Estimated Total */}
            <div className="mt-4 text-right">
              <p className="text-lg font-semibold">
                Estimated total: ₹ {estimatedTotal()} 
              </p>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
