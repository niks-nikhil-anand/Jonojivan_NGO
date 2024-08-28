import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';


const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [address, setAddress] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart data from API
    axios.get('/api/users/cart')
      .then(response => {
        setCart(response.data);
        calculateTotal(response.data);
      })
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handlePlaceOrder = () => {
    // Logic for placing an order
    alert('Order placed successfully!');
  };

  return (
    <div className="container mx-auto p-4">
      {/* Address Section */}
      <motion.div
        className="mb-6 p-4 border border-gray-300 rounded shadow"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your address"
        />
      </motion.div>

      {/* Cart Products Section */}
      <motion.div
        className="mb-6 p-4 border border-gray-300 rounded shadow"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-lg font-bold mb-4">Your Cart</h2>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between mb-4">
            <div>
              <h3 className="text-md font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-md font-semibold">${item.price}</div>
          </div>
        ))}
      </motion.div>

      {/* Coupon Section */}
      <motion.div
        className="mb-6 p-4 border border-gray-300 rounded shadow"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-lg font-bold mb-4">Apply Coupon</h2>
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter coupon code"
        />
      </motion.div>

      {/* Price Details Section */}
      <motion.div
        className="mb-6 p-4 border border-gray-300 rounded shadow"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-lg font-bold mb-4">Price Details</h2>
        <div className="flex justify-between">
          <span>Total Price:</span>
          <span>${totalPrice}</span>
        </div>
        {/* Add any additional price details here */}
      </motion.div>

      {/* Place Order Button */}
      <motion.button
        onClick={handlePlaceOrder}
        className="w-full bg-blue-600 text-white p-3 rounded shadow hover:bg-blue-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Place Order
      </motion.button>
    </div>
  );
};

export default CartPage;
