"use client"
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios'; // Ensure axios is imported

const AddProductForm = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [fetchingCategories, setFetchingCategories] = useState(true); // Added fetchingCategories state
    const [selectedCategory, setSelectedCategory] = useState(''); // Added selectedCategory state
    
    const { register, handleSubmit, control, setValue, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            brand: '',
            description: '',
            price: '',
            actualPrice: '',
            sku: '',
            stock: 0,
            isFeatured: false,
            isOnSale: false,
            tags: '',
            colors: [],
            images: [],
            featuredImage: '',
            category: ''
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

    useEffect(() => {
        const fetchCategories = async () => {
            setFetchingCategories(true); // Set fetching to true before fetch
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
                setFetchingCategories(false); // Set fetching to false after fetch
            }
        };
        fetchCategories();
    }, []);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setValue('category', categoryId);
    };

    const nextStep = () => {
        setStep(prev => prev + 1);

        // Remove images when moving to the next step
        if (step === 2) {
            resetFieldArray('images');
        }
    };

    const prevStep = () => setStep(prev => prev - 1);

    const resetFieldArray = (fieldName) => {
        setValue(fieldName, []);
    };

    const handleImageChange = (index) => (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue(`images[${index}].url`, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFeaturedImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('featuredImage', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);

        // Create a FormData object
        const formData = new FormData();

        // Append non-file fields
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (Array.isArray(data[key])) {
                    // Append array fields as JSON strings
                    formData.append(key, JSON.stringify(data[key]));
                } else {
                    formData.append(key, data[key]);
                }
            }
        }

        // Append images as files
        const imageFiles = data.images.map((image, index) => {
            return { file: image.url, index };
        });
        
        imageFiles.forEach(({ file, index }) => {
            formData.append(`images[${index}]`, file);
        });

        // Append the featured image as a file
        if (data.featuredImage) {
            formData.append('featuredImage', data.featuredImage);
        }

        try {
            const response = await fetch('/api/add-product', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success('Product added successfully!');
                reset(); // Clear the form on success
                setStep(1); // Reset to the first step
            } else {
                throw new Error('Failed to add product.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to add product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="max-h-screen overflow-y-auto">
                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <h2 className="text-2xl font-bold mb-6">Step 1: Product Details</h2>

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
                                <label className="block text-gray-700">SKU</label>
                                <input
                                    {...register('sku', { required: 'SKU is required' })}
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter SKU"
                                />
                                {errors.sku && <p className="text-red-500">{errors.sku.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700">Brand</label>
                                <input
                                    {...register('brand', { required: 'Brand is required' })}
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter brand"
                                />
                                {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    {...register('description', { required: 'Description is required' })}
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter product description"
                                />
                                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700">Actual Price</label>
                                <input
                                    {...register('actualPrice', { 
                                        required: 'Actual price is required', 
                                        validate: value => value < getValues('price') || 'Actual price must be less than final price'
                                    })}
                                    type="number"
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter actual price"
                                />
                                {errors.actualPrice && <p className="text-red-500">{errors.actualPrice.message}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700">Price (Final Price)</label>
                                <input
                                    {...register('price', { 
                                        required: 'Price is required', 
                                        min: { value: 1, message: 'Price must be greater than 0' }
                                    })}
                                    type="number"
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter final price"
                                />
                                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                            </div>
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
                        <h2 className="text-2xl font-bold mb-6">Step 2: Product Images</h2>

                        <div className="mb-6">
                            <label className="block text-gray-700">Featured Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFeaturedImageChange}
                                className="w-full p-3 border rounded-lg"
                            />
                        </div>

                        {imageFields.map((item, index) => (
                            <div key={item.id} className="mb-6">
                                <label className="block text-gray-700">Image {index + 1}</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange(index)}
                                    className="w-full p-3 border rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="mt-2 text-red-500"
                                >
                                    Remove Image
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => appendImage({ url: '' })}
                            className="p-3 bg-green-500 text-white rounded-lg"
                        >
                            Add Another Image
                        </button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <h2 className="text-2xl font-bold mb-6">Step 3: Additional Information</h2>

                        <div className="mb-6">
                            <label className="block text-gray-700">Tags (Comma Separated)</label>
                            <input
                                {...register('tags')}
                                className="w-full p-3 border rounded-lg"
                                placeholder="Enter tags"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700">Stock</label>
                            <input
                                {...register('stock', { min: 0 })}
                                type="number"
                                className="w-full p-3 border rounded-lg"
                                placeholder="Enter stock quantity"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700">Colors</label>
                            {colorFields.map((item, index) => (
                                <div key={item.id} className="mb-6">
                                    <input
                                        {...register(`colors[${index}].color`)}
                                        className="w-full p-3 border rounded-lg"
                                        placeholder="Enter color"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeColor(index)}
                                        className="mt-2 text-red-500"
                                    >
                                        Remove Color
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => appendColor({ color: '' })}
                                className="p-3 bg-green-500 text-white rounded-lg"
                            >
                                Add Another Color
                            </button>
                        </div>

                        <div className="mb-6">
                            <label className="inline-flex items-center">
                                <input
                                    {...register('isFeatured')}
                                    type="checkbox"
                                    className="form-checkbox"
                                />
                                <span className="ml-2 text-gray-700">Featured Product</span>
                            </label>
                        </div>

                        <div className="mb-6">
                            <label className="inline-flex items-center">
                                <input
                                    {...register('isOnSale')}
                                    type="checkbox"
                                    className="form-checkbox"
                                />
                                <span className="ml-2 text-gray-700">On Sale</span>
                            </label>
                        </div>
                    </motion.div>
                )}

                <div className="flex justify-between mt-6">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="p-3 bg-gray-500 text-white rounded-lg"
                        >
                            Previous
                        </button>
                    )}

                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="p-3 bg-blue-500 text-white rounded-lg"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className={`p-3 ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded-lg`}
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;
