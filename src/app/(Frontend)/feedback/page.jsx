"use client";
import React from 'react';
import { motion } from 'framer-motion';

const FeedbackForm = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100">
      <div className="w-full bg-green-600 h-[60vh] flex justify-center items-center relative px-4 md:px-0">
        <div className="flex flex-col space-y-6 pb-8 pt-12 md:pt-24 md:space-y-8">
          <motion.div
            className="mx-auto max-w-max rounded-full border-2 border-white bg-gray-50 p-2 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-center text-xs font-semibold leading-normal text-green-600 md:text-sm">
              JonoJivan Grocery Feedback
            </p>
          </motion.div>
          <motion.h1
            className="text-center text-3xl font-bold text-white md:text-5xl md:leading-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            We Value Your Feedback
          </motion.h1>
          <p className="mx-auto max-w-4xl text-center text-base text-gray-200 md:text-lg px-4 md:px-0">
            Help us improve our service by sharing your thoughts. Your feedback is important to us!
          </p>
        </div>
      </div>

      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 my-10 mx-4 md:mx-0 md:p-8">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Share Your Experience</h2>
        <p className="text-center text-gray-700 mb-6">
          We appreciate your feedback. Let us know how we’re doing and how we can serve you better.
        </p>
        
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full h-12 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full h-12 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <select
            className="w-full h-12 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            defaultValue=""
          >
            <option value="" disabled>
              Rate Your Experience
            </option>
            <option value="5">Excellent</option>
            <option value="4">Very Good</option>
            <option value="3">Good</option>
            <option value="2">Fair</option>
            <option value="1">Poor</option>
          </select>
          <textarea
            placeholder="Your Feedback"
            className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full h-12 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            Submit Feedback
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
