"use client";
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import axios from 'axios';

const AddProductForm = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [fetchingCategories, setFetchingCategories] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { register, handleSubmit, control, watch, formState: { errors }, setValue, getValues } = useForm({
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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/admin/dashboard/category');
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setFetchingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setValue('category', categoryId);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('category', selectedCategory);
            formData.append('stock', data.colors.length === 0 ? data.stock : 0); // Stock when no colors
            formData.append('brand', data.brand);
            formData.append('sku', data.sku);
            formData.append('isFeatured', data.isFeatured);
            formData.append('isOnSale', data.isOnSale);
            formData.append('tags', JSON.stringify(data.tags));

            data.colors.forEach((color, index) => {
                formData.append(`colors[${index}].colorName`, color.colorName);
                formData.append(`colors[${index}].stock`, color.stock);
            });

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
            setLoading(false);
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
                                {fetchingCategories ? (
                                    <p>Loading categories...</p>
                                ) : (
                                    <div className="flex flex-wrap gap-4">
                                        {categories.map((category) => (
                                            <button
                                                key={category._id}
                                                type="button"
                                                onClick={() => handleCategorySelect(category._id)}
                                                className={`p-3 border rounded-lg ${selectedCategory === category._id ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                                            >
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
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
                        <h2 className="text-2xl font-bold mb-6">Step 2: Additional Information</h2>

                        <div className="mb-6">
                            <label className="block text-gray-700">Stocks Available</label>
                            <input
                                {...register('stocksAvailable', { valueAsNumber: true, min: 0 })}
                                type="number"
                                className="w-full p-3 border rounded-lg"
                                placeholder="Enter stocks available"
                            />
                            {errors.stocksAvailable && <p className="text-red-500">{errors.stocksAvailable.message}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700">Colors</label>
                            {colorFields.map((item, index) => (
                                <div key={item.id} className="flex gap-4 mb-4">
                                    <input
                                        {...register(`colors.${index}.colorName`, { required: 'Color name is required' })}
                                        className="w-full p-3 border rounded-lg"
                                        placeholder="Color name"
                                    />
                                    <input
                                        {...register(`colors.${index}.stock`, { required: 'Stock is required', min: 0 })}
                                        type="number"
                                        className="w-full p-3 border rounded-lg"
                                        placeholder="Stock"
                                    />
                                    <button type="button" onClick={() => removeColor(index)} className="text-red-500">Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => appendColor({ colorName: '', stock: 0 })} className="bg-blue-500 text-white py-2 px-4 rounded-lg">Add Color</button>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700">Images</label>
                            {imageFields.map((item, index) => (
                                <div key={item.id} className="flex gap-4 mb-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange(index)}
                                        className="w-full p-3 border rounded-lg"
                                    />
                                    <button type="button" onClick={() => removeImage(index)} className="text-red-500">Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => appendImage({ url: '' })} className="bg-blue-500 text-white py-2 px-4 rounded-lg">Add Image</button>
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
                                type="button"
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                                onClick={nextStep}
                            >
                                Next
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <h2 className="text-2xl font-bold mb-6">Step 3: Review & Submit</h2>

                        <div className="mb-6">
                            <label className="block text-gray-700">Review your details</label>
                            <pre>{JSON.stringify(getValues(), null, 2)}</pre>
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
                                className={`bg-blue-500 text-white py-2 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
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
