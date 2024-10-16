"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 6; // Adjust this value based on your preference

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log('Fetching articles...');
        const response = await axios.get('/api/admin/dashboard/blog');
        console.log('Articles fetched:', response.data);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
        console.log('Loading state set to false');
      }
    };

    fetchArticles();
  }, []);

  const handleCardClick = (id) => {
    console.log('Card clicked with ID:', id);
    router.push(`/blog/${id}`);
  };

  // Calculate the current articles based on the current page
  const indexOfLastArticle = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstArticle = indexOfLastArticle - ITEMS_PER_PAGE;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Calculate total pages
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col px-4 md:px-10 mt-10 mb-10 justify-center md:ml-[90px]">
      <h1 className="text-3xl font-bold mb-2">Wellness Blog</h1>
      <h2 className="text-xl mb-4">Explore the latest Grocery Tips & Trends from our curated selection</h2>
      
      {loading ? (
        <motion.div
          className="flex justify-center items-center h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loader"></div>
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentArticles.map((article) => (
              <motion.div
                key={article._id}
                className="p-4 bg-white rounded-lg shadow-md cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCardClick(article._id)}
              >
                <img src={article.featuredImage} alt={article.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                <h3 className="text-2xl font-semibold">{article.title}</h3>
                <p className="text-gray-600">{article.subtitle}</p>
                <div className="text-sm text-gray-500 mt-2">By {article.author} in {article.category}</div>
                <div className="text-xs text-gray-400 mt-1">Published on {new Date(article.createdAt).toLocaleDateString()}</div>
              </motion.div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center mt-6">
            <button
              className={`px-4 py-2 mx-2 bg-gray-300 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
            <button
              className={`px-4 py-2 mx-2 bg-gray-300 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default News;
