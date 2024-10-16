"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const BlogSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      console.log('Fetching articles...'); // Log before fetching articles
      try {
        const response = await axios.get('/api/admin/dashboard/blog');
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
    router.push(`/blog/${id}`);
  };

  return (
    <div className="flex flex-col px-4 md:px-10 mt-10 mb-10 justify-center md:ml-[90px]">
      <h1 className="h6 mb-2">Beauty Tips</h1>
      <h2 className="base-small mb-4">Explore the latest Grocery Tips & Trends from our curated selection</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="relative overflow-x-auto overflow-y-hidden no-scrollbar">
          {/* Horizontal scroll container */}
          <div className="flex md:grid md:grid-cols-3 gap-6 w-max md:w-full">
            {articles.slice(0, 3).map((article) => (
              <motion.div
                key={article._id}
                className="p-6 bg-white rounded-lg shadow-md cursor-pointer w-96 flex-shrink-0 md:flex-shrink"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCardClick(article._id)}
              >
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="h6 mb-2  ">{article.title}</h3>
                {/* Limiting the subtitle to 50 words */}
                <p className="text-gray-600 base-small">
                  {article.subtitle.split(" ").slice(0, 30).join(" ")}{article.subtitle.split(" ").length > 30 ? "..." : ""}
                </p>
                <div className="text-sm text-gray-500 mt-2">By {article.author} in {article.category}</div>
                <div className="text-xs text-gray-400 mt-1">Published on {new Date(article.createdAt).toLocaleDateString()}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

};

export default BlogSection;
