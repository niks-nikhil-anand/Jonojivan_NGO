"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdDownload, MdDelete } from 'react-icons/md'; // Import necessary icons


const News = () => {
  const [donations, setDonations] = useState([]); // Rename to donations
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("/api/donationSuccess"); // Adjust the API URL as per your API endpoint
        console.log(response)
        setDonations(Array.isArray(response.data.donations) ? response.data.donations : []); // Ensure donations is an array
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(indexOfFirstDonation, indexOfLastDonation);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleView = async (id) => {
    try {
      const response = await axios.get(`/api/admin/dashboard/donation/${id}`);
      alert(`Donation Details: ${response.data.fullName}`);
    } catch (error) {
      console.error("Error fetching donation details:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this donation?");
      if (!confirmed) return;

      await axios.delete(`/api/admin/dashboard/donation/${id}`);
      setDonations(donations.filter((donation) => donation._id !== id));
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const truncateWords = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-lg h-[80vh] min-w-[100%] mx-auto">
    <div className="overflow-x-auto overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <table className="border-collapse border border-gray-300 min-w-[70vh] text-sm">
        <thead>
          <tr className="bg-gray-400">
            <th className="border border-gray-300 px-2 py-1 text-left">Full Name</th>
            <th className="border border-gray-300 px-2 py-1 text-left">Email</th>
            <th className="border border-gray-300 px-2 py-1 text-left">Amount</th>
            <th className="border border-gray-300 px-2 py-1 text-left">Payment Method</th>
            <th className="border border-gray-300 px-2 py-1 text-left">Created At</th>
            <th className="border border-gray-300 px-2 py-1 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentDonations.map((donation) => (
            <tr key={donation._id} className="hover:bg-gray-200 cursor-pointer">
              <td className="border border-gray-300 px-2 py-1 truncate">{donation.fullName}</td>
              <td className="border border-gray-300 px-2 py-1 truncate">{donation.email}</td>
              <td className="border border-gray-300 px-2 py-1 font-semibold">₹{donation.amount}/-</td>
              <td className="border border-gray-300 px-2 py-1 truncate">{donation.paymentMethod}</td>
              <td className="border border-gray-300 px-2 py-1 truncate">
                {new Date(donation.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
            <div className="flex justify-center space-x-2">
              {/* View Button */}
              <button
                onClick={() => handleView(donation._id)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
              >
                <MdDownload className="text-white" size={16} /> {/* Download icon */}
              </button>
              
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(donation._id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                <MdDelete className="text-white" size={16} /> {/* Delete icon */}
              </button>
            </div>
          </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-4 flex justify-center space-x-2">
      {[...Array(Math.ceil(donations.length / donationsPerPage)).keys()].map((number) => (
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

export default News;
