"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import {
  FaHome,
  FaPlusCircle,
  FaBook,
  FaNewspaper,
  FaDonate,
  FaCreditCard,
  FaRegEnvelope,
} from "react-icons/fa";
import {
  MdPendingActions,
  MdOutlineLogout,
  MdOutlineCampaign,
  MdEmail,
} from "react-icons/md";

const SidebarAdmin = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  return (
    <div className="flex">
      <motion.div
        className="w-[250px] bg-gradient-to-r from-gray-100 to-teal-50 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white h-screen p-5 shadow-lg overflow-y-auto transition-all duration-300"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <button
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          {/* Sidebar Items */}
          <Link href="/admin/dashboard" passHref>
            <SidebarItem
              icon={<FaHome />}
              label="Dashboard"
              selected={selectedItem === "Home"}
              onClick={() => setSelectedItem("Home")}
            />
          </Link>

          <h3 className="text-sm mt-4 mb-2 text-green-700 font-bold">
            Donation
          </h3>
          <Link href="/admin/dashboard/donation/AllDonation" passHref>
            <SidebarItem
              icon={<FaDonate />}
              label="All Donation"
              selected={selectedItem === "All Donation"}
              onClick={() => setSelectedItem("All Donation")}
            />
          </Link>
          <Link href="/admin/dashboard/donation/payments" passHref>
            <SidebarItem
              icon={<FaCreditCard />}
              label="Razorpay Payments"
              selected={selectedItem === "Razorpay Payments"}
              onClick={() => setSelectedItem("Razorpay Payments")}
            />
          </Link>

          <h3 className="text-sm mt-4 mb-2 text-green-700 font-bold">
            Campaigns
          </h3>
          <Link href="/admin/dashboard/campaign/addCampaign" passHref>
            <SidebarItem
              icon={<FaPlusCircle />}
              label="Add Campaign"
              selected={selectedItem === "Add Campaign"}
              onClick={() => setSelectedItem("Add Campaign")}
            />
          </Link>
          <Link href="/admin/dashboard/campaign/campaigns" passHref>
            <SidebarItem
              icon={<MdOutlineCampaign />}
              label="Campaigns"
              selected={selectedItem === "Campaigns"}
              onClick={() => setSelectedItem("Campaigns")}
            />
          </Link>

          <h3 className="text-sm mt-4 mb-2 text-green-700 font-bold">Blogs</h3>
          <Link href="/admin/dashboard/blog/addBlog" passHref>
            <SidebarItem
              icon={<FaPlusCircle />}
              label="Add Blogs"
              selected={selectedItem === "Add Blogs"}
              onClick={() => setSelectedItem("Add Blogs")}
            />
          </Link>
          <Link href="/admin/dashboard/blog/allBlog" passHref>
            <SidebarItem
              icon={<FaBook />}
              label="Blogs"
              selected={selectedItem === "Blogs"}
              onClick={() => setSelectedItem("Blogs")}
            />
          </Link>

          <h3 className="text-sm mt-4 mb-2 text-green-700 font-bold">
            Messages
          </h3>
          <Link href="/admin/dashboard/message/contactUs" passHref>
            <SidebarItem
              icon={<FaRegEnvelope />}
              label="Contact Us"
              selected={selectedItem === "Contact Us"}
              onClick={() => setSelectedItem("Contact Us")}
            />
          </Link>

          <motion.button
            className="mt-6 flex items-center rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-red-700 shadow-md"
            onClick={handleLogout}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdOutlineLogout className="h-5 w-5" aria-hidden="true" />
            <motion.span className="ml-2">Logout</motion.span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

const SidebarItem = ({ icon, label, selected, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      className={`flex items-center space-x-4 p-2 rounded-lg transition-colors duration-300 ${
        selected
          ? "bg-gray-800 text-white dark:bg-teal-600"
          : "bg-transparent hover:bg-gray-700 hover:text-white"
      }`}
    >
      <div className="text-xl">{icon}</div>
      <span className="font-medium">{label}</span>
    </motion.div>
  );
};

export default SidebarAdmin;
