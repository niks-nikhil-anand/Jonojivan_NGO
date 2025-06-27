"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  CalendarDays, 
  Calendar, 
  BarChart3, 
  Coins, 
  TrendingUp,
  IndianRupee
} from 'lucide-react';
import axios from 'axios';

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
      title: "Today's Donations",
      value: getDonationsByTime('today'),
      icon: CalendarDays,
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "This Week",
      value: getDonationsByTime('week'),
      icon: Calendar,
      gradient: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      change: "+8%",
      changeType: "positive"
    },
    {
      title: "This Month",
      value: getDonationsByTime('month'),
      icon: BarChart3,
      gradient: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      change: "+15%",
      changeType: "positive"
    },
    {
      title: "All Time",
      value: getDonationsByTime('all'),
      icon: Coins,
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      change: "+23%",
      changeType: "positive"
    }
  ];

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20 mb-2" />
            <Skeleton className="h-4 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Donation Overview</h2>
          <p className="text-muted-foreground">Track your donation metrics and performance</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          Live Data
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card 
              key={index} 
              className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 shadow-md"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5`} />
              
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold text-foreground flex items-center gap-1">
                    <IndianRupee className="h-5 w-5" />
                    {formatAmount(card.value).replace('₹', '')}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={card.changeType === 'positive' ? 'default' : 'destructive'}
                    className="text-xs px-2 py-0.5"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {card.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              </CardContent>
              
              {/* Subtle glow effect */}
              <div className={`absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full blur-xl`} />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FirstRow;