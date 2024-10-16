"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import HeroSection01 from "../../../../public/frontend/heroSection01.jpg";
import HeroSection02 from "../../../../public/frontend/heroSection02.jpg";
import HeroSection03 from "../../../../public/frontend/heroSection03.jpg";
import HeroSection04 from "../../../../public/frontend/heroSection04.jpg";

const images = [HeroSection01, HeroSection02, HeroSection03, HeroSection04];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Determine screen size after the component has mounted
  useEffect(() => {
    const updateScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // Set true if window width is greater than or equal to 768px
    };

    // Update the screen size when the component mounts
    updateScreenSize();

    // Add event listener to handle window resizing
    window.addEventListener('resize', updateScreenSize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  // Group images into pairs for desktop view
  const groupedImages = [];
  for (let i = 0; i < images.length; i += 2) {
    groupedImages.push(images.slice(i, i + 2));
  }

  const activeImages = isDesktop ? groupedImages[currentImage] : [images[currentImage]];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % (isDesktop ? groupedImages.length : images.length));
    }, 5000); 

    return () => clearInterval(interval); 
  }, [isDesktop]);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] flex items-center justify-center bg-beige">
      <div className="relative w-full h-full flex">
        {activeImages.map((image, index) => (
          <motion.div
            className="relative h-full w-full md:w-1/2"
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={image}
              alt={`Slider Image ${index}`}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-1 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center">
        {(isDesktop ? groupedImages : images).map((_, index) => (
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