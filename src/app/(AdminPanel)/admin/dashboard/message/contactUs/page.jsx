"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const News = () => {
  const [contacts, setContacts] = useState([]); // Make sure it's an array
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/admin/dashboard/contactUs");
        console.log(response.data.data); // Debug the API response
        // Ensure the data is an array before setting the state
        setContacts(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleView = async (id) => {
    try {
      const response = await axios.get(`/api/admin/dashboard/contactUs/${id}`);
      alert(`Contact: ${response.data.firstName} ${response.data.lastName}`);
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this contact?");
      if (!confirmed) return;

      await axios.delete(`/api/admin/dashboard/contactUs/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
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
    <div className="w-full p-4 pr-[5rem] bg-gray-100 shadow-lg rounded-lg h-[80vh]">
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <table className="border-collapse border border-gray-300 min-w-[1200px] text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-1 text-left">First Name</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Last Name</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Email</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Phone Number</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Message</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Created At</th>
              <th className="border border-gray-300 px-2 py-1 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-2 py-1">{contact.firstName}</td>
                <td className="border border-gray-300 px-2 py-1">{contact.lastName}</td>
                <td className="border border-gray-300 px-2 py-1">{contact.email}</td>
                <td className="border border-gray-300 px-2 py-1">{contact.mobileNumber}</td>
                <td className="border border-gray-300 px-2 py-1">{truncateWords(contact.message, 10)}</td>
                <td className="border border-gray-300 px-2 py-1">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleView(contact._id)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
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
        {[...Array(Math.ceil(contacts.length / contactsPerPage)).keys()].map((number) => (
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
