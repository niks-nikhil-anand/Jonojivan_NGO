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
    salePrice: '',
    originalPrice: '',
    category: '',
    stock: 0,
    suggestedUse: '',
    servingPerBottle: '',
    isFanFavourites: false,
    isOnSale: false,
    tags: '',
  });
  const [images, setImages] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [descriptionImage, setDescriptionImage] = useState(null);
  const [imageInputs, setImageInputs] = useState([0]);
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([{ name: "", weightInGram: "", image: null }]);
  const [productHighlights, setProductHighlights] = useState([{ title: "", description: "", icon: null }]);


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
  const handleDescriptionImageChange = (e) => {
    setDescriptionImage(e.target.files[0]);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setFormData({
      ...formData,
      category: categoryId,
    });
  };

 // Handler for changing ingredient values
 const handleIngredientChange = (index, field, value) => {
  const updatedIngredients = ingredients.map((ingredient, i) =>
    i === index ? { ...ingredient, [field]: value } : ingredient
  );
  setIngredients(updatedIngredients);
};

// Handler for adding more ingredients
const handleAddIngredient = () => {
  setIngredients([...ingredients, { name: "", weightInGram: "", image: null }]);
};

// Handler for removing ingredients
const handleRemoveIngredient = (index) => {
  const updatedIngredients = ingredients.filter((_, i) => i !== index);
  setIngredients(updatedIngredients);
};

// Handler for file input for ingredient image
const handleIngredientImageChange = (index, file) => {
  const updatedIngredients = ingredients.map((ingredient, i) =>
    i === index ? { ...ingredient, image: file } : ingredient
  );
  setIngredients(updatedIngredients);
};

// Handler for changing product highlight values
const handleProductHighlightChange = (index, field, value) => {
  const updatedHighlights = productHighlights.map((highlight, i) =>
    i === index ? { ...highlight, [field]: value } : highlight
  );
  setProductHighlights(updatedHighlights);
};

// Handler for file input for product highlight icon
const handleHighlightIconChange = (index, file) => {
  const updatedHighlights = productHighlights.map((highlight, i) =>
    i === index ? { ...highlight, icon: file } : highlight
  );
  setProductHighlights(updatedHighlights);
};

// Handler for adding more product highlights
const handleAddProductHighlight = () => {
  setProductHighlights([...productHighlights, { title: "", description: "", icon: null }]);
};

// Handler for removing product highlights
const handleRemoveProductHighlight = (index) => {
  const updatedHighlights = productHighlights.filter((_, i) => i !== index);
  setProductHighlights(updatedHighlights);
};

  

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  const data = new FormData();

  // Log formData for debugging
  console.log('Form Data:', formData);

  // Append basic product details from formData
  data.append('name', formData.name);
  data.append('description', formData.description);
  data.append('salePrice', formData.salePrice);
  data.append('originalPrice', formData.originalPrice);
  data.append('category', formData.category);
  data.append('stock', formData.stock);
  data.append('suggestedUse', formData.suggestedUse);
  data.append('servingPerBottle', formData.servingPerBottle);
  data.append('isFanFavourites', formData.isFanFavourites);
  data.append('isOnSale', formData.isOnSale);
  data.append('tags', formData.tags);

  // Log images for debugging
  console.log('Images:', images);

  // Append images
  images.forEach((file) => {
    if (file) {
      data.append('images', file);
    }
  });

  if (featuredImage) {
    data.append('featuredImage', featuredImage);
  }
  if (descriptionImage) {
    data.append('descriptionImage', descriptionImage);
  }

  // Log ingredients for debugging
  console.log('Ingredients:', ingredients);

  // Append ingredients
  ingredients.forEach((ingredient, index) => {
    data.append(`ingredients[${index}][name]`, ingredient.name);
    data.append(`ingredients[${index}][weightInGram]`, ingredient.weightInGram);
    if (ingredient.image) {
      data.append(`ingredients[${index}][image]`, ingredient.image);
    }
  });

  // Log product highlights for debugging
  console.log('Product Highlights:', productHighlights);

  // Append product highlights
  productHighlights.forEach((highlight, index) => {
    data.append(`productHighlights[${index}][title]`, highlight.title);
    data.append(`productHighlights[${index}][description]`, highlight.description);
    if (highlight.icon) {
      data.append(`productHighlights[${index}][icon]`, highlight.icon);
    }
  });

  try {
    console.log('Sending data to API:', Array.from(data.entries())); // Log FormData entries
    await axios.post('/api/admin/dashboard/product/addProduct', data);
    console.log('Product created successfully:', data);
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
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="actualPrice">Sale Price</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="number"
                    name="salePrice"
                    id="salePrice"
                    value={formData.salePrice}
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
              <h3 className="text-xl font-semibold mb-4">Step 2: Upload Relevant Images  </h3>
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
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Description Image</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded"
                    type="file"
                    onChange={handleDescriptionImageChange}
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
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="brand">Suggested Use</label>
                  <textarea
                 className="w-full p-2 border border-gray-300 rounded"                    
                 type="text"
                  name="suggestedUse"
                    id="suggestedUse"
                    value={formData.suggestedUse}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="sku">Serving/Bottle</label>
                  <input
                   className="w-full p-2 border border-gray-300 rounded"  
                    type="number"
                    name="servingPerBottle"
                    id="servingPerBottle"
                    value={formData.servingPerBottle}
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
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="isFanFavourites"
                    checked={formData.isFanFavourites}
                    onChange={handleInputChange}
                    id="isFanFavourites"
                  />
                  <label htmlFor="isFeatured" className="ml-2 text-gray-700">Fan Favourites</label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="isFanFavourites"
                    checked={formData.isFanFavourites}
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
                type="button"
                onClick={nextStep}
                className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
              >
                Next
              </button>
            </>
          )}

          {currentStep === 4 && (
            <>
               <motion.h2
        className="text-2xl font-semibold mb-4 text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Ingredients
      </motion.h2>
      {ingredients.map((ingredient, index) => (
        <motion.div
          key={index}
          className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <input
            type="text"
            placeholder="Name"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Weight (in grams)"
            value={ingredient.weightInGram}
            onChange={(e) => handleIngredientChange(index, "weightInGram", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            onChange={(e) => handleIngredientImageChange(index, e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            type="button"
            onClick={() => handleRemoveIngredient(index)}
            className="bg-red-500 text-white py-3 px-3 rounded-lg mt-2 hover:bg-red-600 text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Remove Ingredient
          </motion.button>
        </motion.div>
      ))}
      <motion.button
        type="button"
        onClick={handleAddIngredient}
        className="bg-gray-500 text-white py-3 px-3 rounded-lg mt-2 hover:bg-gray-600 text-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Ingredient
      </motion.button>

      <motion.h2
        className="text-2xl font-semibold mb-4 text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Product Highlights
      </motion.h2>
      {productHighlights.map((highlight, index) => (
        <motion.div
          key={index}
          className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <input
            type="text"
            placeholder="Title"
            value={highlight.title}
            onChange={(e) => handleProductHighlightChange(index, "title", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={highlight.description}
            onChange={(e) => handleProductHighlightChange(index, "description", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            onChange={(e) => handleHighlightIconChange(index, e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         
          <motion.button
            type="button"
            onClick={() => handleRemoveProductHighlight(index)}
            className=" bg-red-500 text-white py-3 px-3 rounded-lg mt-2 hover:bg-red-600 text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Remove Highlight
          </motion.button>
        </motion.div>
      ))}
      <motion.button
        type="button"
        onClick={handleAddProductHighlight}
        className="bg-gray-500 text-white py-3 px-3 rounded-lg mt-2 hover:bg-gray-600 text-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Highlight
      </motion.button>

              <button
                type="button"
                onClick={prevStep}
                className="w-full p-2 bg-gray-500 text-white font-bold rounded hover:bg-gray-700 my-4"
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
