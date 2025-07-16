"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../frontend/shared/Navbar';

const EgoisticNavbar = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin/dashboard');
  const isVendorPage = pathname.startsWith('/volunteer');
  const isUserPage = pathname.startsWith('/user');


  if (isAdminPage || isUserPage || isVendorPage ) {
    return null; 
  }

  return <Navbar />;
};

export default EgoisticNavbar;
