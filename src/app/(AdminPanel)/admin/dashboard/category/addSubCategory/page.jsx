"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

const Page = () => {
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleAddSubCategory = () => {
    setSubCategories([...subCategories, { name: '', image: null }]);
  };

  const handleSubCategoryChange = (index, field, value) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index][field] = value;
    setSubCategories(updatedSubCategories);
  };

  const handleRemoveSubCategory = (index) => {
    setSubCategories(subCategories.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading('Adding category...');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/admin/dashboard/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Category added successfully!', {
        id: loadingToast,
      });

      setName('');
      setImage(null);
      setSubCategories([]);
    } catch (error) {
      toast.error('Failed to add category.', {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="bg-white p-4 w-full mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-black">Sub-Categories</h2>
      <hr className="my-4 border-black w-full" />
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4 flex-col">
          <div className="flex">
            {/* Category Selection */}
            <div className="flex flex-col">
              <label className="flex w-full text-blue-600 font-bold mb-3">Category</label>
              {fetchingCategories ? (
                <p>Loading categories...</p>
              ) : (
                <div className="h-32 w-full border border-gray-300 overflow-y-scroll p-2 rounded-lg">
                  {categories.map((category) => (
                    <motion.button
                      key={category._id}
                      type="button"
                      onClick={() => handleCategorySelect(category._id)}
                      className={`p-2 border rounded-lg mb-2 mx-2 ${
                        selectedCategory === category._id
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SubCategory Fields with Scrollable Container */}
          <div className="max-h-48 overflow-y-auto space-y-4">
            {subCategories.map((subCategory, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor={`subCategoryName${index}`}>
                    SubCategory Name
                  </label>
                  <input
                    type="text"
                    id={`subCategoryName${index}`}
                    value={subCategory.name}
                    onChange={(e) => handleSubCategoryChange(index, 'name', e.target.value)}
                    className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter SubCategory Name"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor={`subCategoryImage${index}`}>
                    SubCategory Image
                  </label>
                  <input
                    type="file"
                    id={`subCategoryImage${index}`}
                    onChange={(e) => handleSubCategoryChange(index, 'image', e.target.files[0])}
                    className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Remove SubCategory Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveSubCategory(index)}
                  className="text-red-500 hover:text-red-700 transition duration-200 mt-2"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Button for Adding SubCategory */}
          <div className="flex justify-start mt-4">
            <button
              type="button"
              onClick={handleAddSubCategory}
              className="bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add SubCategory
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
