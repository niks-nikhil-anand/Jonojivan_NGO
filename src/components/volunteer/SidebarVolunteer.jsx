"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { toast } from "sonner";

const SidebarVolunteer = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const router = useRouter();

  const handleLogout = async () => {
    toast.loading("Logging out...", { id: "logout" });
    try {
      const response = await fetch("/api/member/auth/Logout", {
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
      className="w-72 h-screen bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-xl dark:shadow-2xl"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex items-center"
        >
          <div className="w-8 h-8 bg-gray-800 dark:bg-white rounded-lg shadow-md mr-3 flex items-center justify-center">
            <div className="w-4 h-4 bg-white dark:bg-black rounded-sm"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Member Portal
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Jonojivan Foundation
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 bg-gray-25 dark:bg-gray-950">
        <div className="py-6 space-y-8">
          {menuSections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * sectionIndex, duration: 0.3 }}
            >
              <h3 className="px-3 mb-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>

              <div className="space-y-1">
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
                <Separator className="mt-6 bg-gray-200 dark:bg-gray-800" />
              )}
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer - Logout Button */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full px-4 py-3 bg-white dark:bg-black border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
        >
          <LogOut className="h-4 w-4 mr-3" />
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
      whileHover={{ scale: 1.01, x: 2 }}
      whileTap={{ scale: 0.99 }}
      className={`relative group cursor-pointer rounded-lg transition-all duration-200 ${
        selected
          ? "bg-gray-900 dark:bg-white text-white dark:text-black shadow-lg ring-1 ring-gray-900 dark:ring-white"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 shadow-sm hover:shadow-md"
      }`}
    >
      <div className="flex items-center px-4 py-3">
        <Icon className={`h-5 w-5 transition-colors duration-200 ${
          selected ? "text-white dark:text-black" : ""
        }`} />
        <span className="ml-4 font-medium text-sm truncate">{label}</span>

        {badge && (
          <Badge
            className={`ml-auto text-xs font-medium px-2 py-1 shadow-sm transition-colors duration-200 ${
              badge === "New"
                ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-black"
                : badge === "Active"
                ? "bg-gray-700 dark:bg-gray-300 text-white dark:text-black"
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
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white dark:bg-black rounded-r-full shadow-lg"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Subtle hover glow effect */}
      <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        !selected ? "bg-gradient-to-r from-transparent via-gray-50 dark:via-gray-800 to-transparent" : ""
      }`} />
    </motion.div>
  );
};

export default SidebarVolunteer;
