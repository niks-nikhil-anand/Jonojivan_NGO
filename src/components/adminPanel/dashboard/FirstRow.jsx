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
    return donations.filter((donation) => {
      const donationDate = new Date(donation.createdAt);
      if (timeframe === 'today') {
        return donationDate.toDateString() === now.toDateString();
      } else if (timeframe === 'week') {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return donationDate >= startOfWeek;
      } else if (timeframe === 'month') {
        return donationDate.getMonth() === now.getMonth() && donationDate.getFullYear() === now.getFullYear();
      }
      return true;
    }).reduce((total, donation) => total + donation.amount, 0);
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
