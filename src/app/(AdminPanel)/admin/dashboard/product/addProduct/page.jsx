"use client"
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import axios from 'axios';

const AddProductForm = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false); // Loading state
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            category: '',
            stock: 0,
            colors: [{ colorName: '', stock: 0 }],
            images: [{ url: '' }],
            featuredImage: '',
            brand: '',
            sku: '',
            isFeatured: false,
            isOnSale: false,
            tags: ['']
        }
    });

    const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
        control,
        name: 'colors'
    });

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control,
        name: 'images'
    });

    const [featuredImageFile, setFeaturedImageFile] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);

    const handleFeaturedImageChange = (event) => {
        setFeaturedImageFile(event.target.files[0]);
    };

    const handleImageChange = (index) => (event) => {
        const files = [...imageFiles];
        files[index] = event.target.files[0];
        setImageFiles(files);
    };

    const onSubmit = async (data) => {
        setLoading(true); // Set loading to true when submission starts
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('category', data.category);
            formData.append('stock', data.stock);
            formData.append('brand', data.brand);
            formData.append('sku', data.sku);
            formData.append('isFeatured', data.isFeatured);
            formData.append('isOnSale', data.isOnSale);
            formData.append('tags', JSON.stringify(data.tags));

            // Append colors
            data.colors.forEach((color, index) => {
                formData.append(`colors[${index}].colorName`, color.colorName);
                formData.append(`colors[${index}].stock`, color.stock);
            });

            // Append images
            data.images.forEach((image, index) => {
                if (imageFiles[index]) {
                    formData.append(`images[${index}].url`, imageFiles[index]);
                }
            });

            if (featuredImageFile) {
                formData.append('featuredImage', featuredImageFile);
            }

            const response = await axios.post('/api/addProducts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Product added successfully:', response.data);
        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <h2 className="text-2xl font-bold mb-6">Step 1: General Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700">Product Name</label>
                                <input
                                    {...register('name', { required: 'Product name is required' })}
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter product name"
                                />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700">Price</label>
                                <input
                                    {...register('price', { required: 'Price is required', min: 0 })}
                                    type="number"
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter product price"
                                />
                                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    {...register('description', { required: 'Description is required' })}
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter product description"
                                />
                                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700">Category</label>
                                <input
                                    {...register('category', { required: 'Category is required' })}
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter product category"
                                />
                                {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700">Featured Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFeaturedImageChange}
                                    className="w-full p-3 border rounded-lg"
                                />
                                {errors.featuredImage && <p className="text-red-500">{errors.featuredImage.message}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700">Brand</label>
                                <input
                                    {...register('brand')}
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter brand (optional)"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700">SKU</label>
                                <input
                                    {...register('sku')}
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter SKU (optional)"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700">Tags</label>
                                <input
                                    {...register('tags.0')}
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter tags (optional)"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                                onClick={nextStep}
                            >
                                Next
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <h2 className="text-2xl font-bold mb-6">Step 2: Stock and Images</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700">Stock (for products without colors)</label>
                                <input
                                    {...register('stock')}
                                    type="number"
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter stock quantity"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700">Colors</label>
                            {colorFields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <input
                                            {...register(`colors.${index}.colorName`)}
                                            className="w-full p-3 border rounded-lg"
                                            placeholder="Color name"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            {...register(`colors.${index}.stock`)}
                                            type="number"
                                            className="w-full p-3 border rounded-lg"
                                            placeholder="Stock quantity"
                                        />
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                            onClick={() => removeColor(index)}
                                        >
                                            Remove Color
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => appendColor({ colorName: '', stock: 0 })}
                            >
                                Add Color
                            </button>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700">Images</label>
                            {imageFields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange(index)}
                                            className="w-full p-3 border rounded-lg"
                                        />
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                            onClick={() => removeImage(index)}
                                        >
                                            Remove Image
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => appendImage({ url: '' })}
                            >
                                Add Image
                            </button>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                                onClick={prevStep}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center"
                                disabled={loading} // Disable button while loading
                            >
                                {loading && (
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        />
                                    </svg>
                                )}
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </form>
        </div>
    );
};

export default AddProductForm;
