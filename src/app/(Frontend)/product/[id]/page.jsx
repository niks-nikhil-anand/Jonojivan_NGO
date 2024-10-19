"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';
import Loader from '@/components/loader/loader';
import ProductBanner from '@/components/frontend/ui/(Banners)/ProductBanner';
import { AiOutlineDown } from 'react-icons/ai';


const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [idFromURL, setIdFromURL] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const urlPath = window.location.pathname;
        const id = urlPath.substring(urlPath.lastIndexOf('/') + 1);
        setIdFromURL(id);

        if (id) {
            const interval = setInterval(() => {
                setProgress(prev => (prev < 100 ? prev + 1 : prev));
            }, 10); 

            axios.get(`/api/admin/dashboard/product/${id}`)
                .then(response => {
                    clearInterval(interval);
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching product data:", error);
                    clearInterval(interval);
                    setLoading(false);
                });
        }
    }, []);

    if (loading) {
        return (
            <Loader/>
        );
    }
    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    if (!product) {
        return <div>Product not found.</div>;
    }

    

    const { name, description, images, salePrice, originalPrice, featuredImage, ratings, descriptionImage , servingPerBottle , suggestedUse , ingredients , productHighlights} = product;
    const averageRating = ratings?.average || 4.2;
    const allImages = [ ...(images || [])];

    const ProductHighlights = () => {
        return (
          <div className="flex flex-col items-center justify-center min-h-[75vh] bg-white py-10">
      <motion.h2
        className="text-2xl font-semibold text-orange-600 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Product Highlights
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-10">
        {productHighlights.map((productHighlights, index) => (
          <motion.div
            key={productHighlights.id}
            className="flex flex-col items-center max-w-xs text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <img
                    src={productHighlights.icon}
                    alt={productHighlights.icon}
                    className="h-20 w-20 mx-auto mb-4 rounded-full"
                  />
            <h3 className="text-lg font-bold text-orange-600 mb-2">
              {productHighlights.title}
            </h3>
            <p className="text-gray-600">{productHighlights.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
        );
      };

      const FeaturedIngredients = () => {
        return (
          <div className="py-10 bg-white">
            <h2 className="text-center text-3xl font-semibold text-orange-600 mb-10">
              Featured Ingredients
            </h2>
            <div className="flex justify-center items-start space-x-5">
              {ingredients.map((ingredient, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-100 rounded-xl p-6 shadow-md w-1/5"
                >
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="h-20 w-20 mx-auto mb-4 rounded-full"
                  />
                  <h3 className="text-orange-600 text-center font-semibold text-lg mb-2">
                    {ingredient.name}
                  </h3>
                  <p className="text-center text-gray-700 mb-2">
                    {ingredient.description}
                  </p>
                  <p className="text-center font-semibold text-gray-800">
                    {ingredient.weightInGram}mg
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        );
      };
      

    return (
        <div>
        <motion.div 
  className="flex flex-col lg:flex-row  p-4 sm:p-6 bg-[#e0d2ff] w-full h-full"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  {/* Product Images */}
  <div className="w-[49%] h-full flex flex-col items-center">
    {/* Preview Image */}
    <div className="w-[30rem] h-[40rem] flex justify-center items-center overflow-hidden mb-4 relative">
        <img 
            src={selectedImage || featuredImage} 
            alt={name} 
            className="object-contain w-full h-full cursor-pointer"
            onClick={() => selectedImage && setSelectedImage(selectedImage)}
        />
    </div>

    {/* Thumbnail Images */}
    <div className="flex gap-2 overflow-x-auto w-full">
        {allImages.length > 0 ? (
            allImages.map((image, index) => (
                <motion.div 
                    key={index}
                    className="w-[5rem] h-[5rem] sm:w-[6rem] sm:h-[6rem] overflow-hidden rounded-lg shadow-lg cursor-pointer border border-gray-300 p-1"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    <img 
                        src={image} 
                        alt={`Product Image ${index + 1}`} 
                        className="w-full h-full object-cover rounded"
                    />
                </motion.div>
            ))
        ) : (
            <div className="col-span-5 flex items-center justify-center text-gray-500">
                No images available
            </div>
        )}
    </div>
</div>


  {/* Product Details */}
  <div className="w-[40rem] bg-white rounded-3xl  px-[5rem] py-[5rem]">
    <motion.div 
      className="flex flex-col justify-start mb-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-2xl sm:text-3xl font-bold mb-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {name}
      </motion.h1>

      <div className="flex items-center mb-2">
        <span className="text-green-500 text-lg font-bold">★ ★ ★ ★ ★</span>
        <span className="text-gray-500 ml-2">157 Reviews</span>
      </div>

      <h2 className="text-purple-500 mb-2 text-sm">SERVINGS PER BOTTLE: {servingPerBottle}</h2>

      <h1 className="text-3xl font-bold mb-4">
        ₹{salePrice || originalPrice}
      </h1>

      <div className="mb-4">
        <label className="block mb-1 font-bold">Purchase Options</label>
        <div className="flex flex-col">
          <label className="flex items-center">
            <input type="radio" name="purchase" className="mr-2" defaultChecked />
            <span>One-time purchase ₹{salePrice || originalPrice}</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="purchase" className="mr-2" />
            <span>Subscribe & Save 20% ₹{(salePrice || originalPrice) * 0.8}</span>
          </label>
        </div>
        <div className="text-blue-600 text-sm mt-2 cursor-pointer">Subscription details</div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-gray-700">Quantity</span>
        <div className="flex items-center border rounded-md">
          <button className="px-3 py-1">-</button>
          <input type="number" className="w-12 text-center border-l border-r" value={1} />
          <button className="px-3 py-1">+</button>
        </div>
      </div>
    </motion.div>

    {/* Action Buttons */}
    <motion.div 
      className="flex flex-col gap-4 w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-3 bg-[#6a0dad] text-white rounded-full shadow-lg hover:bg-[#4b0082] transition text-base"
      >
        Add to Cart
      </motion.button>
    </motion.div>

    <div className='flex flex-col'>
      <div className='flex justify-between px-3 py-5'>
      <h3 className="text-orange-600 font-bold mb-2">Suggested Use</h3>
      <AiOutlineDown 
        className="cursor-pointer text-2xl text-orange-600" 
        onClick={toggleOpen} 
      />
      </div>
      {isOpen && (
        <div className="mt-1 px-3">
         
          <p className="text-gray-700">{suggestedUse}</p>
        </div>
      )}
    </div>
  </div>
</motion.div>
<div>
{product.productHighlights && (
        <ProductHighlights highlights={product.productHighlights} />
    )}
</div>
            {/* Additional Banner */}
            <div className='flex flex-col md:flex-row items-center p-4 md:p-8 mt-10 bg-[#e0d2ff]'>
                <div className='flex w-full justify-between'>
                <div className='w-full md:w-1/2'>
                        <Image
                            src={descriptionImage}
                            alt='Banner Image'
                            className='w-full h-[30rem] object-cover rounded-xl'
                            width={500} // Set the appropriate width
                            height={300} // Set the appropriate height
                        />
                    </div>
                    <div className='flex flex-col  justify-start'>
                    <h1 className='text-xl md:text-4xl  text-[#D07021] mb-4 w-[30rem]'>
                        {name}
                    </h1>
                    <p className='text-black-100 text-lg md:text-xl leading-relaxed w-[40rem]'>
                        {description}
                    </p>
                    </div>
                    
                </div>
            </div>
            <div>
              <FeaturedIngredients/>
               <ProductBanner/>
            </div>

            {/* Full-Screen Image Modal */}
            {selectedImage && (
                <motion.div 
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative bg-white p-2 rounded-lg" style={{ width: '80vw', height: '80vh' }}>
                        <img src={selectedImage} alt="Full Size Product" className="w-full h-full object-contain" />
                        <button 
                            className="absolute top-4 right-4 text-black text-3xl"
                            onClick={() => setSelectedImage(null)}
                        >
                            <MdClose />
                        </button>
                    </div>
                   
                </motion.div>
            )}
        </div>
    );
};

export default ProductDetail;



