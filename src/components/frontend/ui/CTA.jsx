"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi'; // Importing a React Icon for the email field

const CTA = () => {
  return (
    <div className="relative bg-blue-900 text-white flex flex-col md:flex-row items-center md:items-start p-6 shadow-xl mx-auto max-h-[600px]">
      {/* Left Content */}
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
          Fundraise for a Great Cause
        </h1>
        <p className="text-lg text-gray-200 mb-4">
          Join us in supporting meaningful causes. Your donation helps create real change in people's lives.
        </p>
        <p className="text-lg text-gray-200 mb-6">
          By contributing, you become a part of a global movement that makes a difference.
        </p>

        {/* Newsletter Signup */}
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Name Field */}
          <div className="flex items-center bg-white rounded-lg p-1 gap-2 flex-1">
            <input
              type="text"
              placeholder="Enter your name"
              className="p-2 flex-1 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center bg-white rounded-lg p-1 gap-2 flex-1">
            <HiOutlineMail className="text-gray-500 text-lg" />
            <input
              type="email"
              placeholder="Enter your email for events & campaigns"
              className="p-2 flex-1 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400 mt-4 md:mt-0"
          >
            Join Now
          </button>
        </motion.form>
      </div>

      {/* Right Image */}
      <div className="mt-6 md:mt-0 md:ml-6 flex-1">
        <motion.img
          src="/frontend/Cta.png"
          alt="CTA Image"
          className="rounded-lg shadow-xl h-auto max-w-full object-cover"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  );
};

export default CTA;
