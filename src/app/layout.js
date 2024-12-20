import { Inter } from "next/font/google";
import "./globals.css";
import toast, { Toaster } from 'react-hot-toast';
import ogImage from '../../public/logo/og-image.jpg'; // Local image import
import EgoisticNavbar from "@/components/utils/EgosticNavbar";
import EgoisticFooter from "@/components/utils/EgosticFooter";
import Script from 'next/script'
import UnderMaintenance from "@/components/frontend/ui/UnderMaintenance";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bring Smile Foundation | Empowering Lives, One Smile at a Time",
  description:
    "Join Bring Smile Foundation in its mission to transform lives through education, healthcare, and community support. Together, we can create a brighter future and bring smiles to millions.",
  keywords:
    "Bring Smile Foundation, charity, nonprofit, education, healthcare, community support, empowerment, donations, social impact",
  author: "Bring Smile Foundation Team",
  robots: "index, follow",
  openGraph: {
    title: "Bring Smile Foundation - Empowering Lives, One Smile at a Time",
    type: "website",
    url: "https://www.bringsmile.in", // Update this URL as needed
    description:
      "Support Bring Smile Foundation in empowering underprivileged communities through impactful initiatives. Together, we can make a difference.",
    images: [
      {
        url: "/public/logo/og-image.jpg", // Adjust this path as necessary
        width: 1200,
        height: 630,
        alt: "Bring Smile Foundation - Empowering Lives",
      },
    ],
  },
};

// Toggle this flag to enable/disable the maintenance mode
const isUnderMaintenance = true;



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content={metadata.robots} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
      </head>
      <body className={inter.className}>
      {isUnderMaintenance ? (
          <UnderMaintenance />
        ) : (
          <>
            <EgoisticNavbar />
            {children}
            <EgoisticFooter />
            <Toaster />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
          </>
        )}
      </body>
    </html>
  );
}