"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loader from '@/components/loader/loader';
import Container from '@/components/utils/Container';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/admin/dashboard/category')
      .then((response) => {
        // Directly handle the array if the data is not nested
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('Unexpected response format:', response);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />; // Show loader while fetching
  }

  if (!categories.length) {
    return <p className="text-center">No categories available.</p>;
  }

  return (
<div className="flex flex-col">
  <h2 className="text-xl sm:text-2xl md:text-4xl mb-4 text-center font-bold text-red-500">
    Shop By Health Focus
  </h2>
  <div className="flex gap-4 hover:cursor-pointer justify-center shadow-lg px-2 py-3 overflow-x-scroll snap-x snap-mandatory sm:flex-wrap">
    {categories.map((category) => (
      <motion.div
        key={category._id}
        className="relative flex-shrink-0 snap-center flex flex-col items-center h-[18rem] w-[18rem] sm:h-[24rem] sm:w-[24rem] md:w-[30rem] md:h-[30rem] rounded-md"
      >
        <div className="relative w-full overflow-hidden rounded-3xl">
          <img
            src={category.image}
            alt={category.name}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105"
            onError={(e) => (e.target.src = '/path/to/fallback-image.jpg')}
          />
          {/* Name over the image */}
          <p className="absolute top-10 left-0 right-0 text-center bg-opacity-50 text-red-500 text-base sm:text-lg md:text-xl lg:text-2xl font-medium p-1">
            {category.name}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</div>
  );
};

export default CategoriesSection;
