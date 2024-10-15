"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="flex flex-col px-4 md:px-10 mt-10 mb-10 justify-center md:ml-[90px]">
      <h1 className="text-3xl font-bold mb-2">Grocery Tips</h1>
      <h2 className="text-xl mb-4">Explore the latest Grocery Tips & Trends from our curated selection
      </h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
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
      )}
    </div>
  );
};

export default News;
