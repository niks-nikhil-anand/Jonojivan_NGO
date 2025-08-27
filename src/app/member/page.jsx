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
import Image from "next/image";
import { toast } from "react-hot-toast";

// Sample data that was missing from your original code
const donationData = [
  { month: "Jan", amount: 1000 },
  { month: "Feb", amount: 1500 },
  { month: "Mar", amount: 2000 },
  { month: "Apr", amount: 1200 },
  { month: "May", amount: 1800 },
  { month: "Jun", amount: 2200 },
];

const documentUsageData = [
  { name: "Certificates", value: 40, color: "#3b82f6" },
  { name: "Reports", value: 30, color: "#10b981" },
  { name: "Forms", value: 20, color: "#f59e0b" },
  { name: "Others", value: 10, color: "#ef4444" },
];

const documentsDownloaded = [
  { name: "Membership Certificate", type: "PDF", date: "2025-08-20", downloads: 1 },
  { name: "Annual Report", type: "PDF", date: "2025-08-18", downloads: 3 },
  { name: "Event Registration", type: "PDF", date: "2025-08-15", downloads: 2 },
  { name: "Committee Guidelines", type: "PDF", date: "2025-08-10", downloads: 1 },
];

const recentActivities = [
  { action: "Downloaded membership certificate", time: "2 hours ago", icon: Download, color: "text-blue-500" },
  { action: "Updated profile information", time: "1 day ago", icon: Settings, color: "text-green-500" },
  { action: "Made donation of ₹500", time: "3 days ago", icon: Heart, color: "text-red-500" },
  { action: "Attended committee meeting", time: "1 week ago", icon: Users, color: "text-purple-500" },
];

const DashboardPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profileImage: "",
    membershipId: "",
    membershipStatus: "",
    committee: "",
    post: "",
    district: "",
    state: "",
    phone: "",
    issueDate: "",
    validUntil: "",
    joinDate: "",
    qrStr: "",
    bloodGroup: "",
    address: "",
    emergencyContact: "",
    totalAppointments: 0,
    donationsMade: 0,
    donationAmount: 0,
    certificatesEarned: 0,
    totalCertificates: 0,
    documentsDownloaded: 0,
  });
  
  const [loading, setLoading] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showUpcomingEvents, setShowUpcomingEvents] = useState(false);

  const [animatedNumbers, setAnimatedNumbers] = useState({
    appointments: 0,
    donations: 0,
    certificates: 0,
    documentsDownloaded: 0,
    totalCertificates: 0,
  });

  useEffect(() => {
    async function fetchUser() {
      console.log("Fetching user..."); // Debug start
      setLoading(true);
      try {
        const res = await fetch("/api/member/auth/memberAuthToken", {
          method: "GET",
          credentials: "include",
        });

        console.log("Response received:", res); // Debug response object

        if (res.ok) {
          const member = await res.json();
          console.log("Member data:", member); // Debug fetched data

          const issueDate = new Date(member.registrationDate || Date.now());
          const validUntilDate = new Date(issueDate);
          validUntilDate.setMonth(validUntilDate.getMonth() + 11);

          const userDataObj = {
            name: member.user?.fullName || "N/A",
            email: member.user?.email || "N/A",
            profileImage: member.profileImage || member.user?.profilePic || "",
            membershipId: member.membershipId || "",
            membershipStatus: member.membershipStatus || "",
            committee: member.committee || "",
            post: member.post || "",
            district: member.district || "",
            state: member.state || "",
            phone: member.user?.mobileNumber || member.guardianMobile || "",
            issueDate: issueDate.toLocaleDateString(),
            validUntil: validUntilDate.toLocaleDateString(),
            joinDate: issueDate.toLocaleDateString(),
            qrStr: `${member.user?.fullName || ""}\nID: ${
              member.membershipId || ""
            }\nPhone: ${member.user?.mobileNumber || ""}\nCommittee: ${
              member.committee || ""
            }`,
            bloodGroup: member.bloodGroup || "N/A",
            address: member.address || "",
            emergencyContact: member.guardianMobile || "",
            totalAppointments: member.totalAppointments || 0,
            donationsMade: member.supportingAmount || 0,
            donationAmount: member.supportingAmount || 0,
            certificatesEarned: member.certificatesEarned || 0,
            totalCertificates: member.totalCertificates || 0,
            documentsDownloaded: member.documentsDownloaded || 0,
          };

          console.log("Processed userData:", userDataObj); // Debug final object
          setUserData(userDataObj);
        } else {
          console.warn("Unauthorized or not logged in"); // Debug non-OK responses
          toast.error("Unauthorized or not logged in");
        }
      } catch (err) {
        console.error("Fetch error:", err); // Debug any errors
        toast.error("Could not fetch data");
      } finally {
        setLoading(false);
        console.log("Loading finished"); // Debug end
      }
    }

    fetchUser();
  }, []);

  // Animate numbers on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedNumbers((prev) => ({
        appointments:
          prev.appointments < (userData.totalAppointments || 0)
            ? prev.appointments + 1
            : userData.totalAppointments || 0,
        donations:
          prev.donations < (userData.donationsMade || 0)
            ? prev.donations + 1
            : userData.donationsMade || 0,
        certificates:
          prev.certificates < (userData.certificatesEarned || 0)
            ? prev.certificates + 1
            : userData.certificatesEarned || 0,
        documentsDownloaded:
          prev.documentsDownloaded < (userData.documentsDownloaded || 0)
            ? prev.documentsDownloaded + 1
            : userData.documentsDownloaded || 0,
        totalCertificates:
          prev.totalCertificates < (userData.totalCertificates || 0)
            ? prev.totalCertificates + 1
            : userData.totalCertificates || 0,
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [userData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* User Profile Card */}
      <Card className="flex flex-col md:flex-row items-center gap-6 p-6">
        <div className="relative">
          <Image
            src={userData.profileImage || "/default-profile.png"}
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-2 border-blue-500"
            onError={(e) => {
              e.currentTarget.src = "/default-profile.png";
            }}
          />
        </div>
        <div className="flex-1 space-y-1">
          <CardTitle className="text-2xl font-bold">{userData.name}</CardTitle>
          <CardDescription>Email: {userData.email}</CardDescription>
          <CardDescription>Phone: {userData.phone || "N/A"}</CardDescription>
          <CardDescription>Membership ID: {userData.membershipId}</CardDescription>
          <CardDescription>Committee: {userData.committee}</CardDescription>
          <CardDescription>Post: {userData.post}</CardDescription>
        </div>
        <Button variant="outline" onClick={() => console.log("Edit Profile")}>
          Edit Profile
        </Button>
      </Card>

      {/* Animated Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <Card className="p-4 text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">
            {animatedNumbers.appointments}
          </CardTitle>
          <CardDescription>Total Appointments</CardDescription>
        </Card>
        <Card className="p-4 text-center">
          <CardTitle className="text-3xl font-bold text-green-600">
            {animatedNumbers.donations}
          </CardTitle>
          <CardDescription>Donations Made</CardDescription>
        </Card>
        <Card className="p-4 text-center">
          <CardTitle className="text-3xl font-bold text-purple-600">
            {animatedNumbers.certificates}
          </CardTitle>
          <CardDescription>Certificates Earned</CardDescription>
        </Card>
        <Card className="p-4 text-center">
          <CardTitle className="text-3xl font-bold text-orange-600">
            {animatedNumbers.documentsDownloaded}
          </CardTitle>
          <CardDescription>Documents Downloaded</CardDescription>
        </Card>
        <Card className="p-4 text-center">
          <CardTitle className="text-3xl font-bold text-red-600">
            {animatedNumbers.totalCertificates}
          </CardTitle>
          <CardDescription>Total Certificates</CardDescription>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donation Chart */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Monthly Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={donationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Document Usage Pie */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Document Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={documentUsageData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {documentUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Documents Downloaded */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Recently Downloaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Type</th>
                  <th className="px-4 py-2 font-medium">Date</th>
                  <th className="px-4 py-2 font-medium">Downloads</th>
                </tr>
              </thead>
              <tbody>
                {documentsDownloaded.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 border-b">
                    <td className="px-4 py-2">{doc.name}</td>
                    <td className="px-4 py-2">
                      <Badge variant="secondary">{doc.type}</Badge>
                    </td>
                    <td className="px-4 py-2">{doc.date}</td>
                    <td className="px-4 py-2">{doc.downloads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                <div className={`p-2 rounded-full bg-gray-100`}>
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
