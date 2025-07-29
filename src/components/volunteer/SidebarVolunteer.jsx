"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Home,
  Users,
  IdCard,
  FileText,
  Award,
  User,
  Settings,
  Heart,
  Receipt,
  LogOut,
  X,
} from "lucide-react";
import { toast } from "sonner";

const SidebarVolunteer = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState("");

  // Track current route and set active item
  useEffect(() => {
    const currentItem = menuSections
      .flatMap(section => section.items)
      .find(item => item.href === pathname);
    if (currentItem) {
      setSelectedItem(currentItem.label);
    }
  }, [pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname, setIsMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-sidebar') && !event.target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

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
          href: "/member/dashboard",
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
          href: "/member/membership_status",
          badge: null,
        },
        {
          icon: IdCard,
          label: "ID Card",
          href: "/member/IdCard",
          badge: null,
        },
        {
          icon: FileText,
          label: "Appointment Letter",
          href: "/member/appointment-letter",
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
          href: "/member/profile",
          badge: null,
        },
      ],
    },
    {
      title: "Actions",
      items: [
        {
          icon: Receipt,
          label: "Receipt",
          href: "/volunteer/donations/receipt",
          badge: null,
        },
        {
          icon: Award,
          label: "Generate Certificate",
          href: "/member/certificate",
          badge: null,
        },
      ],
    },
  ];

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-900 rounded-lg mr-3 flex items-center justify-center shadow-sm">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-base md:text-lg font-semibold text-gray-900">
                Member Portal
              </h1>
              <p className="text-xs md:text-sm text-gray-500">
                Jonojivan Foundation
              </p>
            </div>
          </div>
          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-1"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="py-4 space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="px-3 mb-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                {section.title}
              </h3>

              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <Link key={itemIndex} href={item.href}>
                    <SidebarItem
                      icon={item.icon}
                      label={item.label}
                      badge={item.badge}
                      isActive={pathname === item.href}
                      onClick={() => setSelectedItem(item.label)}
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-normal"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 h-screen bg-white border-r border-gray-200 flex-col shadow-lg">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              className="mobile-sidebar fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 flex flex-col shadow-xl z-50 md:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const SidebarItem = ({ icon: Icon, label, badge, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 group
        ${isActive 
          ? 'bg-gray-900 text-white shadow-sm' 
          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        }
      `}
    >
      <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
      <span className="ml-3 font-medium text-sm">{label}</span>
      
      {badge && (
        <Badge className="ml-auto text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
          {badge}
        </Badge>
      )}

      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
      )}
    </div>
  );
};

export default SidebarVolunteer;
