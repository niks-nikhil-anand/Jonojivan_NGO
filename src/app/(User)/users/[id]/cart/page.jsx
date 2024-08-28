"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [area, setArea] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentOption, setPaymentOption] = useState('');

  useEffect(() => {
    // Fetch cart data from API
    axios.get('/api/users/cart/listCart')
      .then(response => {
        setCart(response.data.items);
        setTotalPrice(response.data.totalPrice);
      })
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  const handlePlaceOrder = () => {
    if (currentStep === 3) {
      // Logic for placing an order
      alert('Order placed successfully!');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step Indicator Component
  const CartSteps = ({ currentStep }) => {
    const steps = ['BAG', 'ADDRESS', 'PAYMENT'];

    return (
      <div className="flex flex-wrap justify-between items-center mb-8 w-full max-w-xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 text-center">
            <div
              className={`relative pb-2 font-semibold tracking-wider ${
                currentStep === index + 1 ? 'text-teal-600' : 'text-gray-500'
              }`}
            >
              {step}
              {currentStep === index + 1 && (
                <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-teal-600"></div>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className="h-px bg-gray-300 w-full mx-auto"></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      {/* Step Indicator */}
      <CartSteps currentStep={currentStep} />

      {/* Step Content */}
      {currentStep === 1 && (
        <motion.div
          className="mb-6 p-4 border border-gray-300 rounded shadow sm:p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-bold mb-4">Your Cart</h2>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between mb-4">
              <div>
                <h3 className="text-md font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="text-md font-semibold">₹{item.price}</div>
            </div>
          ))}
        </motion.div>
      )}

      {currentStep === 2 && (
        <motion.div
          className="mb-6 p-4 border border-gray-300 rounded shadow sm:p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Name</label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Mobile Number</label>
            <input
              type="text"
              value={contactMobile}
              onChange={(e) => setContactMobile(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Enter your mobile number"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Enter your pincode"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">House No/Building/Street Area</label>
            <input
              type="text"
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Enter house number/building/street area"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Locality/Town</label>
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Enter locality/town"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">City/District</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Enter city/district"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Enter state"
            />
          </div>
        </motion.div>
      )}

      {currentStep === 3 && (
        <motion.div
          className="mb-6 p-4 border border-gray-300 rounded shadow sm:p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-bold mb-4">Payment Options</h2>
          <div className="mb-4">
            <label className="flex items-center cursor-pointer text-sm">
              <input
                type="radio"
                name="payment"
                value="COD"
                className="mr-2"
                checked={paymentOption === 'COD'}
                onChange={() => setPaymentOption('COD')}
              />
              <FaMoneyBillWave className="text-green-500 mr-2" />
              Cash On Delivery
            </label>
          </div>
          <div>
            <label className="flex items-center cursor-pointer text-sm">
              <input
                type="radio"
                name="payment"
                value="RazorPay"
                className="mr-2"
                checked={paymentOption === 'RazorPay'}
                onChange={() => setPaymentOption('RazorPay')}
              />
              <FaCreditCard className="text-blue-500 mr-2" />
              RazorPay
            </label>
          </div>
        </motion.div>
      )}

      {/* Price Details */}
      <motion.div
        className="mb-6 p-4 border border-gray-300 rounded shadow sm:p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Total Items:</span>
          <span>{cart.length}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total Price:</span>
          <span>₹{totalPrice}</span>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="w-full py-2 px-4 bg-teal-600 text-white rounded shadow hover:bg-teal-700 transition"
        >
          {currentStep === 3 ? 'Place Order' : 'Next'}
        </button>
        {currentStep > 1 && (
          <button
            onClick={handlePreviousStep}
            className="w-full mt-2 py-2 px-4 bg-gray-300 text-gray-800 rounded shadow hover:bg-gray-400 transition"
          >
            Previous
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default CartPage;
