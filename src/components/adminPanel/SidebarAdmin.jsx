"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

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
  Settings,
  ChevronRight,
  ChevronLeft,
  UserPlus,
  Handshake,
} from "lucide-react";

const SidebarAdmin = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

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
      title: "Member/Volunteer",
      items: [
        {
          icon: UserPlus,
          label: "Jonojivan Members",
          href: "/admin/dashboard/member",
          badge: null,
        },
        {
          icon: Handshake,
          label: "Garib Kalyan Yojana",
          href: "/admin/dashboard/Garib-Kalyan-Yojana",
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
        isCollapsed ? "w-20" : "w-80"
      } h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 border-r border-slate-200/60 flex flex-col transition-all duration-300 ease-in-out shadow-2xl shadow-slate-200/40`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-200/60 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 min-w-0"
            >
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1 truncate">
                Admin Portal
              </h1>
              <p className="text-xs text-slate-500 font-medium truncate">
                Management Dashboard
              </p>
            </motion.div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0 hover:bg-slate-100 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md flex-shrink-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-slate-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-slate-600" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-1">
        <div className="py-6 space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              {!isCollapsed && (
                <h3 className="px-3 mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
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
                <Separator className="mt-6 bg-slate-200/60" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200/60 bg-white/90 backdrop-blur-sm">
        <Button
          onClick={handleLogout}
          variant="destructive"
          className={`${
            isCollapsed ? "w-8 h-8 p-0" : "w-full h-10"
          } bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-sm gap-2`}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
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
      whileHover={{ scale: 1.01, x: 2 }}
      whileTap={{ scale: 0.99 }}
      className={`relative group cursor-pointer rounded-xl transition-all duration-200 mx-1 ${
        selected
          ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-md shadow-blue-500/20 border border-blue-200/80"
          : "text-slate-600 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 hover:text-slate-800 hover:shadow-sm"
      }`}
    >
      <div
        className={`flex items-center gap-3 ${
          isCollapsed ? "justify-center p-3" : "px-4 py-3"
        }`}
      >
        <Icon
          className={`${
            isCollapsed ? "h-5 w-5" : "h-5 w-5"
          } transition-all duration-200 flex-shrink-0 ${
            selected
              ? "text-blue-600"
              : "text-slate-500 group-hover:text-slate-700"
          }`}
        />

        {!isCollapsed && (
          <>
            <span
              className={`font-medium text-sm truncate flex-1 ${
                selected ? "text-blue-700 font-semibold" : "text-slate-700"
              }`}
            >
              {label}
            </span>

            {badge && (
              <Badge
                variant={badge === "New" ? "default" : "secondary"}
                className={`ml-2 text-xs font-semibold shadow-sm ${
                  badge === "New"
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-emerald-500/20"
                    : "bg-slate-200 text-slate-600"
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
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6  rounded-r-full shadow-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-3 px-3 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
          {label}
          {badge && (
            <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white rounded text-xs font-medium">
              {badge}
            </span>
          )}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-slate-900"></div>
        </div>
      )}
    </motion.div>
  );
};

export default SidebarAdmin;
