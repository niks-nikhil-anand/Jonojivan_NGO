"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/loader/loader";
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md'; // Import necessary icons
import { motion } from 'framer-motion';

const CampaignTable = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 5;
  const router = useRouter();
  
  // Modal state and deleteId tracking
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("/api/admin/dashboard/campaign/addCampaign");
        setCampaigns(response.data.reverse());
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      // Show a loading toast
      const toastId = toast.loading("Deleting campaign...");
  
      // Send a delete request to the backend to remove the campaign
      await axios.delete(`/api/admin/dashboard/campaign/${deleteId}`);
  
      // Update the state by filtering out the deleted campaign
      setCampaigns(campaigns.filter((campaign) => campaign._id !== deleteId));
      setShowModal(false); // Close the modal
      setDeleteId(null); // Reset the delete ID
  
      // Show success toast
      toast.success("Campaign deleted successfully!", { id: toastId });
    } catch (error) {
      console.error("Error deleting campaign:", error);
  
      // Show error toast
      toast.error("Failed to delete the campaign. Please try again.");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Pending' : 'Active';

      // Show a loading toast
      const toastId = toast.loading("Updating campaign status...");

      // Send the updated status to the backend
      await axios.put(`/api/admin/dashboard/campaign/updateStatus/${id}`, { status: newStatus });

      // Update the status locally
      setCampaigns(campaigns.map((campaign) =>
        campaign._id === id ? { ...campaign, status: newStatus } : campaign
      ));

      // Show success toast
      toast.success(`Campaign status updated to ${newStatus}!`, { id: toastId });
    } catch (error) {
      console.error("Error updating campaign status:", error);

      // Show error toast
      toast.error("Failed to update campaign status. Please try again.");
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const truncateWords = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="w-full p-4 pr-[5rem] bg-gray-100 shadow-lg rounded-lg h-[80vh]">
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh] custom-scrollbar">
        <table className="border-collapse border border-gray-300 min-w-[1200px] text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-gray-400 to-teal-500">
              <th className="border border-gray-300 px-2 py-1 text-left">Featured Image</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Title</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Description</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Goal</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Raised</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Status</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Created At</th>
              <th className="border border-gray-300 px-2 py-1 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCampaigns.map((campaign) => {
              const isActive = campaign.status === 'Active'; // Define isActive
              return (
                <tr key={campaign._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-2 py-1 text-center flex justify-center">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-12 h-12 object-cover rounded-2xl"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1 truncate">{campaign.title}</td>
                  <td className="border border-gray-300 px-2 py-1 truncate">{truncateWords(campaign.description, 10)}</td>
                  <td className="border border-gray-300 px-2 py-1 font-semibold">₹{campaign.goal}/-</td>
                  <td className="border border-gray-300 px-2 py-1 font-semibold">₹{campaign.raised}/-</td>
                  <td className="border border-gray-300 px-2 py-1 truncate">
                          <div className="relative inline-block w-11 h-6">
                            <input
                              type="checkbox"
                              id={`switch-${campaign._id}`}
                              checked={isActive}
                              onChange={() => toggleStatus(campaign._id, campaign.status)}
                              className="peer appearance-none w-11 h-6 bg-gray-300 rounded-full cursor-pointer transition-colors duration-300"
                            />
                            <label
                              htmlFor={`switch-${campaign._id}`}
                              className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-gray-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-5 peer-checked:border-green-500"
                            ></label>
                          </div>
                        </td>
                  <td className="border border-gray-300 px-2 py-1 truncate">
                    {new Date(campaign.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => confirmDelete(campaign._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                      >
                        <MdDelete className="text-white" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(Math.ceil(campaigns.length / campaignsPerPage)).keys()].map((number) => (
          <button
            key={number}
            className={`px-2 py-1 rounded-md text-xs ${
              currentPage === number + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => paginate(number + 1)}
          >
            {number + 1}
          </button>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[300px]">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-sm mb-4">Are you sure you want to delete this campaign?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignTable;
