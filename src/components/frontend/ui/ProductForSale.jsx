"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Container from '@/components/utils/Container';

const ProductCard = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // Simulate loading progress
        if (loading) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev < 100) return prev + 1;
                    clearInterval(interval);
                    return 100;
                });
            }, 30); // Adjust the interval for speed of progress increase
        }
        
        // Fetch the product data from the API
        axios.get('/api/admin/dashboard/product/addProduct')
            .then(response => {
                const productData = response.data[0]; // Assuming the first product is what you want to display
                setProduct(productData);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error("There was an error fetching the product data!", error);
                setLoading(false); // Set loading to false even if there's an error
            });
    }, [loading]);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="relative w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full ">
                    {/* Static percentage inside the loader */}
                    <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">
                        {progress}%
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    const { _id, name, actualPrice, originalPrice, featuredImage } = product;

    // Calculate the percentage off
    const discountPercentage = Math.round(((originalPrice - actualPrice) / originalPrice) * 100);

    // Handle redirection when the product card is clicked
    const handleCardClick = () => {
        router.push(`/product/${_id}`);
    };

    return (
        <Container>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-center mb-4">Product In Sale</h2>
            </div>
            <div 
                className="max-w-sm bg-white shadow-xl rounded-lg overflow-hidden relative transform transition-transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                onClick={handleCardClick}
            >
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
                    Sale
                </div>
                <div className="w-full h-48 overflow-hidden">
                    <img className="w-full h-full object-cover object-center transition-transform duration-300 transform hover:scale-110" 
                        src={featuredImage} 
                        alt={name} 
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
        </Container>
    );
};

export default ProductCard;
