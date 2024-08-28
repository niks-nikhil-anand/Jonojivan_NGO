"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaRegHeart, FaTimes } from "react-icons/fa";
import Container from '@/components/utils/Container';
import Image from 'next/image';

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showFullImage, setShowFullImage] = useState(null); // For full-size image view
    const router = useRouter();

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev < 100) return prev + 1;
                    clearInterval(interval);
                    return 100;
                });
            }, 30);
        }

        axios.get('/api/admin/dashboard/product/addProduct')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the product data!", error);
                setLoading(false);
            });
    }, [loading]);

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

    if (products.length === 0) {
        return <div>No products found.</div>;
    }

    const handleCardClick = (id) => {
        router.push(`/product/${id}`);
    };

    const handleWishlistClick = () => {
        router.push('/auth/signIn');
    };

    const handleImageClick = (image) => {
        setShowFullImage(image);
    };

    const handleCloseFullImage = () => {
        setShowFullImage(null);
    };

    return (
        <Container>
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4 underline text-start">Products On Sale</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map(product => {
                    const { _id, name, actualPrice, originalPrice, featuredImage } = product;
                    const discountPercentage = Math.round(((originalPrice - actualPrice) / originalPrice) * 100);

                    return (
                        <div
                            key={_id}
                            className="relative max-w-sm bg-white shadow-xl rounded-lg overflow-hidden transform transition-transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                            onClick={() => handleCardClick(_id)}
                        >
                            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
                                Sale
                            </div>
                            <div className="absolute top-2 right-2 z-20">
                                <button
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleWishlistClick();
                                    }}
                                    className="text-black hover:text-red-700 transition-colors"
                                >
                                    <FaRegHeart size={24} />
                                </button>
                            </div>
                            <div className="w-full h-48 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover object-center transition-transform duration-300 transform hover:scale-110"
                                    src={featuredImage}
                                    alt={name}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleImageClick(featuredImage);
                                    }}
                                />
                            </div>
                            <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
                                <h3 className="text-lg font-bold mb-2">{name}</h3>
                                <div className="flex items-center">
                                    <span className="text-gray-500 line-through mr-2">₹{originalPrice}</span>
                                    <span className="text-green-500 font-bold">₹{actualPrice}</span>
                                    <span className="text-red-500 text-sm ml-2">{discountPercentage}% off</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showFullImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative">
                        <img
                            src={showFullImage}
                            alt="Full size product"
                            className="max-w-full max-h-screen"
                        />
                        <button
                            onClick={handleCloseFullImage}
                            className="absolute top-0 right-0 m-4 text-red-500 hover:text-red-700"
                        >
                            <FaTimes size={32} />
                        </button>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default ProductCard;
