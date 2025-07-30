"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  FileText,
  Heart,
  Clock,
  Award,
  CreditCard,
  Download,
  UserPlus,
  TrendingUp,
  Bell,
  Calendar,
  Star,
  Trophy,
  Target,
  ArrowRight,
  Activity,
  File,
  CheckCircle,
  Eye,
  X,
  QrCode,
  MapPin,
  Phone,
  Mail,
  CreditCard as IdCard,
  Shield,
  Home,
  Settings,
  LogOut,
  Plus,
  Share2,
  Printer,
} from "lucide-react";
import {
  LineChart,
  Line,
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
  AreaChart,
  Area,
} from "recharts";

const DashboardPage = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    appointments: 0,
    donations: 0,
    certificates: 0,
    documentsDownloaded: 0,
    totalCertificates: 0,
  });

  const [showIdCard, setShowIdCard] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showUpcomingEvents, setShowUpcomingEvents] = useState(false);

  // Mock data
  const userData = {
    name: "John Doe",
    membershipStatus: "Active",
    membershipId: "VLT-2024-001",
    totalAppointments: 12,
    donationsMade: 8,
    donationAmount: 25000,
    lastActivity: "2 hours ago",
    certificatesEarned: 5,
    totalCertificates: 15,
    documentsDownloaded: 23,
    joinDate: "January 2024",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, City, State 12345",
    bloodGroup: "O+",
    emergencyContact: "+91 9876543211",
  };

  const donationData = [
    { month: "Jan", amount: 2500 },
    { month: "Feb", amount: 3200 },
    { month: "Mar", amount: 1800 },
    { month: "Apr", amount: 4500 },
    { month: "May", amount: 3800 },
    { month: "Jun", amount: 5200 },
  ];

  const documentUsageData = [
    { name: "ID Cards", value: 45, color: "#3b82f6" },
    { name: "Certificates", value: 32, color: "#10b981" },
    { name: "Appointment Letters", value: 28, color: "#f59e0b" },
    { name: "Donation Receipts", value: 18, color: "#8b5cf6" },
    { name: "Training Materials", value: 15, color: "#ef4444" },
    { name: "Event Passes", value: 12, color: "#06b6d4" },
  ];

  const activityData = [
    { day: "Mon", donations: 1, updates: 2, downloads: 3 },
    { day: "Tue", donations: 2, updates: 1, downloads: 2 },
    { day: "Wed", donations: 0, updates: 3, downloads: 1 },
    { day: "Thu", donations: 3, updates: 1, downloads: 4 },
    { day: "Fri", donations: 1, updates: 2, downloads: 2 },
    { day: "Sat", donations: 2, updates: 0, downloads: 3 },
    { day: "Sun", donations: 1, updates: 1, downloads: 1 },
  ];

  const documentsDownloaded = [
    {
      name: "Volunteer Certificate",
      type: "Certificate",
      date: "2024-07-15",
      downloads: 3,
    },
    { name: "ID Card", type: "ID Card", date: "2024-07-14", downloads: 2 },
    {
      name: "Appointment Letter",
      type: "Letter",
      date: "2024-07-13",
      downloads: 1,
    },
    {
      name: "Training Certificate",
      type: "Certificate",
      date: "2024-07-12",
      downloads: 1,
    },
    {
      name: "Membership Card",
      type: "ID Card",
      date: "2024-07-11",
      downloads: 1,
    },
    {
      name: "Service Record",
      type: "Document",
      date: "2024-07-10",
      downloads: 2,
    },
    {
      name: "Donation Receipt",
      type: "Receipt",
      date: "2024-07-09",
      downloads: 4,
    },
    {
      name: "Event Participation",
      type: "Certificate",
      date: "2024-07-08",
      downloads: 1,
    },
  ];

  const recentActivities = [
    {
      action: "Certificate Downloaded",
      time: "2 hours ago",
      icon: Award,
      color: "text-yellow-600",
    },
    {
      action: "Profile Updated",
      time: "1 day ago",
      icon: Users,
      color: "text-blue-600",
    },
    {
      action: "Donation Made",
      time: "3 days ago",
      icon: Heart,
      color: "text-red-600",
    },
    {
      action: "ID Card Generated",
      time: "1 week ago",
      icon: IdCard,
      color: "text-green-600",
    },
    {
      action: "Document Downloaded",
      time: "2 weeks ago",
      icon: Download,
      color: "text-purple-600",
    },
    {
      action: "Training Completed",
      time: "3 weeks ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
  ];

  const achievements = [
    {
      title: "First Donation",
      description: "Made your first donation",
      earned: true,
      icon: Heart,
      color: "text-red-500",
    },
    {
      title: "5x Donor",
      description: "Donated 5 times",
      earned: true,
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      title: "Document Master",
      description: "Downloaded all documents",
      earned: true,
      icon: Download,
      color: "text-blue-500",
    },
    {
      title: "Active Member",
      description: "6 months of membership",
      earned: false,
      icon: Shield,
      color: "text-gray-400",
    },
    {
      title: "Certificate Collector",
      description: "Earned 10 certificates",
      earned: true,
      icon: Award,
      color: "text-purple-500",
    },
    {
      title: "Top Volunteer",
      description: "Top 10% volunteer",
      earned: false,
      icon: Star,
      color: "text-gray-400",
    },
  ];

  const upcomingEvents = [
    {
      title: "Monthly Volunteer Meet",
      date: "July 25, 2025",
      time: "10:00 AM",
      location: "Community Center",
    },
    {
      title: "Community Service Drive",
      date: "August 2, 2025",
      time: "9:00 AM",
      location: "City Park",
    },
    {
      title: "Training Workshop",
      date: "August 15, 2025",
      time: "2:00 PM",
      location: "Training Hall",
    },
    {
      title: "Annual Volunteer Award",
      date: "August 30, 2025",
      time: "6:00 PM",
      location: "Main Auditorium",
    },
  ];

  const certificateTypes = [
    { name: "Volunteer Service", count: 5, color: "bg-blue-100 text-blue-800" },
    {
      name: "Training Completion",
      count: 3,
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Special Achievement",
      count: 2,
      color: "bg-purple-100 text-purple-800",
    },
    { name: "Leadership", count: 1, color: "bg-yellow-100 text-yellow-800" },
    { name: "Community Impact", count: 4, color: "bg-red-100 text-red-800" },
  ];

  // Animate numbers on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedNumbers((prev) => ({
        appointments:
          prev.appointments < userData.totalAppointments
            ? prev.appointments + 1
            : userData.totalAppointments,
        donations:
          prev.donations < userData.donationsMade
            ? prev.donations + 1
            : userData.donationsMade,
        certificates:
          prev.certificates < userData.certificatesEarned
            ? prev.certificates + 1
            : userData.certificatesEarned,
        documentsDownloaded:
          prev.documentsDownloaded < userData.documentsDownloaded
            ? prev.documentsDownloaded + 1
            : userData.documentsDownloaded,
        totalCertificates:
          prev.totalCertificates < userData.totalCertificates
            ? prev.totalCertificates + 1
            : userData.totalCertificates,
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const summaryCards = [
    {
      title: "Membership Status",
      value: userData.membershipStatus,
      icon: Users,
      color: "from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      description: `ID: ${userData.membershipId}`,
    },
    {
      title: "Total Appointments",
      value: animatedNumbers.appointments,
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Letters & certificates generated",
    },
    {
      title: "Donations Made",
      value: animatedNumbers.donations,
      icon: Heart,
      color: "from-red-500 to-red-600",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      description: `₹${userData.donationAmount.toLocaleString()} total donated`,
    },
    {
      title: "Documents Downloaded",
      value: animatedNumbers.documentsDownloaded,
      icon: Download,
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "All time downloads",
    },
    {
      title: "Total Certificates",
      value: animatedNumbers.totalCertificates,
      icon: Award,
      color: "from-yellow-500 to-yellow-600",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Achievement certificates",
    },
  ];

  const quickActions = [
    {
      title: "View ID Card",
      icon: IdCard,
      color: "from-blue-500 to-blue-600",
      action: () => setShowIdCard(true),
    },
    {
      title: "Download Appointment Letter",
      icon: Download,
      color: "from-green-500 to-green-600",
      action: () => alert("Downloading appointment letter..."),
    },
    {
      title: "Donate Now",
      icon: Heart,
      color: "from-red-500 to-red-600",
      action: () => alert("Redirecting to donation page..."),
    },
    {
      title: "Update Profile",
      icon: UserPlus,
      color: "from-purple-500 to-purple-600",
      action: () => alert("Redirecting to profile update..."),
    },
    {
      title: "View Achievements",
      icon: Trophy,
      color: "from-yellow-500 to-yellow-600",
      action: () => setShowAchievements(true),
    },
    {
      title: "Upcoming Events",
      icon: Calendar,
      color: "from-indigo-500 to-indigo-600",
      action: () => setShowUpcomingEvents(true),
    },
    {
      title: "Certificate Types",
      icon: Award,
      color: "from-pink-500 to-pink-600",
      action: () => alert("Certificate types overview..."),
    },
    {
      title: "Settings",
      icon: Settings,
      color: "from-gray-500 to-gray-600",
      action: () => alert("Opening settings..."),
    },
  ];

  return (
    <div className="min-h-screen max-h-[60vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 pb-20">
      <div className=" mx-auto space-y-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={userData.profileImage}
                alt={userData.name}
                className="w-16 h-16 rounded-full border-4 border-white/30"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {userData.name}! 👋
                </h1>
                <p className="text-blue-100 text-lg">
                  Together we can make a difference in our community
                </p>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-white/20 text-white border-white/30 mb-2">
                {userData.membershipStatus} Member
              </Badge>
              <p className="text-blue-100">Member since {userData.joinDate}</p>
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {summaryCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${card.bgColor}`}>
                      <card.icon className={`h-5 w-5 ${card.textColor}`} />
                    </div>
                    <div
                      className={`h-8 w-8 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}
                    >
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {card.value}
                    </p>
                    <p className="text-xs text-gray-500">{card.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donations Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Donations Over Time
                </CardTitle>
                <CardDescription>Monthly donation trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={donationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
                      <Bar
                        dataKey="amount"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Document Usage Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Document Usage
                </CardTitle>
                <CardDescription>
                  Downloaded documents breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={documentUsageData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {documentUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                Activity Timeline (Last 7 Days)
              </CardTitle>
              <CardDescription>Your daily activity overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient
                        id="colorDonations"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorUpdates"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorDownloads"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="donations"
                      stackId="1"
                      stroke="#ef4444"
                      fill="url(#colorDonations)"
                    />
                    <Area
                      type="monotone"
                      dataKey="updates"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="url(#colorUpdates)"
                    />
                    <Area
                      type="monotone"
                      dataKey="downloads"
                      stackId="1"
                      stroke="#10b981"
                      fill="url(#colorDownloads)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Section - Only Two Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-500" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 overflow-y-auto">
                  <div className="space-y-4 pr-2">
                    {recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div
                          className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700`}
                        >
                          <activity.icon
                            className={`h-4 w-4 ${activity.color}`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.action}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Documents Downloaded */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-blue-500" />
                  Documents Downloaded
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 overflow-y-auto">
                  <div className="space-y-4 pr-2">
                    {documentsDownloaded.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                          <File className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {doc.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{doc.date}</span>
                            <span>•</span>
                            <span>{doc.downloads} downloads</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                Quick Actions
              </CardTitle>
              <CardDescription>Get things done quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={action.action}
                    className={`h-auto p-4 bg-gradient-to-r ${action.color} hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <action.icon className="h-6 w-6" />
                      <span className="text-sm font-medium">
                        {action.title}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ID Card Popup */}
        <AnimatePresence>
          {showIdCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowIdCard(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">ID Card</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowIdCard(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* ID Card Design */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-semibold">VOLUNTEER ID</div>
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <QrCode className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={userData.profileImage}
                      alt={userData.name}
                      className="w-20 h-20 rounded-full border-3 border-white/30 object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-xl">{userData.name}</h4>
                      <p className="text-blue-100 text-sm">Volunteer</p>
                      <p className="text-blue-100 text-sm">
                        Blood Group: {userData.bloodGroup}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <IdCard className="h-4 w-4" />
                      <span>ID: {userData.membershipId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Since: {userData.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-xs">{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{userData.phone}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/20 text-xs">
                    <p className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {userData.address}
                    </p>
                    <p className="mt-2 text-blue-100">
                      Emergency: {userData.emergencyContact}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Achievements Popup */}
        {/* Achievements Popup */}
        <AnimatePresence>
          {showAchievements && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowAchievements(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-xl w-full shadow-2xl overflow-y-auto max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Achievements
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAchievements(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        item.earned
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          item.earned ? "bg-green-100" : "bg-gray-100"
                        }`}
                      >
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upcoming Events Popup */}
        <AnimatePresence>
          {showUpcomingEvents && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowUpcomingEvents(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl overflow-y-auto max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Upcoming Events
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUpcomingEvents(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg shadow-sm"
                    >
                      <h4 className="text-lg font-semibold text-gray-800">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        <Calendar className="inline h-4 w-4 mr-1 text-blue-500" />
                        {event.date} at {event.time}
                      </p>
                      <p className="text-sm text-gray-500">
                        <MapPin className="inline h-4 w-4 mr-1 text-green-500" />
                        {event.location}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardPage;
