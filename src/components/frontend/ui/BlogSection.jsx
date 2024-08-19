"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      console.log('Fetching articles...'); // Log before fetching articles
      try {
        const response = await axios.get('/api/admin/dashboard/blog/addBlog');
        console.log('Articles fetched:', response.data); // Log after fetching articles
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        // Consider adding a user-friendly message here
      } finally {
        setLoading(false);
        console.log('Loading state set to false'); // Log when loading state is set to false
      }
    };

    fetchArticles();
  }, []);

  const handleCardClick = (id) => {
    console.log(`Card clicked with id: ${id}`); // Log the ID of the clicked card
    router.push(`/news/${id}`);
  };

  return (
    <div className="flex flex-col px-4 md:px-10 mt-10 mb-10 justify-center md:ml-[90px]">
      <h1 className="text-3xl font-bold mb-2">News</h1>
      <h2 className="text-xl mb-4">Below is a list of properties that are currently up for sale</h2>
      {loading ? (
        <div>Loading...</div> 
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.slice(0, 3).map((article) => (
            <motion.div
              key={article._id}
              className="p-4 bg-white rounded-lg shadow-md cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCardClick(article._id)}
            >
              <Image src={article.featuredImage} alt={article.title} width={500} height={300} className="w-full h-48 object-cover rounded-t-lg mb-4" />
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
