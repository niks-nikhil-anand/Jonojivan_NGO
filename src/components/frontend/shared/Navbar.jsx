"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import logo from "../../../../public/logo/logo.jpg";
import CustomDonationForm from "../ui/CustomDonationForm";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/aboutUs", label: "About Us" },
    { href: "/how-we-work", label: "How We Work" },
    { href: "/ourProgram", label: "Our Program" },
    { href: "/impactStories", label: "Impact Stories" },
    { href: "/contactUs", label: "Contact Us" },
  ];

  const handleDonateClick = (e) => {
    e.preventDefault();
    setIsDonationFormOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <nav className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Plan to Empower Logo"
                width={200}
                height={100}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "hover:bg-green-100 hover:text-green-700 transition-colors duration-200"
                        )}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Donate Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block"
            >
              <Button
                onClick={handleDonateClick}
                className="bg-[#e91e63] hover:bg-[#d81b60] text-white shadow-md"
              >
                <span>Donate Now</span>
                <Heart className="h-4 w-4 fill-current ml-2" />
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-gray-100 transition-colors"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-white border-l border-border"
              >
                {/* Close Button */}
                <div className="absolute right-4 top-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:bg-gray-100 transition-colors rounded-full"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <SheetHeader className="pt-8">
                  <SheetTitle className="flex items-center ">
                    <Image src={logo} alt="Logo" width={140} height={140} />
                  </SheetTitle>
                  <SheetDescription>
                    Empowering communities through sustainable development
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                  {/* Mobile Menu Items */}
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.href}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className="block py-3 px-3 text-lg font-medium hover:text-green-700 hover:bg-green-50 rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Donate Button */}
                  <motion.div whileTap={{ scale: 0.95 }} className="pt-4">
                    <Button
                      onClick={handleDonateClick}
                      className="w-full bg-[#e91e63] hover:bg-[#d81b60] text-white shadow-md"
                    >
                      <span>Donate Now</span>
                      <Heart className="h-4 w-4 fill-current ml-2" />
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
