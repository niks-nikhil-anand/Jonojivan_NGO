"use client";
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, IndianRupee, Calendar, Target } from 'lucide-react';
import axios from 'axios';

// Registering chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ThirdRow = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
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

  // Prepare data for the graph
  const donationData = donations.reduce((acc, donation) => {
    const date = new Date(donation.createdAt).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short' 
    });
    if (acc[date]) {
      acc[date] += donation.amount;
    } else {
      acc[date] = donation.amount;
    }
    return acc;
  }, {});

  const labels = Object.keys(donationData);
  const data = Object.values(donationData);
  const totalDonations = data.reduce((sum, amount) => sum + amount, 0);
  const averageDonation = totalDonations / data.length || 0;

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Daily Donations',
        data: data,
        borderColor: 'hsl(142, 76%, 36%)',
        backgroundColor: 'linear-gradient(180deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.05) 100%)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: 'hsl(142, 76%, 36%)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'hsl(142, 76%, 30%)',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        shadowColor: 'rgba(34, 197, 94, 0.3)',
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'hsl(0, 0%, 3%)',
        titleColor: 'hsl(0, 0%, 98%)',
        bodyColor: 'hsl(0, 0%, 98%)',
        borderColor: 'hsl(142, 76%, 36%)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        padding: 12,
        titleFont: {
          size: 14,
          weight: '600',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          title: function(context) {
            return `Date: ${context[0].label}`;
          },
          label: function(context) {
            return `Amount: ₹${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'hsl(0, 0%, 90%)',
          lineWidth: 1,
        },
        border: {
          color: 'hsl(0, 0%, 85%)',
        },
        ticks: {
          color: 'hsl(0, 0%, 45%)',
          font: {
            size: 12,
            weight: '500',
          },
          padding: 10,
        },
      },
      y: {
        grid: {
          color: 'hsl(0, 0%, 90%)',
          lineWidth: 1,
        },
        border: {
          color: 'hsl(0, 0%, 85%)',
        },
        ticks: {
          color: 'hsl(0, 0%, 45%)',
          font: {
            size: 12,
            weight: '500',
          },
          padding: 10,
          callback: function(value) {
            return '₹' + value.toLocaleString();
          },
        },
      },
    },
    elements: {
      point: {
        hoverBorderWidth: 3,
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-64 ">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-green-200 border-t-green-600 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <IndianRupee className="w-4 h-4 text-green-600" />
        </div>
      </div>
    </div>
  );

  const StatCard = ({ icon: Icon, title, value, subtitle, gradient }) => (
    <div className={`relative overflow-hidden rounded-xl p-4 ${gradient} text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl `}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs opacity-75">{subtitle}</p>
        </div>
        <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full"></div>
    </div>
  );

  return (
    <div className="space-y-6 px-5">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={IndianRupee}
          title="Total Donations"
          value={`₹${totalDonations.toLocaleString()}`}
          subtitle="All time"
          gradient="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          icon={TrendingUp}
          title="Average Daily"
          value={`₹${Math.round(averageDonation).toLocaleString()}`}
          subtitle="Per day"
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          icon={Target}
          title="Total Days"
          value={donations.length}
          subtitle="Active days"
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* Main Chart Card */}
      <Card className="w-full overflow-hidden shadow-xl border-0 bg-gradient-to-br from-slate-50 to-white">
        <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                Donation Analytics
              </CardTitle>
              <CardDescription className="text-gray-600 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Daily donation amounts over time
              </CardDescription>
            </div>
            <Badge 
              variant="secondary" 
              className="bg-green-100 text-green-800 hover:bg-green-200 border border-green-200 px-3 py-1"
            >
              Live Data
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div 
              className="relative bg-white rounded-xl p-4 shadow-inner border border-gray-100" 
              style={{ height: '400px' }}
            >
              <Line data={chartData} options={chartOptions} />
              
              {/* Decorative elements */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300"></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ThirdRow;