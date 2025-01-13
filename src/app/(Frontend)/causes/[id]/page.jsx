"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import banner from '../../../../../public/frontend/Banners/ourMissionBanner.jpg'
import Image from 'next/image';
import Loader from '@/components/loader/loader';


const Page = () => {
    const [idFromURL, setIdFromURL] = useState('');
    const [data, setData] = useState(null); // State to store API response
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlPath = window.location.pathname;
                const id = urlPath.split('/')[2];
                setIdFromURL(id);

                // Fetch data from the API
                const response = await fetch(`/api/admin/dashboard/campaign/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // Set loading to false after the API call completes
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once after the initial render

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader/>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500 text-lg p-4">Error: {error}</div>;
    }

    return (
        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
  className="p-4 md:p-8 mx-auto max-w-7xl bg-gray-50"
>
  {/* Content Section */}
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="space-y-6 bg-white shadow-lg rounded-lg p-6 md:p-8"
  >
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
      {data.title}
    </h2>

    {data.image && (
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-auto rounded-lg max-h-96 object-cover shadow-md"
      />
    )}
    
    {data.description && (
      <div
        className="prose prose-sm md:prose-lg text-gray-700"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
    )}

    {data.content && (
      <div
        className="prose prose-sm md:prose-lg text-gray-700"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    )}
  </motion.div>

 
</motion.div>

    );
};

export default Page;
