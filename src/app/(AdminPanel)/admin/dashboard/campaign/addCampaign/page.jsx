"use client";
import React, { useState } from "react";
import { toast } from 'react-hot-toast';

const AddCampaignPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    image: null, // To store the uploaded image
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("subTitle", formData.subTitle);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("goal", formData.goal);
    if (formData.image) {
      formDataToSubmit.append("image", formData.image);
    }
  
    try {
      const response = await fetch("/api/admin/dashboard/campaign/addCampaign", {
        method: "POST",
        body: formDataToSubmit,
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.success("Campaign added successfully!");
        setFormData({
          title: "",
          description: "",
          goal: "",
          image: null,
        });
      } else {
        toast.error(data.message || "Failed to add campaign.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex ">
      <form
        className="w-full bg-white px-10 py-4 max-h-[80vh] overflow-y-auto shadow-lg rounded-lg custom-scrollbar"
        onSubmit={handleSubmit}
      >
          <h2 className="text-xl font-semibold mb-6 text-teal-600 dark:text-teal-300 underline decoration-teal-400 hover:decoration-teal-500 transition-all duration-300">
          Add Campaign
        </h2>
        
        <div className=" mb-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-800">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 shadow-md focus:border-indigo-600 focus:ring-indigo-500 p-3"
            />
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block text-sm font-medium text-gray-800">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-md focus:border-indigo-600 focus:ring-indigo-500 p-3"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
          <div className="relative">
            <label htmlFor="goal" className="block text-sm font-medium text-gray-800">
              Goal Amount
            </label>
            <div className="mt-2 flex items-center border border-gray-300 rounded-lg shadow-md">
              <span className="absolute left-3 text-gray-600">₹</span>
              <input
                type="number"
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                required
                min="0"
                className="pl-8 w-full rounded-lg border-gray-300 shadow-md focus:border-indigo-600 focus:ring-indigo-500 p-3"
              />
            </div>
          </div>
        </div>


        {/* Image Upload Field */}
        <div className="mb-5">
          <label htmlFor="image" className="block text-sm font-medium text-gray-800">
            Campaign Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-md focus:border-indigo-600 focus:ring-indigo-500 p-3"
          />
          {formData.image && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Preview:</p>
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Campaign preview"
                className="mt-2 max-w-xs rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-5 text-white font-semibold rounded-lg shadow-md transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Submitting..." : "Add Campaign"}
        </button>
      </form>
    </div>
  );
};

export default AddCampaignPage;
