import Link from 'next/link';
import React from 'react';

const CheckoutPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center my-6">
        <Link href={"/"}>
          <h1 className="font-bold text-xl hover:cursor-pointer">BlushBelle</h1>
          </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-[5rem]">
        {/* Left Section - Form */}
        <div className="w-full lg:w-2/4">
          <div className="flex mb-6 gap-4">
          <div className="text-sm text-gray-600">
          <a href="#" className="mr-2 text-blue-500">Cart</a>&gt; 
          <a href="#" className="mr-2 ml-2 text-black font-semibold">Information</a>&gt; 
          <a href="#" className="mr-2 ml-2">Shipping</a>&gt; 
          <a href="#" className='ml-2'>Payment</a>
         </div>
          </div>
          {/* Contact Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <input
              type="email"
              placeholder="Email"
              className="border w-full py-2 px-4 rounded-md focus:ring-purple-600"
            />
            <label className="flex items-center mt-2">
              <input type="checkbox" className="mr-2" />
              Email me with news and offers
            </label>
          </div>

          {/* Shipping Address Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Shipping address</h3>
            <div className="flex w-full flex-col gap-4">
              <select className="border w-full py-2 px-4 rounded-md">
                <option>India</option>
              </select>
              <div className='flex justify-between'>
              <input
                type="text"
                placeholder="First name"
                className="border w-2/5 py-2 px-4 rounded-md"
              />
              <input
                type="text"
                placeholder="Last name"
                className="border w-2/5 py-2 px-4 rounded-md"
              />
              </div>
              
              <input
                type="text"
                placeholder="Address"
                className="border w-full py-2 px-4 rounded-md col-span-2"
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="border w-full py-2 px-4 rounded-md col-span-2"
              />
              <div className='flex justify-between'>
              <input
                type="text"
                placeholder="City"
                className="border w-2/5 py-2 px-4 rounded-md"
              />
              <input
                type="text"
                placeholder="State"
                className="border w-2/5 py-2 px-4 rounded-md"
              />
              </div>
              
              <input
                type="text"
                placeholder="ZIP code"
                className="border w-2/5 py-2 px-4 rounded-md"
              />
            </div>
          </div>
          <button className="bg-purple-600 text-white font-bold py-2 px-6 rounded-md mt-6">
            Continue to shipping
          </button>
        </div>

        {/* Right Section - Cart Summary */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
          <table className="w-full mb-4">
            <tbody>
              <tr className="flex justify-between mb-2">
                <td>Energy + Focus</td>
                <td>$23.49</td>
              </tr>
              <tr className="flex justify-between mb-2">
                <td>Calcium Greens</td>
                <td>$57.98</td>
              </tr>
              <tr className="flex justify-between mb-2">
                <td>D3 + K2</td>
                <td>$19.49</td>
              </tr>
              <tr className="flex justify-between mb-2">
                <td>Daily Boost</td>
                <td>$13.99</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>$81.47</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Calculated at next step</span>
          </div>
          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>USD $81.47</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
