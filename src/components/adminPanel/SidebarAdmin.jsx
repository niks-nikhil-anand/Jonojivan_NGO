"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Home,
  Plus,
  BookOpen,
  Heart,
  CreditCard,
  Mail,
  LogOut,
  Megaphone,
  FileSpreadsheet,
  Sun,
  Moon,
  Settings,
  ChevronRight,
} from "lucide-react";

const SidebarAdmin = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

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
      const response = await fetch("/api/admin/auth/logout", {
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

  const menuSections = [
    {
      title: "Overview",
      items: [
        {
          icon: Home,
          label: "Dashboard",
          href: "/admin/dashboard",
          badge: null,
        },
      ],
    },
    {
      title: "Donations",
      items: [
        {
          icon: Heart,
          label: "All Donations",
          href: "/admin/dashboard/donation/AllDonation",
          badge: "New",
        },
        {
          icon: CreditCard,
          label: "Razorpay Payments",
          href: "/admin/dashboard/donation/payments",
          badge: null,
        },
      ],
    },
    {
      title: "Campaigns",
      items: [
        {
          icon: Plus,
          label: "Add Campaign",
          href: "/admin/dashboard/campaign/addCampaign",
          badge: null,
        },
        {
          icon: Megaphone,
          label: "All Campaigns",
          href: "/admin/dashboard/campaign/campaigns",
          badge: null,
        },
      ],
    },
    {
      title: "program",
      items: [
        {
          icon: Plus,
          label: "Add Program",
          href: "/admin/dashboard/program/addProgram",
          badge: null,
        },
        {
          icon: BookOpen,
          label: "All Programs",
          href: "/admin/dashboard/program/allProgram",
          badge: null,
        },
      ],
    },
    {
      title: "Content",
      items: [
        {
          icon: Plus,
          label: "Add Blog",
          href: "/admin/dashboard/blog/addBlog",
          badge: null,
        },
        {
          icon: BookOpen,
          label: "All Blogs",
          href: "/admin/dashboard/blog/allBlog",
          badge: null,
        },
      ],
    },
    {
      title: "Communication",
      items: [
        {
          icon: Mail,
          label: "Contact Messages",
          href: "/admin/dashboard/message/contactUs",
          badge: null,
        },
      ],
    },
  ];

  return (
    <motion.div
      className={`${
        isCollapsed ? "w-16" : "w-72"
      } h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 ease-in-out shadow-lg`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Portal
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Management Dashboard
              </p>
            </motion.div>
          )}

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </Button>

            {!isCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="py-4 space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {!isCollapsed && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {section.title}
                </h3>
              )}

              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <Link key={itemIndex} href={item.href} passHref>
                    <SidebarItem
                      icon={item.icon}
                      label={item.label}
                      badge={item.badge}
                      selected={selectedItem === item.label}
                      isCollapsed={isCollapsed}
                      onClick={() => setSelectedItem(item.label)}
                    />
                  </Link>
                ))}
              </div>

              {!isCollapsed && sectionIndex < menuSections.length - 1 && (
                <Separator className="mt-4 bg-slate-200 dark:bg-slate-700" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <Button
          onClick={handleLogout}
          variant="destructive"
          className={`${
            isCollapsed ? "w-8 h-8 p-0" : "w-full"
          } bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md transition-all duration-200`}
        >
          <LogOut className={`${isCollapsed ? "h-4 w-4" : "h-4 w-4 mr-2"}`} />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </motion.div>
  );
};

const SidebarItem = ({
  icon: Icon,
  label,
  badge,
  selected,
  isCollapsed,
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group cursor-pointer rounded-lg transition-all duration-200 ${
        selected
          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 shadow-sm"
          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
      }`}
    >
      <div
        className={`flex items-center ${
          isCollapsed ? "justify-center p-2" : "px-3 py-2"
        }`}
      >
        <Icon
          className={`${
            isCollapsed ? "h-5 w-5" : "h-4 w-4"
          } transition-colors duration-200`}
        />

        {!isCollapsed && (
          <>
            <span className="ml-3 font-medium text-sm truncate">{label}</span>

            {badge && (
              <Badge
                variant={badge === "New" ? "default" : "secondary"}
                className={`ml-auto text-xs ${
                  badge === "New"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                {badge}
              </Badge>
            )}
          </>
        )}
      </div>

      {/* Active indicator */}
      {selected && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {label}
          {badge && (
            <span className="ml-1 px-1 py-0.5 bg-blue-500 text-white rounded text-xs">
              {badge}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SidebarAdmin;
