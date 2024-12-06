"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader/loader';
import Image from 'next/image';

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
      <h1 className="text-3xl font-bold mb-2">Make a Difference with Your Donation</h1>
      <h2 className="text-xl mb-4">Explore the latest stories, campaigns, and causes that need your support</h2>

      {loading ? (
        <Loader />  
      ) : (
        <>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
    {articles.map((article) => (
      <div
        key={article._id}
        className="flex flex-col md:flex-row bg-gray-100 p-4 shadow-md hover:shadow-lg rounded-lg overflow-hidden cursor-pointer"
        onClick={() => handleCardClick(article._id)}
      >
        {/* Image Section */}
        <div className="relative w-full md:w-1/3">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-[#EF4339] text-white px-3 py-1 text-sm font-bold rounded-md">
            {new Date(article.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col justify-between w-full">
          <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
          <p className="text-gray-600 mt-2">
            {article.subtitle.split(' ').slice(0, 20).join(' ')}
            {article.subtitle.split(' ').length > 20 ? '...' : ''}
          </p>
          <a
            href={`/blog/${article._id}`}
            className="text-red-500 hover:underline text-sm font-bold mt-3"
            onClick={() => handleCardClick(article._id)}
          >
            Learn More
          </a>
        </div>
      </div>
    ))}
  </div>

          {/* Pagination controls */}
          <div className="flex justify-center mt-6 flex-col sm:flex-row">
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
