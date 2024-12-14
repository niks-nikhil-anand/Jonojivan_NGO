"use client";

import { motion } from "framer-motion";
import TypingEffect from "react-typing-effect";
import Image from "next/image";
import { useEffect, useState } from "react";



const phrases = [
  "possibility and promise.",
  "hope and change.",
  "leaders and dreams.",
];

const HeroSection = () => {
  const [sharpenedImage, setSharpenedImage] = useState("");



  useEffect(() => {
    // Fetch the sharpened image URL from the API
    fetch("/api/sharpen-image")
      .then((response) => response.json())
      .then((data) => {
        if (data.imageUrl) {
          setSharpenedImage(data.imageUrl);
        }
      })
      .catch((error) => console.error("Error fetching sharpened image:", error));
  }, []);


  return (
    <div className="relative h-screen overflow-hidden">
      {/* Static Background Image */}
      <div className="absolute inset-0">
        <Image
          src={sharpenedImage}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="blur-[0.7px] scale-110"
          priority // Ensures the image is loaded as a priority for performance
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Typing Content */}
      <motion.div
        className="relative flex flex-col items-start justify-center h-full text-white px-8 sm:px-16"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-sm sm:text-lg uppercase tracking-widest font-medium">
          Empower the Future
        </h2>
        <h1 className="text-3xl sm:text-5xl font-bold mt-4 text-[#ff5a5f]">
          Invest in Education
        </h1>
        <h1 className="text-lg sm:text-2xl font-bold mt-4">
          Your generosity today is the key that unlocks a future full of{" "}
          <span className="ml-2 text-[#ff5a5f]">
            <TypingEffect
              text={phrases}
              speed={100}
              eraseSpeed={50}
              typingDelay={500}
              eraseDelay={3000}
            />
          </span>
        </h1>
        <motion.button
          className="bg-[#28a745] text-white py-3 px-6 text-lg font-semibold hover:bg-[#218838] rounded-md mt-8 transition"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Donate Now <span className="ml-2 text-white">❤</span>
        </motion.button>
      </motion.div>

      {/* Slider Dots */}
      <motion.div
        className="absolute bottom-10 sm:bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {phrases.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer bg-white`}
          ></div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroSection;
