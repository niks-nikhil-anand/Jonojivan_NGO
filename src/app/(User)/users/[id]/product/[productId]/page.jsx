"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import Container from '@/components/utils/Container';
import { useRouter } from 'next/navigation';

const ProductDetail = () => {
    // State to hold product data, selected product ID, selected image, loading state, and progress
    const [product, setProduct] = useState(null);
    const [id, setId] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [buttonText, setButtonText] = useState('Add to Cart');
    const router = useRouter();

    useEffect(() => {
        // Extracting product ID from URL path
        const urlPath = window.location.pathname;
        const id = urlPath.substring(urlPath.lastIndexOf('/') + 1);
        setId(id);

        if (id) {
            // Simulate loading progress
            const interval = setInterval(() => {
                setProgress(prevProgress => (prevProgress < 100 ? prevProgress + 1 : prevProgress));
            }, 10);

            // Fetch product data by ID
            axios.get(`/api/admin/dashboard/product/${id}`)
                .then(response => {
                    clearInterval(interval); // Clear interval on successful data fetch
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("There was an error fetching the product data!", error);
                    clearInterval(interval); // Clear interval on error
                    setLoading(false);
                });
        }
    }, [id]);

    const handleAddToCart = () => {
        if (id) {
            setButtonText('Adding to Cart'); // Update button text during API call

            axios.post(`/api/users/cart/${id}`)
                .then(() => {
                    setIsAddedToCart(true);
                    setButtonText('Go to Cart'); // Update button text on success
                })
                .catch(error => {
                    console.error("There was an error adding the product to the cart!", error);
                    setButtonText('Add to Cart'); // Reset button text on failure
                });
        }
    };

    const handleGoToCart = () => {
        router.push(`/users/${id}/cart`);
    };

    // Determine which button action to take
    const handleButtonClick = () => {
        if (buttonText === 'Go to Cart') {
            handleGoToCart();
        } else {
            handleAddToCart();
        }
    };

    // Loading state with progress display
    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="relative w-24 h-24 bg-gray-200 rounded-full border border-gray-300">
                    <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold text-xl">
                        {progress}%
                    </div>
                </div>
            </div>
        );
    }

    // Product not found state
    if (!product) {
        return <div>Product not found.</div>;
    }

    const { name, description, images, actualPrice, originalPrice, featuredImage, ratings } = product;
    const averageRating = ratings?.average || 4.2;

    return (
        <Container>
            {/* Main product details container with animations */}
            <motion.div 
                className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 bg-white shadow-xl rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex-1">
                    {/* Featured image display */}
                    <div className="w-full h-64 sm:h-80 overflow-hidden rounded-lg shadow-lg mb-4">
                        <img 
                            src={featuredImage} 
                            alt={name} 
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => setSelectedImage(featuredImage)}
                        />
                    </div>
                    {/* Thumbnail images grid */}
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

                <div className="flex-1">
                    {/* Product rating display */}
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

                    {/* Product name */}
                    <motion.h1 
                        className="text-2xl sm:text-3xl font-bold mb-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {name}
                    </motion.h1>
                    
                    {/* Product description */}
                    <motion.p 
                        className="text-gray-700 mb-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {description}
                    </motion.p>

                    {/* Pricing display */}
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

                    {/* Action buttons for adding to cart and buying now */}
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.button 
                            onClick={handleButtonClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-2 rounded-lg shadow transition text-sm sm:text-base ${
                                isAddedToCart ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
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

            {/* Full-screen image preview with close button */}
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
