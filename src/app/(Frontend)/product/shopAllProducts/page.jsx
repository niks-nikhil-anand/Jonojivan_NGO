"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Loader from '@/components/loader/loader';
import AllProductPageBannerlg from "../../../../../public/frontend/Banner/AllProductPageBannerlg.webp";
import waveWhite from "../../../../../public/frontend/SvgAssets/wave-white.svg";


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('best-selling');
  const [filters, setFilters] = useState({ availability: '', price: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    fetchProducts();
  }, [sortOption, filters, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/dashboard/product/addProduct');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e) => setSortOption(e.target.value);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const filteredProducts = products
    .filter((product) => {
      if (filters.availability && product.availability !== filters.availability) return false;
      if (filters.price && product.price !== filters.price) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOption === 'best-selling') return a.sales - b.sales;
      if (sortOption === 'price-low-high') return a.price - b.price;
      if (sortOption === 'price-high-low') return b.price - a.price;
      return 0;
    });

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

const ProductCard = ({ product }) => {
  return (
    <motion.div
      className="border p-4 rounded-lg shadow-md bg-white mt-10"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={product.featuredImage}
        alt={product.name}
        className="w-full h-40 object-cover mb-4 rounded-md"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-indigo-600 font-bold">${product.salePrice}</p>
    </motion.div>
  );
};
  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>

          </div>
          <motion.div 
            className="flex justify-between my-10" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <div className="flex space-x-4">
              {/* Availability Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <select
                  name="availability"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <select
                  name="price"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="low-high">Low to High</option>
                  <option value="high-low">High to Low</option>
                </select>
              </div>
            </div>
            {/* Sort Option */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Sort by</label>
              <select
                value={sortOption}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={handleSortChange}
              >
                <option value="best-selling">Best selling</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {/* Pagination */}
          <motion.div className="mt-6 flex justify-center space-x-4">
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
