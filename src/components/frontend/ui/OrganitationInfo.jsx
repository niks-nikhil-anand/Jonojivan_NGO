"use client";
import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Link from "next/link";

const OrganizationInfo = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col md:flex-row items-center justify-between px-12 py-8 md:px-20 md:py-16 relative bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('/frontend/banner/BlurImage.webp')`,
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-md rounded-lg"></div>

      {/* Content Wrapper */}
      <div className="relative flex flex-col md:flex-row w-full items-center justify-between z-10 space-y-12 md:space-y-0">
        {/* Left Section */}
        <div className="flex flex-col w-full md:w-1/3 space-y-10 text-center md:text-left">
          {/* Volunteer Stats */}
          {inView && (
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
          )}

          {/* People Helped Stats */}
          {inView && (
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
          )}

          {/* Funds Collected Stats */}
          {inView && (
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
          )}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 text-center md:text-left space-y-6">
          <motion.p
            className="text-xs md:text-sm text-gray-600 uppercase tracking-wide"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Together We Can Make a Difference
          </motion.p>
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-blue-900 mt-2 leading-snug"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Empowering Lives Globally
          </motion.h1>
          <motion.p
            className="text-gray-700 mt-4 leading-relaxed text-sm md:text-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join hands with us in transforming communities and bringing hope to
            those in need. Together, we have made a significant impact across
            the globe, reaching millions and changing lives for the better.
          </motion.p>
          <motion.p
            className="text-gray-700 mt-2 leading-relaxed text-sm md:text-lg"
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
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg mt-6"
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
