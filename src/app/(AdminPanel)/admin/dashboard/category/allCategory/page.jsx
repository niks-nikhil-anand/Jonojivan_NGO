"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loader from '@/components/loader/loader';
import { FaEdit, FaTrash } from 'react-icons/fa';


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [itemsPerPage] = useState(10); // Number of items per page

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
    <div>
      {/* Display categories */}
      <div className="flex flex-wrap justify-start gap-4">
        {currentCategories.map((category) => (
          <motion.div
            key={category._id}
            className="flex flex-col items-center bg-gray-300 px-4 py-6 rounded-2xl"
            
          >
            <div className="h-[10rem] overflow-hidden shadow-lg rounded-lg hover:cursor-pointer">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-xl "
                onError={(e) => (e.target.src = '/path/to/fallback-image.jpg')} 
              />
            </div>
            <p className="mt-5 text-center text-xl font-medium">{category.name}</p>

            <div className="flex space-x-2 mt-3">
              <button
                className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                onClick={() => handleEdit(category._id)}
              >
                <FaEdit className="mr-1" />
                Edit
              </button>
              <button
                className="flex items-center px-3 py-1 text-sm bg-red-500 text-white rounded shadow hover:bg-red-600"
                onClick={() => handleDelete(category._id)}
              >
                <FaTrash className="mr-1" />
                Delete
              </button>
            </div>
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
