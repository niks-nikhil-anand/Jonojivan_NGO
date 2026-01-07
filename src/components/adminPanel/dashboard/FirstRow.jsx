"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  CalendarDays, 
  Calendar, 
  BarChart3, 
  Coins, 
  TrendingUp,
  IndianRupee,
  ArrowUpRight,
  Wallet
} from 'lucide-react';
import axios from 'axios';

const FirstRow = () => {
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

  const getDonationsByTime = (timeframe) => {
    const now = new Date();
    const donationsByTime = donations.filter((donation) => {
      const donationDate = new Date(donation.createdAt);
      
      if (timeframe === 'today') {
        return donationDate.toDateString() === now.toDateString();
      } else if (timeframe === 'week') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        return donationDate >= startOfWeek;
      } else if (timeframe === 'month') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        startOfMonth.setHours(0, 0, 0, 0);
        return donationDate >= startOfMonth;
      }
      return true;
    });
  
    return donationsByTime.reduce((total, donation) => total + donation.amount, 0);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const cards = [
    {
      title: "Today's Revenue",
      value: getDonationsByTime('today'),
      icon: CalendarDays,
      description: "Total donations received today",
      gradient: "from-blue-600 via-blue-500 to-blue-400",
      shadow: "shadow-blue-200",
      textColor: "text-blue-600"
    },
    {
      title: "Weekly Revenue",
      value: getDonationsByTime('week'),
      icon: Calendar,
      description: "Revenue fetched this week",
      gradient: "from-emerald-600 via-emerald-500 to-emerald-400",
      shadow: "shadow-emerald-200",
      textColor: "text-emerald-600"
    },
    {
      title: "Monthly Revenue",
      value: getDonationsByTime('month'),
      icon: BarChart3,
      description: "Revenue fetched this month",
      gradient: "from-violet-600 via-violet-500 to-violet-400",
      shadow: "shadow-violet-200",
      textColor: "text-violet-600"
    },
    {
      title: "Total Revenue",
      value: getDonationsByTime('all'),
      icon: Wallet,
      description: "All time total donations",
      gradient: "from-amber-600 via-amber-500 to-amber-400",
      shadow: "shadow-amber-200",
      textColor: "text-amber-600"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Overview of your donation performance.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200 text-sm font-medium">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          Live Updates
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card 
              key={index} 
              className="relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className={`w-24 h-24 ${card.textColor}`} />
              </div>
              
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium bg-gray-50 px-2 py-1 rounded-full text-gray-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>+2.4%</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">{card.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatAmount(card.value)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{card.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FirstRow;