"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    actualPrice: '',
    originalPrice: '',
    category: '',
    stock: 0,
    colors: [],
    brand: '',
    sku: '',
    isFeatured: false,
    isOnSale: false,
    tags: '',
  });
  const [images, setImages] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imageInputs, setImageInputs] = useState([0]);
  const [newColor, setNewColor] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setFetchingCategories(true);
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleFeaturedImageChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setFormData({
      ...formData,
      category: categoryId,
    });
  };

  const handleColorChange = (index, e) => {
    const newColors = [...formData.colors];
    newColors[index] = { ...newColors[index], [e.target.name]: e.target.value };
    setFormData({
      ...formData,
      colors: newColors,
    });
  };

  const addColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { color: newColor, stock: 0 }]
    });
    setNewColor('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
  
    // Append form data
    Object.keys(formData).forEach((key) => {
      if (key === 'colors') {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });
  
    // Append images
    images.forEach((file) => file && data.append('images', file));
    if (featuredImage) {
      data.append('featuredImage', featuredImage);
    }
  
    try {
      await axios.post('/api/admin/dashboard/product/addProduct', data);
      console.log('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMoreImages = () => {
    setImageInputs([...imageInputs, imageInputs.length]);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="max-w-full mx-auto p-4 bg-white shadow-lg rounded-lg w-full h-screen overflow-y-scroll">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Step 1: Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Product Name</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Description</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="actualPrice">Actual Price</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="number"
                    name="actualPrice"
                    id="actualPrice"
                    value={formData.actualPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="originalPrice">Original Price</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="number"
                    name="originalPrice"
                    id="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">Stock</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="number"
                    name="stock"
                    id="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-gray-700 font-bold mb-2">Category</label>
                  {fetchingCategories ? (
                    <p>Loading categories...</p>
                  ) : (
                    <div className="flex flex-wrap gap-4">
                      {categories.map((category) => (
                        <button
                          key={category._id}
                          type="button"
                          onClick={() => handleCategorySelect(category._id)}
                          className={`p-3 border rounded-lg ${
                            selectedCategory === category._id
                              ? 'bg-blue-500 text-white'
                              : 'bg-white text-gray-700'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
              >
                Next
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Step 2: Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Product Images</label>
                  {imageInputs.map((input, index) => (
                    <div key={index} className="mb-4">
                      <input
                        className="w-full p-2 border border-gray-300 rounded"
                        type="file"
                        onChange={(e) => handleFileChange(e, index)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addMoreImages}
                    className="w-full p-2 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-500 hover:text-white"
                  >
                    Add More Images
                  </button>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Featured Image</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="file"
                    onChange={handleFeaturedImageChange}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={prevStep}
                className="w-full p-2 bg-gray-500 text-white font-bold rounded hover:bg-gray-700 mb-4"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
              >
                Next
              </button>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Step 3: Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="brand">Brand</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    name="brand"
                    id="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="sku">SKU</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    name="sku"
                    id="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="tags">Tags (comma separated)</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="text"
                    name="tags"
                    id="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Colors</label>
                  <div className="mb-4">
                    <input
                      className="w-full p-2 border border-gray-300 rounded"
                      type="text"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      placeholder="Add a new color"
                    />
                    <button
                      type="button"
                      onClick={addColor}
                      className="w-full p-2 bg-green-500 text-white font-bold rounded hover:bg-green-700 mt-2"
                    >
                      Add Color
                    </button>
                  </div>

                  {formData.colors.map((color, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        name="color"
                        value={color.color}
                        onChange={(e) => handleColorChange(index, e)}
                        className="w-1/2 p-2 border border-gray-300 rounded"
                        placeholder="Color"
                      />
                      <input
                        type="number"
                        name="stock"
                        value={color.stock}
                        onChange={(e) => handleColorChange(index, e)}
                        className="w-1/2 p-2 border border-gray-300 rounded ml-2"
                        placeholder="Stock"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    id="isFeatured"
                  />
                  <label htmlFor="isFeatured" className="ml-2 text-gray-700">Featured</label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="isOnSale"
                    checked={formData.isOnSale}
                    onChange={handleInputChange}
                    id="isOnSale"
                  />
                  <label htmlFor="isOnSale" className="ml-2 text-gray-700">On Sale</label>
                </div>
              </div>

              <button
                type="button"
                onClick={prevStep}
                className="w-full p-2 bg-gray-500 text-white font-bold rounded hover:bg-gray-700 mb-4"
              >
                Previous
              </button>

              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </>
          )}
        </motion.div>
      </form>
    </div>
  );
};

export default ProductForm;
