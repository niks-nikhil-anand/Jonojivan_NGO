"use client";
import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, TrendingUp, Calendar, PieChart as PieChartIcon, BarChart as BarChartIcon } from 'lucide-react';
import axios from 'axios';

const SecondRow = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("/api/donationSuccess");
        setDonations(Array.isArray(response.data.donations) ? response.data.donations : []);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // --- Data Processing Helpers ---

  // 1. Daily Trend Data (Area Chart)
  const getDailyData = () => {
    const dailyMap = donations.reduce((acc, donation) => {
      const date = new Date(donation.createdAt).toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short' 
      });
      acc[date] = (acc[date] || 0) + donation.amount;
      return acc;
    }, {});

    return Object.entries(dailyMap).map(([date, amount]) => ({
      name: date,
      amount: amount
    })).slice(-7); // Last 7 days for cleanliness, or remove slice for all
  };

  // 2. Monthly Data (Bar Chart)
  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyMap = donations.reduce((acc, donation) => {
      const d = new Date(donation.createdAt);
      const monthKey = months[d.getMonth()];
      acc[monthKey] = (acc[monthKey] || 0) + donation.amount;
      return acc;
    }, {});

    // Ensure all recent months are represented or just show active ones
    // Showing active ones for now
    return Object.entries(monthlyMap).map(([month, amount]) => ({
      name: month,
      amount: amount
    }));
  };

  // 3. Distribution by Amount (Pie Chart)
  const getDistributionData = () => {
    let small = 0, medium = 0, large = 0;
    donations.forEach(d => {
      if (d.amount < 500) small++;
      else if (d.amount < 2000) medium++;
      else large++;
    });
    
    return [
      { name: 'Micro (< ₹500)', value: small, color: '#3b82f6' }, // Blue
      { name: 'Standard (₹500-2k)', value: medium, color: '#10b981' }, // Emerald
      { name: 'Premium (> ₹2k)', value: large, color: '#8b5cf6' }, // Violet
    ].filter(item => item.value > 0);
  };

  const dailyData = getDailyData();
  const monthlyData = getMonthlyData();
  const distributionData = getDistributionData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-xl">
          <p className="text-sm font-semibold text-gray-700">{label}</p>
          <p className="text-sm font-bold text-green-600">
            ₹{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 pt-0">
      
      {/* Main Area Chart: Daily Trends */}
      <Card className="border-none shadow-lg bg-white overflow-hidden">
        <CardHeader className="border-b border-gray-50 bg-gray-50/30 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Donation Trends
              </CardTitle>
              <CardDescription>Daily donation overview for the last period</CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Growth +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#059669' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart: Monthly Overview */}
        <Card className="border-none shadow-lg bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
              <BarChartIcon className="w-5 h-5 text-blue-600" />
              Monthly Overview
            </CardTitle>
            <CardDescription>Total donations aggregated by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <Tooltip 
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart: Donation Distribution */}
        <Card className="border-none shadow-lg bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
              <PieChartIcon className="w-5 h-5 text-violet-600" />
              Donation Size
            </CardTitle>
            <CardDescription>Distribution by donation amount category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default SecondRow;