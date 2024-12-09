"use client";
import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
        threshold: 0.2,
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
    <div ref={sectionRef} className="relative flex flex-col md:flex-row items-center justify-between px-12 py-8 md:px-20 md:py-16">
      <div className="absolute inset-0">
        <Image
          src="/frontend/Banners/childInSchool.jpg"
          alt="Organization Banner"
          layout="fill"
          objectFit="cover"
          quality={75}
          className="z-0"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm rounded-lg"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative flex flex-col md:flex-row w-full items-center justify-center z-10 space-y-12 md:space-y-0">
        {/* Left Section */}
        <div className="flex flex-col w-full md:w-1/3 space-y-10 text-center md:text-left">
          {/* Volunteer Stats */}
          {inView && (
            <motion.div
              className="text-3xl md:text-4xl font-bold"
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
          {/* Other stats */}
          {inView && (
            <>
              <motion.div
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <CountUp start={0} end={2348195} duration={2.5} separator="," />
                <div className="text-lg md:text-xl font-medium mt-2">
                  People Helped in 2020
                </div>
              </motion.div>
              <motion.div
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                ₹<CountUp start={0} end={16} duration={2} suffix="M" />
                <div className="text-lg md:text-xl font-medium mt-2">
                  Funds Collected
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 text-center md:text-left space-y-6">
          <motion.p
            className="text-xs md:text-sm text-gray-700 uppercase tracking-wide"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
          Empowering Lives Through Quality Education
        </motion.p>
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-black -mt-2 leading-snug"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
        Bring Smiles, Build Futures

      </motion.h1>
          <motion.p
            className="text-blue-900 mt-4 leading-relaxed text-sm md:text-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Bring Smile Foundation is a movement of hope and empowerment, transforming lives through education in Bihar’s underprivileged regions, where poverty and discrimination often overshadow dreams.
          </motion.p>
          <Link href="/aboutUs">
            <motion.button
              className="bg-[#FF0080] hover:bg-[#FF66B2] text-white font-semibold py-3 px-8 rounded-lg shadow-lg mt-6 transition-all duration-300"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#FF66B2",
              }}
              whileTap={{
                scale: 0.95,
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
