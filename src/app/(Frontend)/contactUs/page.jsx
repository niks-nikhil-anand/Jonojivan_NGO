"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="flex flex-col">
      <div className="w-full bg-gradient-to-r from-[#FEE440] to-[#F4B03E] h-[60vh] flex justify-center items-center relative">
        <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
          <motion.div
            className="mx-auto max-w-max rounded-full border-2 border-white bg-yellow-50 p-2 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-center text-xs font-semibold leading-normal text-yellow-800 md:text-sm">
              We&apos;d love to hear your thoughts
            </p>
          </motion.div>
          <motion.p
            className="text-center text-3xl font-bold text-yellow-900 md:text-5xl md:leading-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            We Value Your Feedback
          </motion.p>
          <p className="mx-auto max-w-4xl text-center text-base text-yellow-700 md:text-xl">
            Your opinions and experiences matter to us. Please feel free to share
            your thoughts, and let&apos;s make things better together.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center py-12 px-4 md:px-0">
        <p className="text-2xl font-bold text-yellow-900 md:text-4xl">Get in touch</p>
        <p className="mt-4 text-lg text-yellow-700">
          Our friendly team is here to assist you.
        </p>

        <div className="flex justify-center items-center w-full md:w-2/3 lg:w-1/2">
          <form className="mt-8 space-y-6 w-full">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <input
                className="w-full h-14 px-6 py-2 border border-yellow-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                type="text"
                id="first_name"
                placeholder="Enter your first name"
              />
              <input
                className="w-full h-14 px-6 py-2 border border-yellow-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                type="text"
                id="last_name"
                placeholder="Enter your last name"
              />
            </div>
            <input
              className="w-full h-14 px-6 py-2 border border-yellow-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
            <input
              className="w-full h-14 px-6 py-2 border border-yellow-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              type="tel"
              id="phone_number"
              placeholder="Enter your phone number"
            />
            <textarea
              className="w-full h-32 px-6 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              id="message"
              placeholder="Leave us a message"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full h-12 rounded-md bg-yellow-600 text-sm font-semibold text-white shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
