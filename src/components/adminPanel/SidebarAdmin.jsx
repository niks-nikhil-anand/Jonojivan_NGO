"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaAppleAlt, FaCarrot, FaShoppingCart, FaListUl, FaCog } from "react-icons/fa";
import { GiReturnArrow, GiTruck, GiFruitBowl, GiOpenBook } from "react-icons/gi";
import { MdOutlineLogout } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import waveNav from '../../../public/frontend/SvgAssets/wave-nav.svg'; 

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        router.push('/');
      } else {
        alert(`Logout failed: ${data.message}`);
      }
    } catch (error) {
      alert(`Logout failed: ${error.message}`);
    }
  };

  return (
    <div className="flex">
      <motion.div
        animate={{ width: isOpen ? "250px" : "90px" }}
        className="bg-green-700 text-white h-screen p-5 transition-width duration-300 shadow-lg overflow-y-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.3)" }}
      >
        <button
          onClick={toggleSidebar}
          className="bg-white text-green-700 p-2 rounded mb-4 shadow-md transition-transform transform hover:scale-110"
        >
          <FaListUl />
        </button>
        <div className="flex flex-col space-y-4">
          <h2 className={`text-lg font-semibold mb-4 ${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
            {isOpen ? "Dashboard" : ""}
          </h2>
          <Link href="/admin/dashboard/property/AddProperty" passHref>
            <SidebarItem icon={<FaAppleAlt />} label="Home" isOpen={isOpen} selected={selectedItem === 'Home'} onClick={() => setSelectedItem('Home')} />
          </Link>

          {isOpen && <h3 className="text-sm font-medium mt-4 mb-2 text-yellow-500">Orders</h3>}
          <Link href="/admin/dashboard/orders/allOrders" passHref>
            <SidebarItem icon={<FaShoppingCart />} label="All Orders" isOpen={isOpen} selected={selectedItem === 'All Orders'} onClick={() => setSelectedItem('All Orders')} />
          </Link>
          <Link href="/admin/dashboard/orders/pendingOrders" passHref>
            <SidebarItem icon={<FaShoppingCart />} label="Pending Orders" isOpen={isOpen} selected={selectedItem === 'Pending Orders'} onClick={() => setSelectedItem('Pending Orders')} />
          </Link>

          {isOpen && <h3 className="text-sm font-medium mt-4 mb-2 text-yellow-400">Products</h3>}
          <Link href="/admin/dashboard/product/addProduct" passHref>
            <SidebarItem icon={<GiFruitBowl />} label="Add Product" isOpen={isOpen} selected={selectedItem === 'Add Product'} onClick={() => setSelectedItem('Add Product')} />
          </Link>
          <Link href="/admin/dashboard/product/allProduct" passHref>
            <SidebarItem icon={<FaCarrot />} label="Products" isOpen={isOpen} selected={selectedItem === 'Products'} onClick={() => setSelectedItem('Products')} />
          </Link>

          {isOpen && <h3 className="text-sm font-medium mt-4 mb-2 text-yellow-400">Categories</h3>}
          <Link href="/admin/dashboard/category/addCategory" passHref>
            <SidebarItem icon={<FaListUl />} label="Add Categories" isOpen={isOpen} selected={selectedItem === 'Add Categories'} onClick={() => setSelectedItem('Add Categories')} />
          </Link>
          <Link href="/admin/dashboard/category/allCategory" passHref>
            <SidebarItem icon={<FaListUl />} label="All Categories" isOpen={isOpen} selected={selectedItem === 'All Categories'} onClick={() => setSelectedItem('All Categories')} />
          </Link>

          {isOpen && <h3 className="text-sm font-medium mt-4 mb-2 text-yellow-400">Blog</h3>}
          <Link href="/admin/dashboard/blog/addBlog" passHref>
            <SidebarItem icon={<GiOpenBook />} label="Add Blog" isOpen={isOpen} selected={selectedItem === 'Add Blog'} onClick={() => setSelectedItem('Add Blog')} />
          </Link>
          <Link href="/admin/dashboard/blog/allBlog" passHref>
            <SidebarItem icon={<GiOpenBook />} label="Blogs" isOpen={isOpen} selected={selectedItem === 'Blogs'} onClick={() => setSelectedItem('Blogs')} />
          </Link>

          {isOpen && <h3 className="text-sm font-medium mt-4 mb-2 text-yellow-400">Users</h3>}
          <Link href="/admin/dashboard/user/tableView" passHref>
            <SidebarItem icon={<FaAppleAlt />} label="Table View" isOpen={isOpen} selected={selectedItem === 'Table View'} onClick={() => setSelectedItem('Table View')} />
          </Link>
          <Link href="/admin/dashboard/user/cardView" passHref>
            <SidebarItem icon={<FaAppleAlt />} label="Card View" isOpen={isOpen} selected={selectedItem === 'Card View'} onClick={() => setSelectedItem('Card View')} />
          </Link>
          <Link href="/admin/dashboard/user/search" passHref>
            <SidebarItem icon={<FaAppleAlt />} label="Search Users" isOpen={isOpen} selected={selectedItem === 'Search Users'} onClick={() => setSelectedItem('Search Users')} />
          </Link>

          {isOpen && <h3 className="text-sm font-medium mt-4 mb-2 text-yellow-400">Policies</h3>}
          <Link href="/admin/dashboard/policy/termsAndCondition" passHref>
            <SidebarItem icon={<GiReturnArrow />} label="Terms & Conditions" isOpen={isOpen} selected={selectedItem === 'Terms & Conditions'} onClick={() => setSelectedItem('Terms & Conditions')} />
          </Link>
          <Link href="/admin/dashboard/policy/privacyPolicy" passHref>
            <SidebarItem icon={<GiReturnArrow />} label="Privacy Policy" isOpen={isOpen} selected={selectedItem === 'Privacy Policy'} onClick={() => setSelectedItem('Privacy Policy')} />
          </Link>
          <Link href="/admin/dashboard/policy/returnPolicy" passHref>
            <SidebarItem icon={<GiReturnArrow />} label="Return Policy" isOpen={isOpen} selected={selectedItem === 'Return Policy'} onClick={() => setSelectedItem('Return Policy')} />
          </Link>
          <Link href="/admin/dashboard/policy/shippingPolicy" passHref>
            <SidebarItem icon={<GiTruck />} label="Shipping Policy" isOpen={isOpen} selected={selectedItem === 'Shipping Policy'} onClick={() => setSelectedItem('Shipping Policy')} />
          </Link>

          {isOpen && <h3 className="text-sm font-medium mt-4 mb-2 text-yellow-400">Account</h3>}
          <Link href="/admin/dashboard/profile" passHref>
            <SidebarItem icon={<ImProfile />} label="Profile" isOpen={isOpen} selected={selectedItem === 'Profile'} onClick={() => setSelectedItem('Profile')} />
          </Link>
          <Link href="/settings" passHref>
            <SidebarItem icon={<FaCog />} label="Settings" isOpen={isOpen} selected={selectedItem === 'Settings'} onClick={() => setSelectedItem('Settings')} />
          </Link>

          <button
            className="mt-6 flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-red-700 shadow-md"
            onClick={handleLogout}
          >
            <MdOutlineLogout className="h-5 w-5" aria-hidden="true" />
            {isOpen && <span className="ml-2">Logout</span>}
          </button>
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
        selected ? "bg-gray-800" : "hover:bg-gray-800"
      }`}
    >
      <div className="text-xl">{icon}</div>
      {isOpen && <span className="font-medium">{label}</span>}
    </motion.div>
  );
};

export default SidebarAdmin;
