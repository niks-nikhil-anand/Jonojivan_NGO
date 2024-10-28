'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className='flex flex-col'>
      <div className="w-full bg-blue-500 h-[60vh] flex justify-center items-center relative">
        <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
          <motion.div
            className="mx-auto max-w-max rounded-full border-2 border-white bg-gray-50 p-1 px-3 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-center text-xs font-semibold leading-normal md:text-sm">
              We&apos;d love to hear your thoughts
            </p>
          </motion.div>
          <motion.p
            className="text-center text-3xl font-bold text-white md:text-5xl md:leading-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            We Value Your Feedback
          </motion.p>
          <p className="mx-auto max-w-4xl text-center text-base text-gray-200 md:text-xl">
            Your opinions and experiences matter to us. Please feel free to share your thoughts, and let&apos;s make things better together.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center py-12">
        <p className="text-2xl font-bold text-gray-900 md:text-4xl">Get in touch</p>
        <p className="mt-4 text-lg text-gray-600">
          Our friendly team is here to assist you.
        </p>

        <div className="flex justify-center items-center">
          <div className="px-4 md:px-12">
            <form className="mt-8 space-y-6">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label className="text-sm font-medium leading-none text-gray-700" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    className="w-full h-14 px-6 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="text"
                    id="first_name"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="text-sm font-medium leading-none text-gray-700" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    className="w-full h-14 px-6 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="text"
                    id="last_name"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium leading-none text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full h-14 px-6 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="text-sm font-medium leading-none text-gray-700" htmlFor="phone_number">
                  Phone Number
                </label>
                <input
                  className="w-full h-14 px-6 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  type="tel"
                  id="phone_number"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="text-sm font-medium leading-none text-gray-700" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="w-full h-32 px-6 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  id="message"
                  placeholder="Leave us a message"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full h-12 rounded-md bg-blue-600 text-sm font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
