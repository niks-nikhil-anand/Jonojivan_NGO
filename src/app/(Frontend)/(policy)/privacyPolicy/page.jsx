"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Page = () => {
    const [data, setData] = useState(null); // State to store API response
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/admin/dashboard/policy/privacyPolicy`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, []); 

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
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
            className="p-4 md:p-8 max-w-3xl md:max-w-4xl mx-auto bg-white rounded-lg shadow-lg"
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div
                    className="prose prose-sm md:prose-lg mx-auto"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            </motion.div>
        </motion.div>
    );
};

export default Page;
