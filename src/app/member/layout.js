"use client";

import { useState } from "react";
import 'tailwindcss/tailwind.css';
import '@/app/globals.css';
import SidebarVolunteer from '@/components/volunteer/SidebarVolunteer';
import NavbarVolunteer from '@/components/volunteer/NavbarVolunteer';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex w-full min-h-screen overflow-hidden bg-gray-50">
      {/* Sidebar with mobile menu props */}
      <SidebarVolunteer 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar with mobile menu toggle */}
        <NavbarVolunteer 
          onMobileMenuToggle={handleMobileMenuToggle}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
