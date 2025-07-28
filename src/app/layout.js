import { Inter } from "next/font/google";
import "./globals.css";
import EgoisticNavbar from "@/components/utils/EgosticNavbar";
import EgoisticFooter from "@/components/utils/EgosticFooter";
import Script from "next/script";
import UnderMaintenance from "@/components/frontend/ui/UnderMaintenance";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jonojivan | Empower Lives Through Your Donation",
  description:
    "Jonojivan is dedicated to improving lives by supporting education, healthcare, and essential needs for underserved communities. Your contribution can make a real difference—donate today. Jonojivan Gramin Vikash Foundation also advocates for Human Rights & Anti-Corruption, protecting fundamental rights and promoting transparency.",
  keywords:
    "Jonojivan, jonojivan.org, donate, NGO, charity, nonprofit, support education, healthcare access, feed the poor, empower communities, India NGO, social welfare, humanitarian aid, donation platform",
  author: "Jonojivan Team",
  robots: "index, follow",
  openGraph: {
    title: "Jonojivan | Empower Lives Through Your Donation",
    type: "website",
    url: "https://jonojivan.org",
    description:
      "Join Jonojivan in creating positive change by supporting education, healthcare, and basic needs for those in need. Your donation brings hope and transformation.",
    images: [
      {
        url: "/logo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jonojivan - Empowering Lives with Every Donation",
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
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
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
            <Script
              src="https://checkout.razorpay.com/v1/checkout.js"
              strategy="lazyOnload"
            />
          </>
        )}
      </body>
    </html>
  );
}
