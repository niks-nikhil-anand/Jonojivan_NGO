"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';


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
             <motion.h3
               className="text-xl font-semibold mb-4 text-blue-600"
               initial={{ opacity: 0, x: -100 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5 }}
             >
               Step 1: Basic Information
             </motion.h3>
         
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
               {/* Product Name */}
               <div>
                 <label className="block text-purple-600 font-bold mb-3" htmlFor="name">
                   Product Name
                 </label>
                 <motion.input
                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                   type="text"
                   name="name"
                   id="name"
                   value={formData.name}
                   onChange={handleInputChange}
                   required
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.4 }}
                 />
               </div>
         
               {/* Description */}
               <div>
                 <label className="block text-pink-600 font-bold mb-3" htmlFor="description">
                   Description
                 </label>
                 <motion.textarea
                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                   name="description"
                   id="description"
                   value={formData.description}
                   onChange={handleInputChange}
                   required
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.4 }}
                 />
               </div>
         
               {/* Sale Price */}
               <div>
                 <label className="block text-teal-600 font-bold mb-3" htmlFor="salePrice">
                   Sale Price
                 </label>
                 <motion.input
                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                   type="number"
                   name="salePrice"
                   id="salePrice"
                   value={formData.salePrice}
                   onChange={handleInputChange}
                   required
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.4 }}
                 />
               </div>
         
               {/* Original Price */}
               <div>
                 <label className="block text-orange-600 font-bold mb-3" htmlFor="originalPrice">
                   Original Price
                 </label>
                 <motion.input
                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                   type="number"
                   name="originalPrice"
                   id="originalPrice"
                   value={formData.originalPrice}
                   onChange={handleInputChange}
                   required
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.4 }}
                 />
               </div>
         
               {/* Stock */}
               <div>
                 <label className="block text-green-600 font-bold mb-3" htmlFor="stock">
                   Stock
                 </label>
                 <motion.input
                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                   type="number"
                   name="stock"
                   id="stock"
                   value={formData.stock}
                   onChange={handleInputChange}
                   required
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.4 }}
                 />
               </div>
         
               
             </div>
         
             <div className="flex justify-end">
               <motion.button
                 type="button"
                 onClick={nextStep}
                 className="w-40 p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 Next
               </motion.button>
             </div>
           </>
          )}
          {currentStep === 2 && (
           <>
           <motion.h3
             className="text-xl font-semibold mb-4 text-blue-600"
             initial={{ opacity: 0, x: -100 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5 }}
           >
             Step 2: Select Categories
           </motion.h3>
       
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Category Selection */}
            <div className="col-span-2">
                 <label className="block text-blue-600 font-bold mb-3">Category</label>
                 {fetchingCategories ? (
                   <p>Loading categories...</p>
                 ) : (
                   <div className="flex flex-wrap gap-4">
                     {categories.map((category) => (
                       <motion.button
                         key={category._id}
                         type="button"
                         onClick={() => handleCategorySelect(category._id)}
                         className={`p-3 border rounded-lg ${
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
       
           {/* Flexbox for buttons with Previous on the left and Next on the right */}
           <div className="flex justify-between">
             <motion.button
               type="button"
               onClick={prevStep}
               className="w-40 p-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               Previous
             </motion.button>
       
             <motion.button
               type="button"
               onClick={nextStep}
               className="w-40 p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               Next
             </motion.button>
           </div>
         </>
        
         
          )}

          {currentStep === 3 && (
           <>
           <motion.h3
             className="text-xl font-semibold mb-4 text-blue-600"
             initial={{ opacity: 0, x: -100 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5 }}
           >
             Step 3: Upload Relevant Images
           </motion.h3>
       
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <div className="mb-6">
               <label className="block text-purple-600 font-bold mb-3">Product Images</label>
               {imageInputs.map((input, index) => (
                 <motion.div
                   key={index}
                   className="mb-4 flex items-center justify-between"
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.4 }}
                 >
                   <input
                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                     type="file"
                     onChange={(e) => handleFileChange(e, index)}
                   />
                   <motion.button
                     type="button"
                     onClick={() => removeImage(index)}
                     className="ml-3 text-red-500 text-xl"
                     whileHover={{ scale: 1.2, color: '#ff4d4d' }}
                     whileTap={{ scale: 0.9 }}
                   >
                     <AiOutlineMinusCircle />
                   </motion.button>
                 </motion.div>
               ))}
               <motion.button
                 type="button"
                 onClick={addMoreImages}
                 className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mt-4 flex items-center justify-center"
                 whileHover={{ scale: 1.05, backgroundColor: '#28a745' }}
                 whileTap={{ scale: 0.95 }}
               >
                 <AiOutlinePlusCircle className="mr-2 text-xl" /> Add More Images
               </motion.button>
             </div>
       
             <div>
               <label className="block text-pink-600 font-bold mb-3">Featured Image</label>
               <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5 }}
               >
                 <input
                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                   type="file"
                   onChange={handleFeaturedImageChange}
                 />
               </motion.div>
             </div>
       
             <div>
               <label className="block text-teal-600 font-bold mb-3">Description Image</label>
               <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5 }}
               >
                 <input
                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                   type="file"
                   onChange={handleDescriptionImageChange}
                 />
               </motion.div>
             </div>
           </div>
       
           {/* Flexbox for buttons with Previous on the left and Next on the right */}
           <div className="flex justify-between">
             <motion.button
               type="button"
               onClick={prevStep}
               className="w-40 p-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               Previous
             </motion.button>
       
             <motion.button
               type="button"
               onClick={nextStep}
               className="w-40 p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               Next
             </motion.button>
           </div>
         </>
        
         
          )}
          {currentStep === 4 && (
            <>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Step 4: Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <label className="block text-gray-700 font-bold mb-2" htmlFor="brand">Suggested Use</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="suggestedUse"
                  id="suggestedUse"
                  value={formData.suggestedUse}
                  onChange={handleInputChange}
                />
              </motion.div>
          
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <label className="block text-gray-700 font-bold mb-2" htmlFor="sku">Serving/Bottle</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="number"
                  name="servingPerBottle"
                  id="servingPerBottle"
                  value={formData.servingPerBottle}
                  onChange={handleInputChange}
                />
              </motion.div>
          
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <label className="block text-gray-700 font-bold mb-2" htmlFor="tags">Tags (comma separated)</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="tags"
                  id="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                />
              </motion.div>
          
              <motion.div className="flex items-center mb-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <input
                  type="checkbox"
                  name="isFanFavourites"
                  checked={formData.isFanFavourites}
                  onChange={handleInputChange}
                  id="isFanFavourites"
                />
                <label htmlFor="isFanFavourites" className="ml-2 text-gray-700">Fan Favourites</label>
              </motion.div>
          
              <motion.div className="flex items-center mb-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <input
                  type="checkbox"
                  name="isOnSale"
                  checked={formData.isOnSale}
                  onChange={handleInputChange}
                  id="isOnSale"
                />
                <label htmlFor="isOnSale" className="ml-2 text-gray-700">On Sale</label>
              </motion.div>
            </div>
          
            <div className="flex justify-between">
              <motion.button
                type="button"
                onClick={prevStep}
                className="w-40 p-3 bg-gray-500 text-white font-bold rounded hover:bg-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Previous
              </motion.button>
          
              <motion.button
                type="button"
                onClick={nextStep}
                className="w-40 p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            </div>
          </>
          )}

          {currentStep === 5 && ( 
            <>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Step 5:- Ingredients + Highlights</h3>
              <motion.h2
                className="text-3xl font-bold mb-6 text-purple-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Ingredients
              </motion.h2>
              {ingredients.map((ingredient, index) => (
                <motion.div
                  key={index}
                  className="mb-6 flex items-center gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <input
                    type="text"
                    placeholder="Name"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Weight (in grams)"
                    value={ingredient.weightInGram}
                    onChange={(e) => handleIngredientChange(index, 'weightInGram', e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="file"
                    onChange={(e) => handleIngredientImageChange(index, e.target.files[0])}
                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <motion.button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="bg-red-500 text-white py-2 px-3 rounded-full shadow-lg hover:bg-red-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaMinus />
                  </motion.button>
                </motion.div>
              ))}
              <motion.button
                type="button"
                onClick={handleAddIngredient}
                className="bg-green-500 text-white py-2 px-4 rounded-full flex items-center gap-2 mt-4 shadow-lg hover:bg-green-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus />
                Add Ingredient
              </motion.button>
            
              <motion.h2
                className="text-3xl font-bold mb-6 text-purple-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Product Highlights
              </motion.h2>
              {productHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="mb-6 flex items-center gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <input
                    type="text"
                    placeholder="Title"
                    value={highlight.title}
                    onChange={(e) => handleProductHighlightChange(index, 'title', e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={highlight.description}
                    onChange={(e) => handleProductHighlightChange(index, 'description', e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="file"
                    onChange={(e) => handleHighlightIconChange(index, e.target.files[0])}
                    className="flex-1 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <motion.button
                    type="button"
                    onClick={() => handleRemoveProductHighlight(index)}
                    className="bg-red-500 text-white py-2 px-3 rounded-full shadow-lg hover:bg-red-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaMinus />
                  </motion.button>
                </motion.div>
              ))}
              <motion.button
                type="button"
                onClick={handleAddProductHighlight}
                className="bg-green-500 text-white py-2 px-4 rounded-full flex items-center gap-2 mt-4 shadow-lg hover:bg-green-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus />
                Add Highlight
              </motion.button>
            <div className='flex justify-between'>
            <button
                type="button"
                onClick={prevStep}
                className="w-40 p-3  bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-800 mt-6 shadow-md"
              >
                Previous
              </button>
            
              <button
                type="submit"
                className="w-40 p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-800 mt-6 shadow-md"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
              
            </>
            
          )}
        </motion.div>
      </form>
    </div>
  );
};

export default ProductForm;
