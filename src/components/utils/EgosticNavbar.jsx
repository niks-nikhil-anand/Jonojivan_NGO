"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../Frontend/Shared/Navbar';

const EgoisticNavbar = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin/dashboard');
  const isAgentPage = pathname.startsWith('/admin/agents');
//   const isUserPage = pathname.startsWith('/user');
//   const isBranchPage = pathname.startsWith('/branch');

  if (isAdminPage || isAgentPage ) {
    return null; 
  }

  return <Navbar />;
};

export default EgoisticNavbar;
