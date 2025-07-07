"use client";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { HiMoon, HiSun } from "react-icons/hi";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "../../../public/logo/Smile.png";
import { toast } from "react-hot-toast";
import { MdOutlineLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const NavItems = () => (
    <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
      <Button
        variant="ghost"
        className="flex items-center space-x-2 hover:bg-primary/10"
      >
        <FaHome className="text-lg" />
        <span>Dashboard</span>
      </Button>
    </div>
  );

  return (
    <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Heading */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-foreground">
              Jonojivan Foundation
            </h1>
            <Badge variant="secondary" className="text-xs w-fit">
              empowering lives
            </Badge>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          <NavItems />
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="flex items-center space-x-2 w-full justify-start bg-red-500 hover:bg-red-700 transition-colors duration-300"
          >
            <MdOutlineLogout className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10"
              >
                <IoIosMenu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={logo} alt="Jonojivan Foundation Logo" />
                    <AvatarFallback>JF</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">
                      Jonojivan Foundation
                    </h2>
                    <Badge variant="secondary" className="text-xs w-fit">
                      empowering lives
                    </Badge>
                  </div>
                </div>
                <NavItems />
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="flex items-center space-x-2 w-full justify-start bg-red-500 hover:bg-red-700 transition-colors duration-300"
                >
                  <MdOutlineLogout className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
