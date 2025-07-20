"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Bell,
  Menu,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  Heart,
  Award,
  ChevronDown,
  Gift,
  Loader2,
} from "lucide-react";

const NavbarVolunteer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Certificate Available",
      message: "Your volunteer certificate is ready for download",
      time: "2 hours ago",
      type: "certificate",
      unread: true,
    },
    {
      id: 2,
      title: "Donation Received",
      message: "Thank you for your generous donation of $50",
      time: "1 day ago",
      type: "donation",
      unread: true,
    },
    {
      id: 3,
      title: "Profile Updated",
      message: "Your profile information has been successfully updated",
      time: "3 days ago",
      type: "profile",
      unread: false,
    },
  ]);
  const router = useRouter();

  // Fetch member data
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/member/auth/memberAuthToken", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const memberData = await response.json();
          console.log("Member data fetched:", memberData);
          
          // Transform the data for use in the component
          const transformedData = {
            name: memberData.user?.fullName || "N/A",
            email: memberData.user?.email || "N/A",
            avatar: memberData.profileImage || memberData.user?.profilePic || "/api/placeholder/40/40",
            role: `${memberData.post} - ${memberData.committee}`,
            committee: memberData.committee,
            subCommittee: memberData.subCommittee,
            post: memberData.post,
            membershipId: memberData.membershipId,
            membershipStatus: memberData.membershipStatus,
            joinDate: new Date(memberData.registrationDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            }),
            supportingAmount: memberData.supportingAmount || 0,
            paymentStatus: memberData.paymentStatus,
            state: memberData.state,
            district: memberData.district,
            joiningState: memberData.joiningState,
            mobileNumber: memberData.user?.mobileNumber,
            whatsappNumber: memberData.whatsappNumber,
          };
          
          setUserData(transformedData);
        } else {
          const errorData = await response.json();
          toast.error(`Failed to fetch member data: ${errorData.msg}`);
          // Redirect to login if unauthorized
          if (response.status === 401) {
            router.push("/member/login");
          }
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
        toast.error("Failed to fetch member data");
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [router]);

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const handleLogout = async () => {
    toast.loading("Logging out...", { id: "logout" });
    try {
      const response = await fetch("/api/member/auth/logout", {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Logged out successfully!", { id: "logout" });
        router.push("/");
      } else {
        toast.error(`Logout failed: ${data.message}`, { id: "logout" });
      }
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`, { id: "logout" });
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationIcon = (type) => {
    const iconClasses = "h-4 w-4";
    switch (type) {
      case "certificate":
        return <Award className={`${iconClasses} text-gray-700 dark:text-gray-300`} />;
      case "donation":
        return <Heart className={`${iconClasses} text-gray-700 dark:text-gray-300`} />;
      case "profile":
        return <User className={`${iconClasses} text-gray-700 dark:text-gray-300`} />;
      default:
        return <Bell className={`${iconClasses} text-gray-600 dark:text-gray-400`} />;
    }
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <motion.nav
        className="sticky top-0 z-50 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center px-6 py-4">
          <Loader2 className="h-6 w-6 animate-spin text-gray-800 dark:text-gray-200" />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Loading member data...
          </span>
        </div>
      </motion.nav>
    );
  }

  // Show error state if no user data
  if (!userData) {
    return (
      <motion.nav
        className="sticky top-0 z-50 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center px-6 py-4">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Failed to load member data
          </span>
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-2xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden h-10 w-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 shadow-xl">
              <SheetHeader>
                <SheetTitle className="text-left text-gray-900 dark:text-white">Member Portal</SheetTitle>
                <SheetDescription className="text-left text-gray-600 dark:text-gray-400">
                  {userData.membershipId} - {userData.membershipStatus}
                </SheetDescription>
              </SheetHeader>
              {/* Mobile menu items would go here */}
              <div className="mt-6 space-y-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                  <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">Member Details</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Committee: {userData.committee}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Sub-Committee: {userData.subCommittee}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Post: {userData.post}
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center Section - Member Stats */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-700">
            <Award className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              ID: {userData.membershipId}
            </span>
          </div>
          <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-700">
            <Heart className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Member Since {userData.joinDate}
            </span>
          </div>
          {/* Payment Status Badge */}
          <div className="hidden md:flex">
            <Badge 
              variant={userData.paymentStatus === 'Paid' ? 'default' : 'destructive'}
              className={`text-xs shadow-sm ${
                userData.paymentStatus === 'Paid' 
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-black' 
                  : 'bg-gray-700 text-white dark:bg-gray-300 dark:text-black'
              }`}
            >
              {userData.membershipStatus}
            </Badge>
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center space-x-3">
          {/* Dark Mode Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="relative h-10 w-20 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
          >
            <div className="relative w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300 ease-in-out border border-gray-300 dark:border-gray-600">
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-white dark:bg-black rounded-full shadow-lg flex items-center justify-center border border-gray-200 dark:border-gray-600"
                animate={{
                  x: isDarkMode ? 32 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <motion.div
                  animate={{
                    rotate: isDarkMode ? 180 : 0,
                    scale: isDarkMode ? 0.8 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  {isDarkMode ? (
                    <Moon className="h-3 w-3 text-gray-700" />
                  ) : (
                    <Sun className="h-3 w-3 text-gray-600" />
                  )}
                </motion.div>
              </motion.div>
            </div>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative h-10 w-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-gray-900 dark:bg-white text-white dark:text-black text-xs flex items-center justify-center rounded-full shadow-lg">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-80 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-2xl rounded-lg"
            >
              <DropdownMenuLabel className="flex items-center justify-between text-gray-900 dark:text-white">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {unreadCount} new
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex items-start space-x-3 p-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-900 ${
                      notification.unread ? "bg-gray-50 dark:bg-gray-900" : ""
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {notification.title}
                        </p>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-gray-700 dark:bg-gray-300 rounded-full flex-shrink-0 ml-2"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 shadow-md border-2 border-gray-200 dark:border-gray-700">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="bg-gray-800 dark:bg-gray-200 text-white dark:text-black text-sm">
                      {userData.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {userData.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {userData.post}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400 hidden md:block" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-64 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-2xl rounded-lg"
            >
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {userData.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {userData.email}
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    {userData.membershipId} • {userData.membershipStatus}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
              <div className="p-2">
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <p><span className="font-medium text-gray-800 dark:text-gray-200">Committee:</span> {userData.committee}</p>
                  <p><span className="font-medium text-gray-800 dark:text-gray-200">Sub-Committee:</span> {userData.subCommittee}</p>
                  <p><span className="font-medium text-gray-800 dark:text-gray-200">State:</span> {userData.state}</p>
                  <p><span className="font-medium text-gray-800 dark:text-gray-200">District:</span> {userData.district}</p>
                  {userData.supportingAmount > 0 && (
                    <p><span className="font-medium text-gray-800 dark:text-gray-200">Support Amount:</span> ₹{userData.supportingAmount}</p>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
              <DropdownMenuItem className="cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900">
                <Award className="mr-2 h-4 w-4" />
                <span>Certificates</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900">
                <Gift className="mr-2 h-4 w-4" />
                <span>Donations</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
              <DropdownMenuItem
                className="cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavbarVolunteer;
