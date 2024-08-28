"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaCreditCard, FaTrashAlt } from 'react-icons/fa';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [productDetails, setProductDetails] = useState({});
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
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    // Fetch cart data from API
    console.log('Fetching cart data...');
    axios.get('/api/users/cart/listCart')
      .then(response => {
        console.log('Cart data fetched:', response.data);
        const items = response.data.items;
        setCart(items);
        setTotalPrice(response.data.totalPrice);
  
        // Fetch product details for each cart item
        console.log('Fetching product details...');
        Promise.all(items.map(item => axios.get(`/api/admin/dashboard/product/${item.productId}`)))
          .then(responses => {
            console.log('Product details fetched:', responses);
            const details = {};
            responses.forEach((response, index) => {
              const item = items[index]; // Ensure item exists
              if (item && response.data) {
                console.log(`Product ID: ${item.productId}`, response.data);
                details[item.productId] = response.data;
              } else {
                console.warn(`Item or response data missing for index ${index}`);
              }
            });
            setProductDetails(details); // Use 'details' here
            console.log('Product details state:', details);
            setLoading(false);  // Set loading to false once data is fetched
          })
          .catch(error => {
            console.error('Error fetching product details:', error);
            setLoading(false);  // Set loading to false if there's an error
          });
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
        setLoading(false);  // Set loading to false if there's an error
      });
  }, []);
  
  
  

  // Loader Component
  const Loader = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-teal-600 border-solid rounded-full animate-spin"></div>
    </div>
  );

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

  if (loading) {
    return <Loader />;
  }

  const handleDeleteItem = (productId) => {
    // Implement item removal logic
  };

  const handleCheckout = () => {
    // Implement checkout logic
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
          {cart.map((item) => (
            <div key={item.productId} className="flex items-center justify-between mb-4 border-b border-gray-300 pb-4">
              {productDetails[item.productId] && (
                <div className="flex items-center">
                  <img
                    src={productDetails[item.productId]?.featuredImage || '/default-image.png'}
                    alt={productDetails[item.productId]?.name || 'Product Image'}
                    className="w-20 h-20 object-cover mr-4 rounded"
                  />
                  <div>
                    <h3 className="text-md font-semibold">{productDetails[item.productId]?.name || 'Product Name'}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => handleDeleteItem(item.productId)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FaTrashAlt className="w-5 h-5" />
              </button>
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
          <h2 className="text-lg font-bold mb-4">Payment</h2>
          <div className="mb-4">
            <button
              onClick={() => setPaymentOption('COD')}
              className={`w-full p-2 border rounded ${paymentOption === 'COD' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600'}`}
            >
              <FaMoneyBillWave className="inline mr-2" />
              Cash on Delivery
            </button>
          </div>
          <div className="mb-4">
            <button
              onClick={() => setPaymentOption('Card')}
              className={`w-full p-2 border rounded ${paymentOption === 'Card' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600'}`}
            >
              <FaCreditCard className="inline mr-2" />
              Pay by Card
            </button>
          </div>
        </motion.div>
      )}

      {/* Total Price */}
      <div className="flex justify-between items-center mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
        <span className="font-semibold text-lg">Total Price</span>
        <span className="text-lg font-bold">₹{totalPrice}</span>
      </div>

      {/* Step Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400 transition"
          >
            Back
          </button>
        )}
        {currentStep < 3 && (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
          >
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button
            onClick={handleCheckout}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
