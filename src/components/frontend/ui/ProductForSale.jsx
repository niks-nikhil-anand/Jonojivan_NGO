"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@/components/utils/Container';

const ProductCard = () => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch the product data from the API
        axios.get('/api/admin/dashboard/product/addProduct')
            .then(response => {
                const productData = response.data[0]; // Assuming the first product is what you want to display
                setProduct(productData);
            })
            .catch(error => {
                console.error("There was an error fetching the product data!", error);
            });
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    const { title, actualPrice, originalPrice, featuredImage } = product;

    // Calculate the percentage off
    const discountPercentage = Math.round(((originalPrice - actualPrice) / originalPrice) * 100);

    return (
        <Container>
            <div className="max-w-sm bg-white shadow-xl rounded-lg overflow-hidden relative transform transition-transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">
                    Sale
                </div>
                <div className="w-full h-48 overflow-hidden">
                    <img className="w-full h-full object-cover object-center transition-transform duration-300 transform hover:scale-110" 
                        src={featuredImage} 
                        alt={title} 
                    />
                </div>
                <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
                    <h3 className="text-lg font-bold mb-2">{title}</h3>
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
