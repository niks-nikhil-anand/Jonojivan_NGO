"use client";
import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Link from "next/link";

const OrganizationInfo = () => {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 relative bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('/frontend/banner/BlurImage.webp')`, // Replace with your image path
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-md"></div>

      {/* Content Wrapper */}
      <div className="relative flex flex-col md:flex-row w-full items-center justify-between z-10">
        {/* Left Section */}
        <div className="flex flex-col w-full md:w-1/3 space-y-12 text-center md:text-left">
          {/* Volunteer Stats */}
          <motion.div
            className="text-3xl md:text-4xl font-bold text-blue-900"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CountUp start={0} end={6478} duration={2} separator="," />
            <div className="text-lg md:text-xl font-medium text-gray-700 mt-2">
              Volunteers in 2020
            </div>
          </motion.div>

          {/* People Helped Stats */}
          <motion.div
            className="text-3xl md:text-4xl font-bold text-blue-900"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <CountUp start={0} end={2348195} duration={2.5} separator="," />
            <div className="text-lg md:text-xl font-medium text-gray-700 mt-2">
              People Helped in 2020
            </div>
          </motion.div>

          {/* Funds Collected Stats */}
          <motion.div
            className="text-3xl md:text-4xl font-bold text-blue-900"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            ₹<CountUp start={0} end={16} duration={2} suffix="M" />
            <div className="text-lg md:text-xl font-medium text-gray-700 mt-2">
              Funds Collected
            </div>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-2/3 mt-12 md:mt-0 text-center md:text-left">
          <motion.p
            className="text-xs md:text-sm text-gray-600 uppercase tracking-wide"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Together We Can Make a Difference
          </motion.p>
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-blue-900 mt-4 leading-snug"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Empowering Lives Globally
          </motion.h1>
          <motion.p
            className="text-gray-700 mt-6 leading-relaxed text-sm md:text-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join hands with us in transforming communities and bringing hope to
            those in need. Together, we have made a significant impact across
            the globe, reaching millions and changing lives for the better.
          </motion.p>
          <motion.p
            className="text-gray-700 mt-4 leading-relaxed text-sm md:text-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Be a part of the movement that uplifts humanity and creates a
            brighter future for all. Your support helps us reach even more
            lives and make an everlasting impact.
          </motion.p>
          <Link href={"/aboutUs"}>
          <motion.button
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-md mt-8"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Learn More About Us
          </motion.button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfo;
