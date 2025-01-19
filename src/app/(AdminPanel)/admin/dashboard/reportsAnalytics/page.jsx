"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import "jspdf-autotable";  // Import the jsPDF autotable plugin
import Papa from "papaparse";
import { toast } from "react-hot-toast";

const DonationExport = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [csvLoading, setCsvLoading] = useState(false); // Loading state for CSV export
  const [pdfLoading, setPdfLoading] = useState(false); // Loading state for PDF export

  const fetchDonations = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select a valid date range.");
      return [];
    }

    try {
      const response = await fetch(`/api/admin/dashboard/donation/dateRanges?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data.donations || [];
      } else {
        toast.error(`Error: ${data.message || "Unknown error"}`);
        return [];
      }
    } catch (error) {
      toast.error("Failed to fetch donations.");
      return [];
    }
  };

  const exportAsCSV = async () => {
    setCsvLoading(true); // Set loading state for CSV export
    const donations = await fetchDonations();
    if (donations.length === 0) {
      setCsvLoading(false);
      return;
    }

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
    setCsvLoading(false); // Reset loading state for CSV export
  };

  const exportAsPDF = async () => {
    setPdfLoading(true); // Set loading state for PDF export
    const donations = await fetchDonations();
    if (donations.length === 0) {
      setPdfLoading(false);
      return;
    }
  
    // Create a new jsPDF document in portrait orientation (default)
    const doc = new jsPDF('p');  // 'p' stands for portrait orientation
  
    doc.text("Donations Report BringSmile.org", 20, 20);
  
    // Function to format the date as "24 Feb 2028"
    const formatDate = (date) => {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return new Date(date).toLocaleDateString('en-GB', options); // British English format for "24 Feb 2028"
    };
  
    // Include all the required fields in the table as columns
    const tableData = donations.map((donation) => [
      donation._id, // Donation ID
      formatDate(donation.createdAt), // Format the date
      donation.fullName,
      donation.email,
      donation.panCardNumber || "N/A", // Handling missing panCardNumber
      donation.phoneNumber,
      donation.amount,
      donation.razorpay_order_id,
      donation.razorpay_payment_id,
    ]);
  
    // Define the table headers based on the new fields (rotating text for vertical header)
    const header = [
      "ID",
      "Date",
      "Name",
      "Email",
      "Pan Card",
      "Phone Number",
      "Amount",
      "Razorpay Order ID",
      "Razorpay Payment ID",
    ];
  
    // Set the font size smaller to make sure everything fits
    doc.setFontSize(8);
  
    // Create a vertical table by rotating the headers to be vertical
    doc.autoTable({
      head: [header],
      body: tableData,
      startY: 30, // Position the table after the title
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 30 },
        5: { cellWidth: 30 },
        6: { cellWidth: 30 },
        7: { cellWidth: 30 },
        8: { cellWidth: 30 },
      },
      theme: 'grid', // Optional grid theme for better readability
      headStyles: {
        fillColor: [255, 0, 0], // Optional header background color
      },
    });
  
    // Save the PDF
    doc.save("donations.pdf");
    toast.success("PDF downloaded successfully!");
    setPdfLoading(false); // Reset loading state for PDF export
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
          disabled={csvLoading}
          className={`px-6 py-3 font-semibold rounded-lg shadow-md transition transform hover:scale-105 ${csvLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          {csvLoading ? "Loading..." : "Export as CSV"}
        </button>
        <button
          onClick={exportAsPDF}
          disabled={pdfLoading}
          className={`px-6 py-3 font-semibold rounded-lg shadow-md transition transform hover:scale-105 ${pdfLoading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"}`}
        >
          {pdfLoading ? "Loading..." : "Export as PDF"}
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
