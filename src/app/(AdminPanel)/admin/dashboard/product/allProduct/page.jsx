"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loader from '@/components/loader/loader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 

  // Fetch products from API
  useEffect(() => {
    axios
      .get('/api/admin/dashboard/product/addProduct')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Unexpected response format:', response);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loader />; // Show loader while fetching
  }

  if (!products.length) {
    return <p className="text-center">No products available.</p>;
  }

  const truncateName = (name, wordLimit = 4) => {
    const words = name.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : name;
  };

  return (
    <div>
      {/* Display products */}
      <div className="flex flex-wrap justify-start gap-4">
        {currentProducts.map((product) => (
          <motion.div
            key={product._id}
            className="flex flex-col items-center bg-gray-300 px-4 py-6 w-64 h-80 rounded-2xl" // Fixed width and height
           
          >
            <div className="h-[10rem] overflow-hidden shadow-lg rounded-lg hover:cursor-pointer">
              <img
                src={product.featuredImage}
                alt={product.name} // Use product name for alt text
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = '/path/to/fallback-image.jpg')} // Fallback image
              />
            </div>
            <p className="mt-5 text-center text-xl font-medium">
              {truncateName(product.name)}
            </p>
            <p className="text-center text-2xl font-bold text-green-500 mt-2">
              ${product.salePrice}
            </p>
            <div className="mt-4 flex justify-between w-full">
              <button 
                onClick={() => handleView(product._id)} 
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                View
              </button>
              <button 
                onClick={() => handleDelete(product._id)} 
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="mt-8 flex justify-center space-x-4">
        {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map((number) => (
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

export default Products;
