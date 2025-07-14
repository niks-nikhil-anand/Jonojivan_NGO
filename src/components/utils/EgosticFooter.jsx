"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from '../frontend/shared/Footer';
import FooterBanner from '../frontend/ui/FooterBanner';

const EgoisticFooter = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin/dashboard');
  const isVendorPage = pathname.startsWith('/vendor/dashboard');
  const isUserPage = pathname.startsWith('/user');

  if (isAdminPage || isUserPage || isVendorPage ) {
    return null; 
  }

  return (
    <>
      <FooterBanner />
      <Footer />
    </>
  );
};

export default EgoisticFooter;