"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';


import { FaHome, FaPlusCircle, FaBook, FaNewspaper } from "react-icons/fa";
import { MdPendingActions, MdOutlineLogout , MdOutlineCampaign , MdEmail } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaDonate, FaCreditCard, FaRegEnvelope  } from "react-icons/fa";




const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    toast.loading('Logging out...', { id: 'logout' });
    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Logged out successfully!', { id: 'logout' });
        router.push('/');
      } else {
        toast.error(`Logout failed: ${data.message}`, { id: 'logout' });
      }
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`, { id: 'logout' });
    }
  };
  return (
    <div className="flex">
      <motion.div
        animate={{ width: isOpen ? "250px" : "90px" }}
        className="bg-gradient-to-r from-gray-100 to-teal-50 dark:bg-gray-800 text-gray-900 dark:text-white h-screen p-5 shadow-lg overflow-y-auto transition-all duration-300"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.3)",
        }}
      >
        <button
          onClick={toggleSidebar}
          className="bg-white text-green-700 p-2 rounded mb-4 shadow-md transition-transform transform hover:scale-110"
        >
          <RiDashboardHorizontalFill className="w-6 h-6" />
        </button>

        <div className="flex flex-col space-y-4">
          <h2
            className={`text-lg font-semibold mb-4 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {isOpen ? "Dashboard" : ""}
          </h2>

          {/* Sidebar Items */}
          <Link href="/admin/dashboard/property/AddProperty" passHref>
            <SidebarItem
              icon={<FaHome />}
              label="Dashboard"
              isOpen={isOpen}
              selected={selectedItem === "Home"}
              onClick={() => setSelectedItem("Home")}
            />
          </Link>

          {isOpen && (
            <h3 className="text-sm mt-4 mb-2 text-green-700 font-bold">
              Donation
            </h3>
          )}
          <Link href="/admin/dashboard/orders/allOrders" passHref>
            <SidebarItem
              icon={<FaDonate />}
              label="All Donation"
              isOpen={isOpen}
              selected={selectedItem === "All Orders"}
              onClick={() => setSelectedItem("All Orders")}
            />
          </Link>

          <Link href="/admin/dashboard/orders/pendingOrders" passHref>
            <SidebarItem
              icon={<FaCreditCard />}
              label="Razorpay Payments"
              isOpen={isOpen}
              selected={selectedItem === "Pending Orders"}
              onClick={() => setSelectedItem("Pending Orders")}
            />
          </Link>

          {isOpen && (
            <h3 className="text-sm mt-4 mb-2 text-green-700 font-bold">
              Campaigns
            </h3>
          )}
          <Link href="/admin/dashboard/campaign/addCampaign" passHref>
            <SidebarItem
              icon={<FaPlusCircle />}
              label="Add Campaign"
              isOpen={isOpen}
              selected={selectedItem === "Add Campaign"}
              onClick={() => setSelectedItem("Add Campaign")}
            />
          </Link>
          <Link href="/admin/dashboard/campaign/campaigns" passHref>
          <SidebarItem
            icon={<MdOutlineCampaign />}
            label="Campaigns"
            isOpen={isOpen}
            selected={selectedItem === "Campaigns"}
            onClick={() => setSelectedItem("Campaigns")}
          />
        </Link>

          {isOpen && (
            <h3 className="text-sm mt-4 mb-2 text-green-700 font-bold">
              Blogs
            </h3>
          )}
          <Link href="/admin/dashboard/blogs/addBlog" passHref>
            <SidebarItem
              icon={<FaPlusCircle />}
              label="Add Blogs"
              isOpen={isOpen}
              selected={selectedItem === "Add Blogs"}
              onClick={() => setSelectedItem("Add Blogs")}
            />
          </Link>
          <Link href="/admin/dashboard/blogs" passHref>
            <SidebarItem
              icon={<FaBook />}
              label="Blogs"
              isOpen={isOpen}
              selected={selectedItem === "Blogs"}
              onClick={() => setSelectedItem("Blogs")}
            />
          </Link>

          {isOpen && (
            <h3 className="text-sm mt-4 mb-2 text-green-700 font-bold">
              Messages
            </h3>
          )}
          <Link href="/admin/dashboard/messages/newsletters" passHref>
            <SidebarItem
              icon={<MdEmail />}
              label="Newsletters"
              isOpen={isOpen}
              selected={selectedItem === "Newsletters"}
              onClick={() => setSelectedItem("Newsletters")}
            />
          </Link>

          <Link href="/admin/dashboard/messages/contactUs" passHref>
            <SidebarItem
              icon={<FaRegEnvelope />}
              label="Contact Us"
              isOpen={isOpen}
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
            {isOpen && <motion.span className="ml-2">Logout</motion.span>}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
  
const SidebarItem = ({ icon, label, isOpen, selected, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      className={`flex items-center space-x-4 p-2 rounded-lg transition-colors duration-300 ${
        selected
        ? "bg-gray-800 text-white"
        : "bg-transparent hover:bg-gray-700 hover:text-white"
      }`}
    >
      <div className="text-xl">{icon}</div>
      {isOpen && <span className="font-medium">{label}</span>}
    </motion.div>
  );
};




export default SidebarAdmin;
