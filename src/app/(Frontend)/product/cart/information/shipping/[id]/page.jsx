"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios"; 
import { MdArrowBackIos } from "react-icons/md";
import Loader from "@/components/loader/loader";
import { useRouter } from "next/navigation";
import { FaMoneyBillWave} from "react-icons/fa";


const CheckoutPage = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [rememberMe, setRememberMe] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    mobileNumber: "",
    address: ""
  });



  // Fetch order ID and address details on page load
  useEffect(() => {
    const fetchOrderAndAddress = async () => {
      try {
        console.log("Fetching order ID from cookies...");
        const decodedTokenResponse = await axios.get("/api/pendingOrder/checkout/cookies");
        console.log("Decoded token response:", decodedTokenResponse.data);
  
        const { orderId, cartId, addressId, userId } = decodedTokenResponse.data;
        console.log("Extracted IDs:", { orderId, cartId, addressId, userId });
  
        if (orderId) {
          console.log(`Redirecting to shipping page with Order ID: ${orderId}`);
  
          if (addressId) {
            console.log("Fetching address details for Address ID:", addressId);
            const addressResponse = await axios.get(`/api/admin/dashboard/pendingOrder/address/${addressId}`);
            console.log("Address details received:", addressResponse.data);
  
            const { email, mobileNumber, address } = addressResponse.data.data;
            setContactInfo({
              email: email || '',
              mobileNumber: mobileNumber || '',
              address: address || ''
            });
  
            console.log("Fetching shipping information for Order ID:", orderId);
            const postResponse = await axios.get(`/api/pendingOrder/shipping/${orderId}`);
            console.log("POST request URL:", `/api/pendingOrder/shipping/${orderId}`);
          } else {
            console.error("Address ID not found.");
          }
        } else {
          console.error("Order ID not found.");
        }
      } catch (error) {
        console.error("Error fetching order or address details:", error.response || error.message);
      }
    };
  
    fetchOrderAndAddress();
  }, [router]);
  


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
            return { ...response.data, quantity: item.quantity }; 
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
    
  
    try {
      const response = await axios.post("/api/pendingOrder/checkout", checkoutData, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
      console.log("Checkout successful!", response.data);
    } catch (error) {
      console.error("Error submitting checkout:", error);
    }
  };
  
  

  return (
    <div className="flex  mx-auto justify-center my-10 gap-5">
        <div className="flex flex-col w-full lg:w-2/5 gap-10">
        <div className="">
          <div className="flex mb-6 gap-4 ">
            <div className="text-sm text-gray-600">
              <Link href="/cart" className="mr-2 text-blue-500">
                Cart
              </Link>
              &gt;
              <span className="ml-2 text-blue-500 ">Information</span>
              &gt;
              <span className="ml-2 text-blue-500">Shipping</span>
              &gt;
              <span className="ml-2 ">Payment</span>
            </div>
          </div>

          

          <div className="border border-gray-300 rounded-lg px-5 py-10">
      {/* Table-like structure without <thead> */}
      <div className="mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Email</span>
          <span>{contactInfo.email || "Not Available"}</span>
          <a href="#" className="text-purple-600 hover:underline">Change</a>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Mobile No.</span>
          <span>{contactInfo.mobileNumber || "Not Available"}</span>
          <a href="#" className="text-purple-600 hover:underline">Change</a>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Ship to</span>
          <span>{contactInfo.address || "Not Available"}</span>
          <a href="#" className="text-purple-600 hover:underline">Change</a>
        </div>
      </div>

      
    </div>
      </div>

      <div className="w-full  p-4 border border-gray-300 rounded-lg">
      {/* Payment Method Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Payment method</h3>
        <p className="text-gray-500 mb-4">
          Select a payment method for your order.
        </p>

        {/* Cash on Delivery Option */}
        <div
          className={`flex items-center p-4 mb-2 border ${
            paymentMethod === "cod"
              ? "border-purple-600 bg-purple-50"
              : "border-gray-300"
          } rounded-lg cursor-pointer`}
          onClick={() => setPaymentMethod("cod")}
        >
          <FaMoneyBillWave className="text-purple-600 mr-4" size={24} />
          <input
            type="radio"
            name="paymentMethod"
            checked={paymentMethod === "cod"}
            className="form-radio text-purple-600 mr-2"
            readOnly

          />
          <label className="cursor-pointer">Cash on Delivery</label>
        </div>

        {/* Online Payment Option */}
      </div>
    </div>

    {/* Remember Me Section */}
    <div className="mb-4">
        <h3 className="text-lg font-semibold">Remember me</h3>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-purple-600"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label className="ml-3 text-gray-700">
            Save my information for a faster checkout
          </label>
        </div>
      </div>

     {/*Button Section */}
     <div className="flex justify-between mt-6">
          <div className="flex items-center">
            <MdArrowBackIos />
            <Link href="/cart">
              <button className="text-black font-bold py-2 px-6 rounded-md">
                Return to Checkout
              </button>
            </Link>
          </div>
          <button
            onClick={handleContinueToShipping}
            className="bg-purple-600 text-white font-bold py-2 px-6 rounded-md"
          >
            Place Order
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
