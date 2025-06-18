import { Inter } from "next/font/google";
import "./globals.css";
import EgoisticNavbar from "@/components/utils/EgosticNavbar";
import EgoisticFooter from "@/components/utils/EgosticFooter";
import Script from 'next/script'
import UnderMaintenance from "@/components/frontend/ui/UnderMaintenance";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Plan to Empower | Bring Change with Every Donation",
  description:
    "Plan to Empower is committed to transforming lives by supporting education, healthcare, and basic needs for underprivileged communities. Be the change—donate today and make a lasting impact.",
  keywords:
    "Plan to Empower, plantoempower.org, donate, NGO, charity, nonprofit organization, education for all, healthcare access, basic needs, help the poor, empower communities, India NGO, social impact, humanitarian aid",
  author: "Plan to Empower Team",
  robots: "index, follow",
  openGraph: {
    title: "Plan to Empower | Bring Change with Every Donation",
    type: "website",
    url: "https://plantoempower.org",
    description:
      "Support Plan to Empower in uplifting lives through donations for education, healthcare, and basic needs. Together, we can create a better tomorrow.",
    images: [
      {
        url: "/logo/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Plan to Empower - Uplifting Lives",
      },
    ],
  },
};

const isUnderMaintenance = false;



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