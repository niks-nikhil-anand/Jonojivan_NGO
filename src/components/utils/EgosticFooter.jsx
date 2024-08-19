"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from '../frontend/shared/Footer';


const EgoisticFooter = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin/dashboard');
  const isAgentPage = pathname.startsWith('/admin/agents');
//   const isUserPage = pathname.startsWith('/user');
//   const isBranchPage = pathname.startsWith('/branch');

  if (isAdminPage || isAgentPage) {
    return null; 
  }

  return <Footer />;
};

export default EgoisticFooter;
