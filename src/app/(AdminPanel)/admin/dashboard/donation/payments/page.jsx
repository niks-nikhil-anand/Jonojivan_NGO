"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/loader/loader";

const News = () => {
  const [donations, setDonations] = useState([]); // Rename to donations
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 15;
  const router = useRouter();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("/api/payments"); 
        console.log(response)
        setDonations(Array.isArray(response.data.payments) ? response.data.payments.reverse() : []); 
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
      const response = await axios.get(`/api/payments/dashboard/donation/${id}`);
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
    return <div>
      <Loader/>
    </div>;
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
          <th className="border border-gray-300 px-2 py-1 text-left">Razorpay Order ID</th>
          <th className="border border-gray-300 px-2 py-1 text-left">Razorpay Payment ID</th>
          <th className="border border-gray-300 px-2 py-1 text-left">Razorpay Signature</th>
        </tr>
      </thead>
      <tbody>
        {currentDonations.map((donation) => (
          <tr key={donation._id} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-2 py-1 truncate">{donation.razorpay_order_id}</td>
            <td className="border border-gray-300 px-2 py-1 truncate">{donation.razorpay_payment_id}</td>
            <td className="border border-gray-300 px-2 py-1 truncate">{donation.razorpay_signature}</td>
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
