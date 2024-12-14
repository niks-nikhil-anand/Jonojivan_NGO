"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";



const CharityPhotos = () => {
  const [sharpenedImage, setSharpenedImage] = useState([]);

  useEffect(() => {
    // Fetch the sharpened image URLs from the API
    fetch("/api/sharpen-charity-image")
      .then((response) => response.json())
      .then((data) => {
        if (data.images && Array.isArray(data.images)) {
          // Normalize all image URLs in the array
          const normalizedImages = data.images.map((image) =>
            image.replace(/\\/g, "/").replace(/\.jp$/, ".jpg")
          );
  
          console.log("Normalized Image URLs:", normalizedImages);
  
          // Optionally, set the first normalized image
          if (normalizedImages.length > 0) {
            setSharpenedImage(normalizedImages);
          }
        }
      })
      .catch((error) => console.error("Error fetching sharpened images:", error));
  }, []);


  const duplicatedImages = [...sharpenedImage, ...sharpenedImage];

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
           {duplicatedImages.map((image, index) => (
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
