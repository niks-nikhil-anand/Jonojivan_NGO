"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaRegHeart } from "react-icons/fa";
import Image from 'next/image';

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
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

    return (
        <div className="flex flex-col mt-5">
            <h2 className="text-xl md:text-4xl mb-4 text-center font-bold text-red-500">Fan Favorites</h2>
            <div className="flex gap-5 hover:cursor-pointer justify-center px-2 py-3 flex-wrap">
                {products.map(product => {
                    const { _id, name, originalPrice, featuredImage, salePrice } = product;

                    return (
                        <div
                            key={_id}
                            className="relative h-[18rem] w-[14rem] sm:h-[22rem] sm:w-[18rem] md:h-[28rem] md:w-[22rem] overflow-hidden rounded-3xl group" // Added group class
                            onClick={() => handleCardClick(_id)}
                        >
                            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-br-lg z-10">
                                Sale
                            </div>
                            <div className="absolute top-2 right-4 z-20">
                                <button
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleWishlistClick();
                                    }}
                                    className="text-black font-bold hover:text-red-700 transition-colors"
                                >
                                    <FaRegHeart size={24} />
                                </button>
                            </div>

                            {/* Image */}
                            <div className="relative h-[18rem] w-[14rem] sm:h-[22rem] sm:w-[18rem] md:h-[28rem] md:w-[22rem] overflow-hidden rounded-3xl">
                                <img
                                    className="object-fill w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105" // Apply hover scaling on the group
                                    src={featuredImage}
                                    alt={name}
                                />
                                <h3 className="absolute bottom-7 left-5 text-center bg-opacity-50 text-red-500 text-lg sm:text-xl md:text-xl font-medium p-1 bg-white px-5 py-2 rounded-lg">{name}</h3>
                                <div className="absolute bottom-7 right-5 text-center bg-opacity-50 text-red-500 text-lg sm:text-xl md:text-xl font-medium p-1 bg-white px-5 py-2 rounded-lg">
                                    <div className='flex flex-col'>
                                        <span className="text-gray-400 line-through mr-2">₹{originalPrice}</span>
                                        <span className="text-green-500 font-medium ml-4">₹{salePrice}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Shop Now button (visible on hover) */}
                            <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-black bg-white px-3 py-2 rounded-2xl text-lg font-bold">Shop Now</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductCard;
