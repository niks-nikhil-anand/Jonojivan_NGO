"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import Papa from "papaparse";
import { toast } from "react-hot-toast";

const DonationExport = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDonations = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select a valid date range.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/donationSuccess", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        return data.donations;
      } else {
        toast.error(`Error: ${data.message}`);
        return [];
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch donations.");
      return [];
    }
  };

  const exportAsCSV = async () => {
    const donations = await fetchDonations();
    if (donations.length === 0) return;

    const csv = Papa.unparse(donations);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "donations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV downloaded successfully!");
  };

  const exportAsPDF = async () => {
    const donations = await fetchDonations();
    if (donations.length === 0) return;

    const doc = new jsPDF();
    doc.text("Donations Report", 20, 20);

    const tableData = donations.map((donation, index) => [
      index + 1,
      donation.name,
      donation.amount,
      donation.date,
    ]);

    doc.autoTable({
      head: [["#", "Name", "Amount", "Date"]],
      body: tableData,
    });

    doc.save("donations.pdf");
    toast.success("PDF downloaded successfully!");
  };

  return (
    <div className="p-8 w-full max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg">
  {/* Header */}
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-gray-800">Export Donations</h1>
    <p className="text-gray-600 mt-2">Select a date range to export donation data as CSV or PDF.</p>
  </div>

  {/* Date Range Picker */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div>
      <label className="block text-gray-700 font-medium mb-2">Start Date</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Select Start Date"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div>
      <label className="block text-gray-700 font-medium mb-2">End Date</label>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        placeholderText="Select End Date"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>

  {/* Buttons */}
  <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
    <button
      onClick={exportAsCSV}
      disabled={loading}
      className={`px-6 py-3 font-semibold rounded-lg shadow-md transition transform hover:scale-105 ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
    >
      {loading ? "Loading..." : "Export as CSV"}
    </button>
    <button
      onClick={exportAsPDF}
      disabled={loading}
      className={`px-6 py-3 font-semibold rounded-lg shadow-md transition transform hover:scale-105 ${loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"}`}
    >
      {loading ? "Loading..." : "Export as PDF"}
    </button>
  </div>

  {/* Footer */}
  <p className="text-gray-500 text-sm text-center">
    Note: Ensure that the selected date range is accurate to export the desired data.
  </p>
</div>

  );
};

export default DonationExport;
