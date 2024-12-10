"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import image1 from "../../../../public/frontend/CharityPhotos/image1.jpg";
import image2 from "../../../../public/frontend/CharityPhotos/image2.jpg";
import image3 from "../../../../public/frontend/CharityPhotos/image3.jpg";
import image4 from "../../../../public/frontend/CharityPhotos/image4.jpg";
import image5 from "../../../../public/frontend/CharityPhotos/image5.jpg";
import image6 from "../../../../public/frontend/CharityPhotos/image6.jpg";

const CharityPhotos = () => {
  const images = [image1, image2, image3, image4, image5, image6];
  const imagesLoop = [...images, ...images]; // Duplicate array for infinite scroll effect

  return (
    <div className="py-6 px-2">
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        Photos from Charity
      </h1>
      <p className="text-sm md:text-base lg:text-lg text-center mb-6 text-gray-600">
        A collection of moments from our charitable activities.
      </p>
      {/* Horizontal Scrollable Photo Gallery */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex space-x-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {imagesLoop.map((image, index) => (
            <motion.div
              key={index}
              className="flex-none relative w-48 h-48 sm:w-64 sm:h-64 md:w-56 md:h-80 rounded-lg shadow-lg"
            >
              <Image
                src={image}
                alt={`Charity ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CharityPhotos;
