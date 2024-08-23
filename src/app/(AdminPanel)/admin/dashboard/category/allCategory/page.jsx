"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loader from '@/components/loader/loader';

const Categories = () => {
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
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <motion.div
          key={category._id}
          className="flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
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
  );
};

export default Categories;
