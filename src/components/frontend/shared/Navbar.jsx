"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Heart, Sparkles, FileText, LogIn } from "lucide-react";
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
import { FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/aboutUs", label: "Certification" },
    { href: "/how-we-work", label: "Our Projects" },
    { href: "/jonojivan-garib-kalyan", label: "Jonojivan Garib Kalyan" },
    { href: "/become-member", label: "Become a member" },
    { href: "/mediaGallery", label: "Press/Media Gallery" },
  ];

  const DesktopmenuItems = [
    { href: "/", label: "Home" },
    { href: "/aboutUs", label: "Certification" },
    { href: "/how-we-work", label: "Our Projects" },
    { href: "/impactStories", label: "Id Card Download" },
    { href: "/mediaGallery", label: "Press/Media Gallery" },
  ];

  const handleDonateClick = (e) => {
    e.preventDefault();
    setIsDonationFormOpen(true);
    setIsMenuOpen(false);
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
              {/* Logo inserted here */}
              <div className="mr-3 flex items-center">
                <Image
                  src="/logo/logo.png"
                  alt="JonoJivan Gramin Vikash Foundation Logo"
                  width={36} // Adjust size as desired
                  height={36}
                  className="rounded-full bg-white" // Optional: for circular or white background
                  priority
                />
              </div>
              <div className="ml-3">
                <h1 className="font-bold text-sm md:text-base text-blue-700">
                  JonoJivan Gramin Vikash Foundation
                </h1>
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
                {DesktopmenuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <NavigationMenuItem>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 rounded-full hover:text-blue-700 hover:bg-blue-50/80 group">
                          <span className="relative z-10">{item.label}</span>
                          {/* Hover effect background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </motion.div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions - Desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            {/* Desktop Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Sign In Button - Desktop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/auth/member-signIn">
                  <Button
                    variant="outline"
                    className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-full px-5 py-2.5 font-medium transition-all duration-300 shadow-sm hover:shadow-md group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center">
                      <LogIn className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      Sign In
                    </span>
                  </Button>
                </Link>
              </motion.div>

              {/* Become Member Button - Desktop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/become-member">
                  <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-full px-5 py-2.5 font-medium transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center">
                      Become Member
                    </span>
                  </Button>
                </Link>
              </motion.div>

              {/* Desktop Donate Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleDonateClick}
                  className="relative bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full px-6 py-2.5 font-semibold overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                  <span className="relative z-10 flex items-center">
                    <Heart className="h-4 w-4 fill-current mr-2 group-hover:animate-pulse" />
                    Donate Now
                    <Sparkles className="h-3 w-3 ml-2 group-hover:animate-spin" />
                  </span>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-all duration-300 rounded-full p-2 hover:bg-blue-100"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[350px] sm:w-[400px] bg-gradient-to-br from-blue-50 via-white to-blue-50 border-l border-blue-100/50 p-0"
              >
                {/* Enhanced Close Button - Fixed positioning */}
                <div className="absolute right-4 top-4 z-50">
                  <motion.div
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMenuOpen(false)}
                      className="h-10 w-10 hover:bg-blue-100 transition-colors rounded-full shadow-lg bg-white/80 backdrop-blur-sm border border-blue-100"
                    >
                      <X className="h-5 w-5 text-gray-700" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </motion.div>
                </div>

                <div className="h-full flex flex-col p-6">
                  <SheetHeader className="pt-4 pb-6">
                    <SheetTitle className="flex items-center justify-center">
                      <div className="text-center">
                        {/* Logo placed above the icon */}
                        <Image
                          src="/logo/logo.png"
                          alt="JonoJivan Gramin Vikash Foundation Logo"
                          width={64} // Adjust size as needed
                          height={64}
                          className="mx-auto mb-2"
                          priority
                        />
                        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                          JonoJivan Gramin Vikash Foundation
                        </h2>
                      </div>
                    </SheetTitle>
                    <SheetDescription className="text-center text-gray-600 font-medium text-xs">
                      Empowering communities through sustainable development
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto">
                    {/* Mobile Menu Items */}
                    <div className="space-y-2 mb-8">
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
                            className="block py-3 px-4 text-base font-medium text-gray-700 hover:text-blue-700 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200/50 hover:bg-white/70 hover:shadow-sm"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Enhanced Mobile Action Buttons Section */}
                    <div className="space-y-4 pt-4 border-t border-blue-100">
                      <h3 className="text-sm font-semibold text-gray-600 text-center mb-6">
                        Quick Actions
                      </h3>

                      {/* Mobile Donate Button - Primary Action */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={handleDonateClick}
                          className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl py-4 font-bold text-lg relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                          <span className="relative z-10 flex items-center justify-center">
                            <Heart className="h-5 w-5 fill-current mr-3 animate-pulse" />
                            Donate Now
                            <Sparkles className="h-4 w-4 ml-3 group-hover:animate-spin" />
                          </span>
                        </Button>
                      </motion.div>

                      {/* Mobile Apply for Jonojivan Garib Kalyan Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link href="/jonojivan-garib-kalyan" passHref>
                          <Button
                            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-3.5 font-semibold text-base group relative overflow-hidden"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center justify-center">
                              <FileText className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                              Apply for Jono Garib Kalyan
                            </span>
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link href="https://wa.link/hlyxrs" passHref>
                          <Button
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-3.5 font-semibold text-base group relative overflow-hidden"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {/* Subtle hover overlay */}
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Button Content */}
                            <span className="relative z-10 flex items-center justify-center">
                              <FaWhatsapp className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                              Chat on whatsapp
                            </span>
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link href="/auth/member-signIn" passHref>
                          <Button
                            className="w-full border-2 border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-3.5 font-semibold text-base group relative overflow-hidden"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center justify-center">
                              <LogIn className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                              Sign In
                            </span>
                          </Button>
                        </Link>
                      </motion.div>

                      {/* Additional Info Section */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="mt-8 pt-6 border-t border-blue-100"
                      >
                        <div className="text-center space-y-3">
                          <p className="text-xs text-gray-500 font-medium">
                            Need help? Contact us
                          </p>
                          <div className="flex flex-col space-y-3">
                            {/* Phone Contact */}
                            <span className="text-xs text-blue-600 font-semibold">
                              📞 +91 94352 66783
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
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
