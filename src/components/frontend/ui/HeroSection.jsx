"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import HeroSection01 from "../../../../public/frontend/heroSection01.jpg";
import HeroSection02 from "../../../../public/frontend/heroSection02.jpg";

const images = [HeroSection01, HeroSection02];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // 5 seconds interval for auto-slide

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-beige">
      <motion.div
        className="absolute inset-0"
        key={currentImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={images[currentImage]}
          alt="Slider Image"
          layout="fill"
          objectFit="cover"
        />
      </motion.div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Belen Ava Makeup & Hair Stylist
        </h1>
        <p className="text-sm sm:text-base lg:text-lg mt-4 text-gray-700">
          Hello, I&apos;m Belen Ava! I love helping people feel beautiful, which
          is the reason I&apos;ve spent the last 10 years engulfed in doing
          Makeup & Hair Styling.
        </p>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 mx-2 rounded-full ${
              currentImage === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
