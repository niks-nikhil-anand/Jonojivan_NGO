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
<div className="flex flex-col items-center gap-4">
  <h2 className="text-lg sm:text-xl md:text-4xl mb-4 font-bold text-red-500">
    Shop By Category
  </h2>
  <div className="flex gap-3 justify-center shadow-lg px-3 py-4 overflow-x-auto snap-x snap-mandatory flex-wrap">
    {categories.map((category) => (
      <motion.div
        key={category._id}
        className="flex-shrink-0 snap-center flex flex-col items-center w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        {/* Image container */}
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <img
            src={category.image}
            alt={category.name}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105"
            onError={(e) => (e.target.src = '/path/to/fallback-image.jpg')}
          />
        </div>
        {/* Category Name Below the Image */}
        <p className="text-center text-xs sm:text-sm md:text-lg font-medium text-red-500 mt-2">
          {category.name}
        </p>
      </motion.div>
    ))}
  </div>
</div>


  );
};

export default CategoriesSection;
