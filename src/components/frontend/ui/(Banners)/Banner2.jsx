"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loader from '@/components/loader/loader';
import bgImage from '../../../../../public/frontend/Banner/worldMapBanner.webp'

const BlogInProductPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log('Fetching articles...');
        const response = await axios.get(`/api/admin/dashboard/blog`);
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
    window.location.href = `/blog/${id}`;
  };

  return (
    <div className="flex flex-col px-4 md:px-10 mt-10 mb-10 justify-center md:ml-[90px]">
  {/* Heading Section */}
  <div
    className="relative bg-no-repeat bg-right"
    style={{ backgroundImage: `url(${bgImage.src})` }}
  >
    <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-bold text-left leading-tight">
      MAKE SOMEONE’S LIFE BY
      <span className="block w-full text-[#F4B03E]">GIVING OF YOURS.</span>
    </h2>
  </div>

  
    {loading ? (
      <Loader />
    ) : (
      <div className="overflow-x-auto py-4">
        <div className="flex gap-4 flex-wrap"> {/* flex-wrap for wrapping cards on small screens */}
          {articles.map((article) => (
            <motion.div
              key={article._id}
              className="p-4 cursor-pointer w-full sm:w-full md:w-[30%] mt-5"
              onClick={() => handleCardClick(article._id)}
            >
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-44 sm:h-56 md:h-44 object-cover rounded-t-lg mb-3"
              />
              <h3 className="text-base md:text-xl lg:text-base font-semibold text-center textColor hover:underline">
                {article.title}
              </h3>
              <div className='mt-5'>
                <p className="text-sm md:text-base lg:text-sm text-gray-600 ">
                  {article.subtitle.split(" ").slice(0, 50).join(" ")}{article.subtitle.split(" ").length > 50 ? "..." : ""}
                </p>
                <div className="text-xs md:text-sm lg:text-base text-gray-500 mt-2">
                  {article.category}
                </div>
                <div className="text-xs md:text-sm lg:text-base text-gray-400 mt-1">
                  Published on {new Date(article.createdAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )}
  </div>
  
  );
};

export default BlogInProductPage;
