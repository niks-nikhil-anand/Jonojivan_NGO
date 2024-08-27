"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import Container from '@/components/utils/Container';
import { useRouter } from 'next/navigation';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [idFromURL, setIdFromURL] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [buttonText, setButtonText] = useState('Add to Cart');
    const router = useRouter();

    useEffect(() => {
        const urlPath = window.location.pathname;
        const id = urlPath.substring(urlPath.lastIndexOf('/') + 1);
        setIdFromURL(id);
        console.log(idFromURL);

        if (id) {
            // Simulate loading progress
            const interval = setInterval(() => {
                setProgress(prevProgress => (prevProgress < 100 ? prevProgress + 1 : prevProgress));
            }, 10); // Speed of counting

            axios.get(`/api/admin/dashboard/product/${id}`)
                .then(response => {
                    clearInterval(interval);
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("There was an error fetching the product data!", error);
                    clearInterval(interval);
                    setLoading(false);
                });
        }
    }, [idFromURL]);

    const handleAddToCart = () => {
        axios.post(`/api/users/cart/${idFromURL}`)
            .then(() => {
                setIsAddedToCart(true);
                setButtonText('Go to Cart');
                setTimeout(() => {
                    router.push(`/user/${idFromURL}/Cart`);
                }, 500); // Delay for visual feedback
            })
            .catch(error => {
                console.error("There was an error adding the product to the cart!", error);
            });
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="relative w-24 h-24 bg-gray-200 rounded-full border border-gray-300">
                    {/* Static percentage inside the loader */}
                    <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold text-xl">
                        {progress}%
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    const { name, description, images, actualPrice, originalPrice, featuredImage, ratings } = product;
    const averageRating = ratings?.average || 4.2;

    return (
        <Container>
            <motion.div 
                className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 bg-white shadow-xl rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Product Images */}
                <div className="flex-1">
                    <div className="w-full h-64 sm:h-80 overflow-hidden rounded-lg shadow-lg mb-4">
                        <img 
                            src={featuredImage} 
                            alt={name} 
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => setSelectedImage(featuredImage)}
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {images && images.length > 0 ? (
                            images.map((image, index) => (
                                <motion.div 
                                    key={index}
                                    className="w-full h-20 sm:h-24 overflow-hidden rounded-lg shadow-lg cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 100 }}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img 
                                        src={image} 
                                        alt={`Product Image ${index + 1}`} 
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-4 flex items-center justify-center text-gray-500">
                                No images available
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex-1">
                    {/* Product Rating */}
                    <motion.div 
                        className="flex items-center mb-2"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AiFillStar className="text-yellow-400 mr-1" />
                        <span className="text-gray-700 text-lg">{averageRating}</span>
                        <span className="text-gray-500 ml-2">({ratings?.numberOfRatings || 0} ratings)</span>
                    </motion.div>

                    {/* Product Title */}
                    <motion.h1 
                        className="text-2xl sm:text-3xl font-bold mb-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {name}
                    </motion.h1>
                    
                    <motion.p 
                        className="text-gray-700 mb-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {description}
                    </motion.p>

                    <motion.div 
                        className="flex items-center mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {originalPrice && (
                            <span className="text-gray-500 line-through mr-2 text-sm sm:text-base">₹{originalPrice}</span>
                        )}
                        <span className="text-green-500 text-xl sm:text-2xl font-bold">₹{actualPrice}</span>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.button 
                            onClick={handleAddToCart}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-sm sm:text-base"
                        >
                            {buttonText}
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-sm sm:text-base"
                        >
                            Buy Now
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Full-Screen Image Modal */}
            {selectedImage && (
                <motion.div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative">
                        <img src={selectedImage} alt="Full Size Product" className="max-w-full max-h-full object-contain" />
                        <button 
                            className="absolute top-4 right-4 text-white text-3xl"
                            onClick={() => setSelectedImage(null)}
                        >
                            <MdClose />
                        </button>
                    </div>
                </motion.div>
            )}
        </Container>
    );
};

export default ProductDetail;
