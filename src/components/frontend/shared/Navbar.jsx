"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import CustomDonationForm from "../ui/CustomDonationForm";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/aboutUs", label: "Certification" },
    { href: "/how-we-work", label: "Our Projects" },
    { href: "/impactStories", label: "Id Card Download" },
    { href: "/jonojivan-garib-kalyan", label: "Jonojivan Garib Kalyan" },
    { href: "/member", label: "Become a member" },
    { href: "/contactUs", label: "Press/Media Gallery" },
  ];

  const handleDonateClick = (e) => {
    e.preventDefault();
    setIsDonationFormOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 backdrop-blur-md border-b border-blue-100/50 shadow-lg">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        <nav className="relative container flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <div className="absolute -inset-1 bg-blue-500 rounded-full opacity-20 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>
                <div className="relative bg-blue-600 p-2 rounded-full shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <h1 className="font-bold text-2xl text-blue-700">JonoJivan</h1>
                <p className="text-xs text-gray-600 font-medium tracking-wide">
                  Empowering Lives
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <NavigationMenuItem>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 rounded-full hover:text-blue-700 ">
                          <span className="relative z-10">{item.label}</span>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </motion.div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Donate Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block"
            >
              <Button
                onClick={handleDonateClick}
                className="relative bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-2 font-semibold overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center">
                  Donate Now
                  <Heart className="h-4 w-4 fill-current ml-2 group-hover:animate-pulse" />
                </span>
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden transition-all duration-300 rounded-full p-2"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] sm:w-[400px] bg-gradient-to-br from-blue-50 to-blue-100 border-l border-blue-100"
              >
                {/* Close Button */}
                <div className="absolute right-4 top-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:bg-blue-100 transition-colors rounded-full"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>

                <SheetHeader className="pt-8">
                  <SheetTitle className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-blue-600 p-3 rounded-full inline-block mb-3">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-blue-700">
                        JonoJivan
                      </h2>
                    </div>
                  </SheetTitle>
                  <SheetDescription className="text-center text-gray-600 font-medium">
                    Empowering communities through sustainable development
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-8 space-y-3">
                  {/* Mobile Menu Items */}
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <Link
                        href={item.href}
                        className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-blue-700 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200/50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Donate Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileTap={{ scale: 0.95 }}
                    className="pt-6"
                  >
                    <Button
                      onClick={handleDonateClick}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-3 font-semibold"
                    >
                      <span className="flex items-center justify-center">
                        Donate Now
                        <Heart className="h-4 w-4 fill-current ml-2" />
                      </span>
                    </Button>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* Custom Donation Form Modal/Dialog */}
      {isDonationFormOpen && (
        <CustomDonationForm
          isOpen={isDonationFormOpen}
          setIsModalOpen={setIsDonationFormOpen}
        />
      )}
    </>
  );
};

export default Navbar;
