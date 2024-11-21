"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import slide1 from '../../../../public/frontend/heroSection/slide1.jpg';
import slide2 from '../../../../public/frontend/heroSection/slide2.jpg';
import slide3 from '../../../../public/frontend/heroSection/slide3.jpg';

const slides = [slide1, slide2, slide3];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${slide.src})`,
            opacity: currentSlide === index ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <motion.div
        className="relative  flex flex-col items-center justify-center h-full text-white text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-sm sm:text-lg uppercase tracking-widest font-medium">
          Helping around the world
        </h2>
        <h1 className="text-3xl sm:text-5xl font-bold mt-4">
          MAKE SOMEONE'S LIFE BY
        </h1>
        <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mt-2">
          GIVING OF YOURS.
        </h1>
      </motion.div>

     
    </div>
  );
};

export default HeroSection;
