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
} from "lucide-react";

const NavbarVolunteer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@volunteer.org",
    avatar: "/api/placeholder/40/40",
    role: "Active Volunteer",
    joinDate: "March 2024",
    points: 2850,
  });

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
      const response = await fetch("/api/volunteer/auth/logout", {
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
    switch (type) {
      case "certificate":
        return <Award className="h-4 w-4 text-blue-600" />;
      case "donation":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "profile":
        return <User className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm"
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
                className="lg:hidden h-10 w-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">Volunteer Portal</SheetTitle>
                <SheetDescription className="text-left">
                  Quick access to your volunteer dashboard
                </SheetDescription>
              </SheetHeader>
              {/* Mobile menu items would go here */}
            </SheetContent>
          </Sheet>
        </div>

        {/* Center Section - Volunteer Stats */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-200">
            <Award className="h-4 w-4 text-blue-600 transition-colors duration-200" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-400 transition-colors duration-200">
              {userData.points} Points
            </span>
          </div>
          <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg transition-colors duration-200">
            <Heart className="h-4 w-4 text-green-600 transition-colors duration-200" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400 transition-colors duration-200">
              Active Since {userData.joinDate}
            </span>
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center space-x-3">
          {/* Dark Mode Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="relative h-10 w-20 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 ease-in-out"
          >
            <div className="relative w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300 ease-in-out">
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center transition-colors duration-300 ease-in-out"
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
                    <Moon className="h-3 w-3 text-slate-600" />
                  ) : (
                    <Sun className="h-3 w-3 text-amber-500" />
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
                className="relative h-10 w-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <Bell className="h-5 w-5 transition-colors duration-200" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex items-start space-x-3 p-3 cursor-pointer transition-colors duration-200 ${
                      notification.unread ? "bg-blue-50 dark:bg-blue-900/10" : ""
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
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
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
                className="relative h-10 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="bg-blue-500 text-white text-sm">
                      {userData.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200">
                      {userData.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                      {userData.role}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 hidden md:block transition-colors duration-200" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {userData.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userData.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Award className="mr-2 h-4 w-4" />
                <span>Certificates</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Gift className="mr-2 h-4 w-4" />
                <span>Donations</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 dark:text-red-400"
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