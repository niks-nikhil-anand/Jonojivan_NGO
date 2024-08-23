"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loader from '@/components/loader/loader';

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
    <div className="py-8 px-4">
      <h2 className="text-2xl font-semibold  mb-6">Categories</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {categories.map((category) => (
          <motion.div
            key={category._id}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="w-15 h-20 rounded-full overflow-hidden shadow-lg flex justify-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = '/path/to/fallback-image.jpg')} // Fallback image in case of error
              />
            </div>
            <p className="mt-2 text-center text-sm font-medium">{category.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
