"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import banner from '../../../../public/frontend/Banners/ourMissionBanner.jpg'
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';



export default function Contact() {
  return (
    <div className="flex flex-col bg-gray-50">
      {/* Feedback Section */}
      <div className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 h-[50vh] flex justify-center items-center">
        <div className="text-center space-y-6 px-4">
          <motion.div
            className="inline-block px-4 py-2 bg-white rounded-full shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold text-yellow-800">
              We&apos;d love to hear your thoughts
            </p>
          </motion.div>
          <motion.h2
            className="text-4xl font-bold text-white"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            We Value Your Feedback
          </motion.h2>
          <p className="text-white text-lg">
            Your opinions and experiences matter to us. Share your thoughts and
            let’s improve together.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12 py-12 px-4 md:px-8">
        {/* Contact Form */}
        <div className="flex flex-col flex-1 justify-center items-center bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Our friendly team is here to assist you.
          </p>

          <form className="w-full space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <input
                className="w-full h-14 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                type="text"
                id="first_name"
                placeholder="First Name"
              />
              <input
                className="w-full h-14 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                type="text"
                id="last_name"
                placeholder="Last Name"
              />
            </div>
            <input
              className="w-full h-14 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="email"
              id="email"
              placeholder="Email Address"
            />
            <input
              className="w-full h-14 px-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="tel"
              id="phone_number"
              placeholder="Phone Number"
            />
            <textarea
              className="w-full h-32 px-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              id="message"
              placeholder="Your Message"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full h-12 rounded-full bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Send Message
            </motion.button>
          </form>
        </div>

        {/* Contact Details */}
        <motion.div
          className="flex-1 bg-white shadow-lg rounded-lg border border-gray-200 p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Contact Us
          </h2>
          <div className="space-y-6">
            {/* Registered Office */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Registered Office
              </h3>
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-yellow-500 mt-1" size={24} />
                <p className="text-gray-600">
                  Singhi Kalan, PO- Ara, District- Bhojpur, Bihar, Pin- 802301.
                </p>
              </div>
            </div>

            {/* Operation Office */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Operation Office
              </h3>
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-yellow-500 mt-1" size={24} />
                <p className="text-gray-600">
                  F-13/17, Jogabai Extension, Okhla, New Delhi- 110025.
                </p>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Email Address
              </h3>
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-yellow-500 mt-1" size={24} />
                <p className="text-gray-600">support@bringsmile.org</p>
              </div>
            </div>

            {/* Phone */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Phone
              </h3>
              <div className="flex items-start gap-4">
                <FaPhoneAlt className="text-yellow-500 mt-1" size={24} />
                <p className="text-gray-600">+91 95993 22679</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 relative bg-blue-500 text-white rounded-lg overflow-hidden p-6 min-h-[200px] md:min-h-[200px] lg:min-h-[300px] m-5">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={banner}
          alt="Our Mission Banner"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">
          Join Us in Making a Lasting Impact in Bihar
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <a
            href="#"
            className="bg-white text-blue-500 py-2 px-6 text-sm md:text-base rounded-lg shadow hover:bg-gray-100 transition"
          >
            💖 Donate Now
          </a>
          <a
            href="#"
            className="bg-white text-blue-500 py-2 px-6 text-sm md:text-base rounded-lg shadow hover:bg-gray-100 transition"
          >
            💖 Partner With Us
          </a>
        </div>
      </div>
    </div>

      
    </div>
  );
}
