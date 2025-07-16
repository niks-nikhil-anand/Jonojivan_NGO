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
  Users,
  CreditCard,
  IdCard,
  FileText,
  Award,
  User,
  Settings,
  Heart,
  Receipt,
  LogOut,
} from "lucide-react";

const SidebarVolunteer = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const router = useRouter();

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

  const menuSections = [
    {
      title: "Overview",
      items: [
        {
          icon: Home,
          label: "Dashboard",
          href: "/volunteer/dashboard",
          badge: null,
        },
      ],
    },
    {
      title: "Membership",
      items: [
        {
          icon: Users,
          label: "Membership Status",
          href: "/volunteer/membership/status",
          badge: "Active",
        },
        {
          icon: IdCard,
          label: "Generate ID Card",
          href: "/volunteer/membership/id-card",
          badge: null,
        },
        {
          icon: FileText,
          label: "Appointment Letter",
          href: "/volunteer/membership/appointment-letter",
          badge: null,
        },
        {
          icon: Award,
          label: "Our Certificate",
          href: "/volunteer/membership/certificate",
          badge: null,
        },
      ],
    },
    {
      title: "Profile",
      items: [
        {
          icon: User,
          label: "Update Profile",
          href: "/volunteer/profile/update",
          badge: null,
        },
        {
          icon: Settings,
          label: "Account",
          href: "/volunteer/profile/account",
          badge: null,
        },
      ],
    },
    {
      title: "Donations",
      items: [
        {
          icon: Heart,
          label: "Donate Now",
          href: "/volunteer/donations/donate",
          badge: "New",
        },
        {
          icon: Receipt,
          label: "Receipt",
          href: "/volunteer/donations/receipt",
          badge: null,
        },
      ],
    },
  ];

  return (
    <motion.div
      className="w-72 h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black border-r border-gray-200 dark:border-gray-700 flex flex-col shadow-xl"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Volunteer Portal
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4">
        <div className="py-6 space-y-8">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="px-3 mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>

              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <Link key={itemIndex} href={item.href} passHref>
                    <SidebarItem
                      icon={item.icon}
                      label={item.label}
                      badge={item.badge}
                      selected={selectedItem === item.label}
                      onClick={() => setSelectedItem(item.label)}
                    />
                  </Link>
                ))}
              </div>

              {sectionIndex < menuSections.length - 1 && (
                <Separator className="mt-6 bg-gray-200 dark:bg-gray-700" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer - Logout Button */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
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
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group cursor-pointer rounded-xl transition-all duration-200 shadow-sm hover:shadow-md ${
        selected
          ? "bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-600 dark:text-blue-400 shadow-md ring-1 ring-blue-500/20"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      <div className="flex items-center px-4 py-3">
        <Icon className="h-5 w-5 transition-colors duration-200" />
        <span className="ml-4 font-medium text-sm truncate">{label}</span>

        {badge && (
          <Badge
            variant={badge === "New" ? "default" : badge === "Active" ? "secondary" : "outline"}
            className={`ml-auto text-xs font-medium px-2 py-1 shadow-sm ${
              badge === "New"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/25"
                : badge === "Active"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/25"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {badge}
          </Badge>
        )}
      </div>

      {/* Active indicator */}
      {selected && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

export default SidebarVolunteer;