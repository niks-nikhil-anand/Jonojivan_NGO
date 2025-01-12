"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegMoneyBillAlt, FaCalendarDay, FaCalendarWeek, FaRegChartBar } from 'react-icons/fa';

const FirstRow = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("/api/donationSuccess");
        console.log(response);
        setDonations(Array.isArray(response.data.donations) ? response.data.donations : []);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const getDonationsByTime = (timeframe) => {
    const now = new Date();
    const donationsByTime = donations.filter((donation) => {
      const donationDate = new Date(donation.createdAt);
      
      if (timeframe === 'today') {
        // Today's donations
        return donationDate.toDateString() === now.toDateString();
      } else if (timeframe === 'week') {
        // Start of the current week (Sunday)
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Adjust to the start of the week (Sunday)
        startOfWeek.setHours(0, 0, 0, 0); // Ensure time is at the start of the day
        // Compare the donation date with the start of the week
        return donationDate >= startOfWeek;
      } else if (timeframe === 'month') {
        // Start of the current month
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the current month
        startOfMonth.setHours(0, 0, 0, 0); // Ensure time is at the start of the day
        // Compare the donation date with the start of the month
        return donationDate >= startOfMonth;
      }
      
      return true; // Default return, in case no timeframe matches
    });
  
    // Sum the donation amounts for the filtered donations
    return donationsByTime.reduce((total, donation) => total + donation.amount, 0);
  };
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {/* Today's Donation */}
      <div className="flex flex-col items-center justify-center bg-blue-500 text-white p-4 rounded-lg shadow-lg">
        <FaCalendarDay size={40} />
        <h3 className="text-lg mt-2">Today&apos;s Donation</h3>
        <p className="text-xl mt-1">{loading ? 'Loading...' : `₹${getDonationsByTime('today')}`}</p>
      </div>

      {/* This Week's Donation */}
      <div className="flex flex-col items-center justify-center bg-green-500 text-white p-4 rounded-lg shadow-lg">
        <FaCalendarWeek size={40} />
        <h3 className="text-lg mt-2">This Week&apos;s Donation</h3>
        <p className="text-xl mt-1">{loading ? 'Loading...' : `₹${getDonationsByTime('week')}`}</p>
      </div>
       {/* This Month's Donation */}
       <div className="flex flex-col items-center justify-center bg-yellow-500 text-white p-4 rounded-lg shadow-lg">
        <FaRegChartBar size={40} />
        <h3 className="text-lg mt-2">This Month&apos;s Donation</h3>
        <p className="text-xl mt-1">{loading ? 'Loading...' : `₹${getDonationsByTime('month')}`}</p>
      </div>
      {/* All Time Donation */}
      <div className="flex flex-col items-center justify-center bg-purple-500 text-white p-4 rounded-lg shadow-lg">
        <FaRegMoneyBillAlt size={40} />
        <h3 className="text-lg mt-2">All Time Donation</h3>
        <p className="text-xl mt-1">{loading ? 'Loading...' : `₹${getDonationsByTime('all')}`}</p>
      </div>
      </div>
  );
};

export default FirstRow;
