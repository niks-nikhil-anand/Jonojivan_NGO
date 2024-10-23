"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios"; // Fix axios import
import { MdArrowBackIos } from "react-icons/md";
import Loader from "@/components/loader/loader";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 


   const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    mobileNumber: "",
    state: "",
    landmark: "",
    city: "",
    pinCode: "",
    subscribeChecked: false, 
  });



  useEffect(() => {
    const fetchCartFromLocalStorage = () => {
      const cartData = JSON.parse(localStorage.getItem("cart")); 
      if (cartData) {
        setCart(cartData);
      }
    };
    fetchCartFromLocalStorage();
  }, []);

  

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const productDetails = await Promise.all(
          cart.map(async (item) => {
            const response = await axios.get(
              `/api/admin/dashboard/product/${item.id}`
            );
            return { ...response.data, quantity: item.quantity }; // Add quantity from the cart
          })
        );
        setProducts(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchProductDetails();
    }
  }, [cart]);

 

  
  const totalPriceForProduct = (product) => {
    return (product.salePrice * product.quantity).toFixed(2);
  };

  const estimatedTotal = () => {
    return products
      .reduce((total, product) => total + product.salePrice * product.quantity, 0)
      .toFixed(2);
  };

  if (loading) {
    return <Loader />;
  }


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleContinueToShipping = async () => {
    // Create a data object to send to the API
    const checkoutData = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      apartment: formData.apartment,
      mobileNumber: `+91${formData.mobileNumber}`, // Add country code as needed
      state: formData.state,
      landmark: formData.landmark,
      city: formData.city,
      pinCode: formData.pinCode,
      subscribeChecked: formData.subscribeChecked, // Corrected spelling
      cart
    };
  
    try {
      const response = await axios.post("/api/pendingOrder/checkout", checkoutData, {
        headers: {
          'Content-Type': 'application/json', // Change to application/json
        },
      });
      console.log("Checkout successful!", response.data);
    } catch (error) {
      console.error("Error submitting checkout:", error);
    }
  };
  
  

  return (
    <div className="flex  mx-auto justify-center mt-10 gap-5">
      <div className="w-full lg:w-2/5">
          <div className="flex mb-6 gap-4">
            <div className="text-sm text-gray-600">
              <Link href="/cart" className="mr-2 text-blue-500">
                Cart
              </Link>
              &gt;
              <span className="ml-2 text-black font-semibold">Information</span>
              &gt;
              <span className="ml-2">Shipping</span>
              &gt;
              <span className="ml-2">Payment</span>
            </div>
          </div>

          <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border w-full py-2 px-4 rounded-md focus:ring-purple-600"
          />
          <label className="flex items-center mt-2">
            <input
              type="checkbox"
              name="offersChecked"
              checked={formData.subscribeChecked}
              onChange={handleInputChange}
              className="mr-2"
            />
            Email me with news and offers
          </label>
        </div>

        <div>
          <h3 className="text-lg font-semibold my-2">Shipping address</h3>
          <div className="flex w-full flex-col gap-4">
            <select
              name="country"
              className="border w-full py-2 px-4 rounded-md"
            >
              <option>India</option>
            </select>
            <div className="flex justify-between">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="border w-2/5 py-2 px-4 rounded-md"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="border w-2/5 py-2 px-4 rounded-md"
              />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="border w-full py-2 px-4 rounded-md"
            />
            <div className="flex justify-between">
              <input
                type="text"
                name="apartment"
                placeholder="Apartment, suite, streetAddress etc. (optional)"
                value={formData.apartment}
                onChange={handleInputChange}
                className="border w-2/5 py-2 px-4 rounded-md"
              />
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="border w-2/5 py-2 px-4 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="border w-2/5 py-2 px-4 rounded-md"
              />
              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                className="border w-2/5 py-2 px-4 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="border w-2/5 py-2 px-4 rounded-md"
              />
              <input
                type="text"
                name="pinCode"
                placeholder="PinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                className="border w-2/5 py-2 px-4 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <div className="flex items-center">
            <MdArrowBackIos />
            <Link href="/cart">
              <button className="text-black font-bold py-2 px-6 rounded-md">
                Return to Cart
              </button>
            </Link>
          </div>
          <button
            onClick={handleContinueToShipping}
            className="bg-purple-600 text-white font-bold py-2 px-6 rounded-md"
          >
            Continue to shipping
          </button>
        </div>
      </div>

        <div className="w-full border shadow-lg rounded-lg lg:w-5/12 bg-gray-50 p-10">
          <table className="w-full table-auto border-collapse text-xs md:text-base">
            <thead>
              <tr>
                <th className="px-2 md:px-4 py-2 text-left">Product</th>
                <th className="px-2 md:px-4 py-2 text-center hidden md:table-cell">
                  Quantity
                </th>
                <th className="px-2 md:px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="flex items-center py-2">
                    <img
                      src={product.featuredImage}
                      alt={product.name}
                      className="w-12 md:w-16 h-12 md:h-16 object-cover mr-2 md:mr-4 rounded-lg hover:cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-xs md:text-lg hover:cursor-pointer hover:underline">
                        {product.name}
                      </h2>
                      <div className="flex gap-2 md:gap-3">
                        <p className="text-gray-500 text-xs md:text-sm">
                          ₹<span className="line-through">{product.originalPrice}</span>
                        </p>
                        <p className="text-black text-sm md:text-lg">
                          ₹{product.salePrice}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="hidden md:table-cell text-center py-2">
                    <div className="flex justify-center items-center">
                      
                      <span className="w-8 text-center">{product.quantity}</span>
                      
                    </div>
                  </td>

                  <td className="text-right py-2">
                    ₹{totalPriceForProduct(product)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-between font-semibold">
            <h3>Total:</h3>
            <h3>₹{estimatedTotal()}</h3>
          </div>
        </div>
      
      
    </div>
  );
};

export default CheckoutPage;
