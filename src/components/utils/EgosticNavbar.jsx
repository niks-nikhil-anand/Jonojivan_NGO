"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../frontend/shared/Navbar';

const EgoisticNavbar = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin/dashboard');
  const isMemberPage = pathname.startsWith('/member');


  if (isAdminPage || isMemberPage  ) {
    return null; 
  }

  return <Navbar />;
};

export default EgoisticNavbar;
