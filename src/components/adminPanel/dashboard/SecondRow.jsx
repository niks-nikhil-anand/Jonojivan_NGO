"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; // Importing Line chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; // Importing necessary Chart.js components

// Registering chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ThirdRow = () => {
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

  // Prepare data for the graph (example: total donation amount over time)
  const donationData = donations.reduce((acc, donation) => {
    const date = new Date(donation.createdAt).toLocaleDateString(); // Formatting the date
    if (acc[date]) {
      acc[date] += donation.amount;
    } else {
      acc[date] = donation.amount;
    }
    return acc;
  }, {});

  const labels = Object.keys(donationData); // Labels: Dates
  const data = Object.values(donationData); // Data: Donation amounts for each date

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Donation Amount (₹)',
        data: data,
        borderColor: '#4CAF50', // Line color
        backgroundColor: 'rgba(76, 175, 80, 0.2)', // Line background color (fill area under the line)
        fill: true, // Filling the area under the line
        tension: 0.4, // For smooth line
        borderWidth: 3, // Line width
        pointRadius: 5, // Point size for data points
        pointBackgroundColor: '#4CAF50', // Point color
        pointBorderWidth: 2, // Border around the points
        pointHoverRadius: 7, // Enlarging point on hover
        pointHoverBackgroundColor: '#388E3C', // Point color on hover
        pointHoverBorderColor: '#2C6A2F', // Point border color on hover
        borderCapStyle: 'round', // Rounded line corners
        borderJoinStyle: 'round', // Rounded join of the lines
        hoverBorderWidth: 3, // Line width on hover
        hoverBackgroundColor: 'rgba(76, 175, 80, 0.4)', // Background color on hover
      },
    ],
  };
  

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensures that height is adjusted based on the container
    plugins: {
      title: {
        display: true,
        text: 'Donation Amount Over Time',
        font: {
          size: 20,
        },
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg" style={{ height: '350px' }}> {/* Reduced height */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default ThirdRow;
