"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loader from '@/components/loader/loader';
import { FaEdit, FaTrash } from 'react-icons/fa';


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(10); 

  // Fetch categories from API
  useEffect(() => {
    axios
      .get('/api/admin/dashboard/category')
      .then((response) => {
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loader />; // Show loader while fetching
  }

  if (!categories.length) {
    return <p className="text-center">No categories available.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4 md:p-8">
  <h2 className="text-lg sm:text-xl md:text-4xl mb-4 font-bold text-red-500">
    JonoJivan Categories
  </h2>

  {/* Category Cards Container with Fixed Height and Scrollbar */}
  <div className="flex gap-4 sm:gap-6 justify-center shadow-lg p-4 md:p-6 overflow-y-auto flex-wrap w-full h-80 md:h-96">
    {categories.map((category) => (
      <motion.div
        key={category._id}
        className="flex-shrink-0 flex flex-col items-center w-28 h-36 sm:w-36 sm:h-48 md:w-56 md:h-64 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-3 sm:p-4"
      >
        {/* Circular Image Container */}
        <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center mb-2 sm:mb-3">
          <img
            src={category.image}
            alt={category.name}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110"
            onError={(e) => (e.target.src = '/path/to/fallback-image.jpg')}
          />
        </div>

        {/* Category Name Below the Image */}
        <p className="text-center text-xs sm:text-sm md:text-lg font-medium text-red-500 mt-1 sm:mt-2">
          {category.name}
        </p>
      </motion.div>
    ))}
  </div>

  {/* Pagination controls */}
  <div className="mt-8 flex justify-center space-x-4">
    {[...Array(Math.ceil(categories.length / itemsPerPage)).keys()].map((number) => (
      <button
        key={number}
        className={`px-3 py-1 rounded-md ${
          currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
        }`}
        onClick={() => paginate(number + 1)}
      >
        {number + 1}
      </button>
    ))}
  </div>
</div>

  );
};

export default Categories;
