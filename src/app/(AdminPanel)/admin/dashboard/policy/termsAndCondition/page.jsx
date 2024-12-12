"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { toast } from 'react-toastify';

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


const AddTermsConditions = () => {
  const [editorContent, setEditorContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (value) => {
    setEditorContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('content', editorContent);

      const response = await axios.post('/api/admin/dashboard/policy/termsAndCondition', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Terms & Conditions updated successfully!');
        setEditorContent(''); // Clear the editor on successful submission
      } else {
        toast.error(`Failed to update Terms & Conditions: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 w-full">
      {/* Form Section */}
      <motion.div
        className="w-full bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Add Terms & Conditions</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="terms-conditions" className="block text-sm font-medium text-gray-700">Terms & Conditions Content</label>
            <ReactQuill
              id="terms-conditions"
              value={editorContent}
              onChange={handleChange}
              className="mt-1 h-80"
              theme="snow"
            />
          </div>
          <div className='mt-[5rem]'>
            <button
              type="submit"
              className={`w-full ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500'} text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Save Terms & Conditions'}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Live View Section */}
      <div className="w-full bg-gray-100 p-6 rounded-lg shadow-md h-85 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Terms & Conditions Live View</h2>
        <div
          className="prose"
          style={{ maxHeight: 'calc(100vh - 12rem)' }} // Adjust based on your layout needs
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
      </div>
    </div>
  );
};

export default AddTermsConditions;
