"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import banner from '../../../../../public/frontend/Banners/ourMissionBanner.jpg'
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [idFromURL, setIdFromURL] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlPath = window.location.pathname;
                const id = urlPath.split('/')[2];
                setIdFromURL(id);

                const response = await fetch(`/api/admin/dashboard/blog/${id}`);
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

    // Function to extract text from content and get reading time
    const getReadingTime = (content) => {
        if (!content) return 5;
        
        let textContent = "";
        if (typeof content === 'string') {
            textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        } else if (typeof content === 'object') {
            textContent = JSON.stringify(content).replace(/[{}"\[\]]/g, ' ');
        }
        
        const words = textContent.split(' ').filter(word => word.length > 0);
        return Math.ceil(words.length / 200); // Assuming 200 words per minute
    };

    const BlogSkeleton = () => (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header Skeleton */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-4 mb-6">
                        <Skeleton className="h-10 w-24" />
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    </div>
                    <Skeleton className="h-12 w-full mb-4" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <Skeleton className="w-full h-96 rounded-xl mb-8" />
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </div>
        </div>
    );

    if (loading) {
        return <BlogSkeleton />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
                <Card className="max-w-md mx-4">
                    <CardContent className="p-8 text-center">
                        <div className="text-red-500 text-5xl mb-4">⚠️</div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button onClick={() => router.back()} variant="outline">
                            Go Back
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-sm border-b sticky top-0 z-10 backdrop-blur-md bg-white/90"
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                            className="flex items-center gap-2 hover:bg-gray-100"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Stories
                        </Button>
                        
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600">
                                <Heart className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight"
                    >
                        {data.title}
                    </motion.h1>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap items-center gap-4 text-sm text-gray-600"
                    >
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(data.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            })}
                        </Badge>
                        
                        <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {getReadingTime(data.content)} min read
                        </Badge>
                    </motion.div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8"
                >
                    {/* Featured Image */}
                    {data.featuredImage && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <img
                                src={data.featuredImage}
                                alt={data.title}
                                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </motion.div>
                    )}

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12"
                    >
                        {data.content && (
                            <div
                                className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-img:rounded-xl prose-img:shadow-lg"
                                dangerouslySetInnerHTML={{ __html: data.content }}
                            />
                        )}
                    </motion.div>
                </motion.article>

                {/* Call to Action Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16"
                >
                    <Card className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 border-0 shadow-2xl">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <CardContent className="relative p-8 sm:p-12 text-center text-white">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1 }}
                            >
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                    Your Donation Can Change Everything
                                </h2>
                                <p className="text-lg sm:text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
                                    When you donate to Bring Smile, you are not just contributing to a cause—you are changing the course of lives.
                                </p>
                                <Button
                                    size="lg"
                                    className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    Donate Now
                                </Button>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default Page;