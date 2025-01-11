"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdDownload, MdDelete, MdArrowUpward, MdArrowDownward , MdSwapVert } from 'react-icons/md'; // Import necessary icons
import Loader from "@/components/loader/loader";
import toast from 'react-hot-toast';




const DonationTable = () => {
  const [donations, setDonations] = useState([]); // Rename to donations
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 12;
  const [sortField, setSortField] = useState(null); // State for tracking the field being sorted
  const [sortOrder, setSortOrder] = useState("asc"); // State for tracking the sort order
  const router = useRouter();


  const [showModal, setShowModal] = useState(false); // Modal state
  const [deleteId, setDeleteId] = useState(null); // Track the ID for deletionx

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("/api/donationSuccess"); // Adjust the API URL as per your API endpoint
        console.log(response)
        setDonations(Array.isArray(response.data.donations) ? response.data.donations.reverse() : []); // Reverse the array after fetching
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


  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      // Show a loading toast
      const toastId = toast.loading("Deleting donation...");

      await axios.delete(`/api/admin/dashboard/donation/${deleteId}`);

      // Update state to remove the deleted donation
      setDonations(donations.filter((donation) => donation._id !== deleteId));
      setShowModal(false); // Close the modal
      setDeleteId(null);

      // Show success toast
      toast.success("Donation deleted successfully!", { id: toastId });
    } catch (error) {
      console.error("Error deleting donation:", error);

      // Show error toast
      toast.error("Failed to delete the donation. Please try again.");
    }
  };

  if (loading) {
    return <Loader/>;
  }

  const sortDonations = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    const sortedDonations = [...donations].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setDonations(sortedDonations);
  };


  

  return (
    <div className="w-full p-4 bg-white shadow-lg  h-[80vh] min-w-[100%] mx-auto mt-4 ">
    <div className="overflow-x-auto overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <table className="border-collapse border border-gray-300 min-w-[70vh] text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-gray-400 to-teal-500">
          
            <th className="border border-gray-300 px-2 py-1 text-left">Full Name</th>
            <th className="border border-gray-300 px-2 py-1 text-left">Email</th>
            <th className="border border-gray-300 px-2 py-1 text-left">Pan Card No.</th>
            <th
                className=" px-2 py-1 text-left cursor-pointer flex  items-center gap-2"
                onClick={() => sortDonations('amount')}
              >
                <span>Amount</span>
                {sortField === 'amount' ? (
                  sortOrder === 'asc' ? (
                    <MdArrowUpward size={16} />
                  ) : (
                    <MdArrowDownward size={16} />
                  )
                ) : (
                  <MdSwapVert size={16} /> // Sort icon when the column isn't actively sorted
                )}
              </th>
            <th className="border border-gray-300 px-2 py-1 text-left">Payment Method</th>
            <th className="border border-gray-300 px-2 py-1 text-left">RazorPay Payment Id</th>
            <th className="border border-gray-300 px-2 py-1 text-left">Donation's Date-Time</th>
            <th className="border border-gray-300 px-2 py-1 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentDonations.map((donation) => (
            <tr key={donation._id} className="hover:bg-gray-200 cursor-pointer">
              <td className="border border-gray-300 px-2 py-1 truncate">{donation.fullName}</td>
              <td className="border border-gray-300 px-2 py-1 truncate">{donation.email}</td>
              <td className="border border-gray-300 px-2 py-1 truncate">
            {donation.panCardNumber ? donation.panCardNumber : 'Not Available'}
               </td>
              <td className="border border-gray-300 px-2 py-1 font-semibold">₹{donation.amount}/-</td>
              <td className="border border-gray-300 px-2 py-1 truncate">{donation.paymentMethod}</td>
              <td className="border border-gray-300 px-2 py-1 truncate">{donation.razorpay_payment_id}</td>
              <td className="border border-gray-300 px-2 py-1 truncate">
                {new Date(donation.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}{" "}
                {new Date(donation.createdAt).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true, // To display AM/PM
                })}
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
                      onClick={() => confirmDelete(donation._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                    >
                      <MdDelete className="text-white" size={16} />
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
    {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[300px]">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-sm mb-4">Are you sure you want to delete this donation?</p>
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

export default DonationTable;
