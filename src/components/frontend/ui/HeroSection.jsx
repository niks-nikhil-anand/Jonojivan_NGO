"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import HeroSection01 from "../../../../public/frontend/heroSection01.png";
import HeroSection02 from "../../../../public/frontend/heroSection02.png";

const images = [HeroSection01, HeroSection02];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="relative h-[14vh] sm:h-[40vh] md:h-[50vh] w-full flex items-center justify-center bg-beige">
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

  {/* Dots Navigation */}
  <div className="absolute bottom-1 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center">
    {images.map((_, index) => (
      <button
        key={index}
        onClick={() => handleDotClick(index)}
        className={`w-3 h-3 mx-1 sm:mx-2 rounded-full ${
          currentImage === index ? "bg-gray-800" : "bg-gray-400"
        }`}
      />
    ))}
  </div>
</div>

  );
};

export default HeroSection;
