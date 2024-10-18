import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";
import Image from 'next/image';
import logo from '../../../../public/annimatedIcons/grocery.png';
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const Navbar = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isLearnOpen, setIsLearnOpen] = useState(false);

  const toggleShopDropdown = () => {
    setIsShopOpen(prev => !prev);
    // Close Learn dropdown if it's open
    if (isLearnOpen) {
      setIsLearnOpen(false);
    }
  };

  const toggleLearnDropdown = () => {
    setIsLearnOpen(prev => !prev);
    // Close Shop dropdown if it's open
    if (isShopOpen) {
      setIsShopOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-md w-full p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side - Menu Links */}
        <div className="flex items-center space-x-10 relative z-50">
          {/* Shop Dropdown */}
          <div className="relative">
            <button
              onClick={toggleShopDropdown}
              className="text-lg font-medium hover:text-gray-700 focus:outline-none flex items-center"
            >
              Shop
              {isShopOpen ? <AiOutlineUp className="ml-2" /> : <AiOutlineDown className="ml-2" />}
            </button>
            {isShopOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 mt-4 w-[60rem] bg-white shadow-xl rounded-b-3xl py-10 px-14 flex gap-[10rem] z-50"
                style={{ zIndex: 9999 }}
              >
                {/* Collections, Categories, Health Focus sections */}
                <div>
                  <h3 className="font-bold text-lg mb-3 ml-7">Collections</h3>
                  <ul className="space-y-6">
                    <li className="flex items-center space-x-3">
                      <span>♂</span>
                      <a href="#" className="hover:text-blue-600">Men's Health</a>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span>♀</span>
                      <a href="#" className="hover:text-blue-600">Women's Health</a>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span>🔥</span>
                      <a href="#" className="hover:text-blue-600">Best Sellers</a>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span>🍎</span>
                      <a href="#" className="hover:text-blue-600">New Products</a>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span>📦</span>
                      <a href="#" className="hover:text-blue-600">All Products</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3 ml-7">Categories</h3>
                  <ul className="space-y-6">
                    <li className="flex items-center space-x-3">
                      <span>🍬</span>
                      <a href="#" className="hover:text-blue-600">Gummies</a>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span>💧</span>
                      <a href="#" className="hover:text-blue-600">Liquids</a>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span>🧂</span>
                      <a href="#" className="hover:text-blue-600">Powders</a>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span>💊</span>
                      <a href="#" className="hover:text-blue-600">Capsules</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3 ml-7">Health Focus</h3>
                  <ul className="space-y-6">
                    <li className="flex items-center space-x-3">
                      <span>🛡️</span>
                      <a href="#" className="hover:text-blue-600">Immunity</a>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span>⚛️</span>
                      <a href="#" className="hover:text-blue-600">Mind + Mood</a>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span>🌟</span>
                      <a href="#" className="hover:text-blue-600">Beauty</a>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span>🏋️‍♂️</span>
                      <a href="#" className="hover:text-blue-600">Active Line</a>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>

          {/* Learn Dropdown */}
          <div className="relative">
            <button
              onClick={toggleLearnDropdown}
              className="text-lg font-medium hover:text-gray-700 focus:outline-none flex items-center"
            >
              Learn
              {isLearnOpen ? <AiOutlineUp className="ml-2" /> : <AiOutlineDown className="ml-2" />}
            </button>
            {isLearnOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 mt-4 w-[20rem] bg-white shadow-xl rounded-b-3xl py-5 px-5 z-50"
                style={{ zIndex: 9999 }}
              >
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <span>📖</span>
                    <a href="#" className="hover:text-blue-600">About Us</a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span>❓</span>
                    <a href="#" className="hover:text-blue-600">FAQs</a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span>📝</span>
                    <a href="#" className="hover:text-blue-600">Wellness Blog</a>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>

          <a href="#" className="text-lg font-medium hover:text-gray-700">Rewards</a>
          <a href="#" className="text-lg font-medium hover:text-gray-700">Take Quiz</a>
        </div>

        {/* Center - Logo */}
        <div className="flex justify-center relative z-50">
          <h1 className="font-bold text-xl">BlushBelle</h1>
        </div>

        {/* Right Side - Icons */}
        <div className="flex items-center space-x-6 relative z-50">
          <FiSearch className="w-6 h-6 cursor-pointer" />
          <FiUser className="w-6 h-6 cursor-pointer" />
          <FiShoppingBag className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
