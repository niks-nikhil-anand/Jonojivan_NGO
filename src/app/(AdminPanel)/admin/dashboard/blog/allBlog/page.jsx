"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5; // Set the number of articles per page
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

  // Get current articles for pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCardClick = (id) => {
    console.log('Card clicked with ID:', id);
    router.push(`/blog/${id}`);
  };

  return (
    <div className="flex flex-col  mb-10 mt-5 px-10">
      <h1 className="text-3xl font-bold mb-2 text-center">Beauty Tips</h1>
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
          <div className="space-y-4">
            {currentArticles.map((article) => (
              <motion.div
                key={article._id}
                className="flex bg-white rounded-lg shadow-md cursor-pointer p-4"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCardClick(article._id)}
              >
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div className="flex flex-col justify-between">
                  <h3 className="text-xl font-semibold mb-1">{article.title}</h3>
                  <p className="text-gray-600 mb-1">{article.subtitle}</p>
                  <div className="text-sm text-gray-500">
                    By {article.author} in {article.category}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Published on {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: Math.ceil(articles.length / articlesPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 border rounded ${
                  currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default News;
