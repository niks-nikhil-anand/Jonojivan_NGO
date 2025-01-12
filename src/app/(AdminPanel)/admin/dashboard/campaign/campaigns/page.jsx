"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/loader/loader";

const CampaignTable = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 5;
  const router = useRouter();

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

  const handleView = async (id) => {
    try {
      const response = await axios.get(`/api/admin/dashboard/blog/${id}`);
      alert(`Blog Title: ${response.data.title}`);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this campaign?");
      if (!confirmed) return;

      await axios.delete(`/api/admin/dashboard/blog/${id}`);
      setCampaigns(campaigns.filter((campaign) => campaign._id !== id));
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  if (loading) {
    return 
    <div>
      <Loader/>
    </div>
    ;
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
            {currentCampaigns.map((campaign) => (
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
                <td className="border border-gray-300 px-2 py-1 truncate">{campaign.status}</td>
                <td className="border border-gray-300 px-2 py-1 truncate">
                {new Date(campaign.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleView(campaign._id)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(campaign._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
    </div>
  );
};

export default CampaignTable;
