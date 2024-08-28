"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import image1 from '../../../../public/frontend/slider/image1.jpg';
import image2 from '../../../../public/frontend/slider/image2.jpg';
import image3 from '../../../../public/frontend/slider/image3.jpg';
import image4 from '../../../../public/frontend/slider/image4.jpg';
import image5 from '../../../../public/frontend/slider/image5.jpg';

const images = [image1, image2, image3, image4, image5];

const ManualSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <motion.div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image.src}
            alt={`Slide ${index + 1}`}
            className="w-full h-auto object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ))}
      </motion.div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
        onClick={prevSlide}
      >
        <span className="text-xl">&lt;</span>
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
        onClick={nextSlide}
      >
        <span className="text-xl">&gt;</span>
      </button>
    </div>
  );
};

export default ManualSlider;
