"use client";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Calendar,
  Shield,
  Building,
  QrCode,
  Download,
  Mail,
  Phone,
  MapPin,
  RotateCcw,
  FileText,
} from "lucide-react";

// Using jsPDF for proper PDF generation
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Image from "next/image";

const CONTACTS = [
  {
    icon: <Phone className="inline h-4 w-4 mr-1" />,
    text: "+91-1800-XXX-XXXX",
  },
  {
    icon: <Mail className="inline h-4 w-4 mr-1" />,
    text: "help@jonojivan.org",
  },
  { icon: <MapPin className="inline h-4 w-4 mr-1" />, text: "Ujjain, India" },
];

const TERMS_AND_CONDITIONS = [
  "Carry the ID card at all times during working hours for identification purposes.",
  "The ID card is strictly for official use and should not be shared or used for unauthorized purposes.",
];

const CONTACT_DETAILS = {
  headquarters: {
    title: "Jonojivan Gramin Vikash  Foundation",
    address: "Uttar Khatowal, PO- Uttar Khatowal",
    location: "PS- Rupahihat, Nagaon - 782124",
    state: " Assam, India",
  },
  communication: {
    email: "help@jonojivan.org",
    phone: "+91 8133997722",
    website: "www.jonojivan.in",
    whatsapp: "+91 9435266783",
  },
  office_hours: {
    weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
    saturday: "Saturday: 9:00 AM - 1:00 PM",
    sunday: "Sunday: Closed (Emergency only)",
  },
};

function getStatusClass(status) {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border-green-200";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Suspended":
      return "bg-red-100 text-red-800 border-red-200";
    case "Inactive":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export default function IDCard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBack, setShowBack] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const res = await fetch("/api/member/auth/memberAuthToken", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const member = await res.json();
          setUserData({
            name: member.user?.fullName || "N/A",
            email: member.user?.email || "N/A",
            avatar: member.profileImage || member.user?.profilePic || "",
            membershipId: member.membershipId,
            membershipStatus: member.membershipStatus,
            committee: member.committee,
            post: member.post,
            district: member.district,
            state: member.state,
            phone: member.user?.mobileNumber,
            issueDate: new Date(member.registrationDate).toLocaleDateString(),
            validUntil: member.validUntil || "08/25/2030",
            qrStr: `${member.user?.fullName || ""}\nID: ${
              member.membershipId || ""
            }\nPhone: ${member.user?.mobileNumber || ""}\nCommittee: ${
              member.committee || ""
            }`,
          });
        } else {
          toast.error("Unauthorized or not logged in");
        }
      } catch {
        toast.error("Could not fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const qrCodeUrl = userData
    ? `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
        userData.qrStr
      )}`
    : "";

  const handleDownloadPDF = async () => {
    if (!frontCardRef.current || !backCardRef.current || !userData) {
      toast.error("Card not ready for download");
      return;
    }

    setIsGeneratingPDF(true);
    toast.loading("Generating PDF...");

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [420, 620], // Slightly larger for better spacing
      });

      // Capture front side with padding
      const frontCanvas = await html2canvas(frontCardRef.current, {
        scale: 4, // Higher scale for better quality
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        width: frontCardRef.current.offsetWidth + 40, // Add padding
        height: frontCardRef.current.offsetHeight + 40,
        x: -20, // Center with padding
        y: -20,
      });

      // Capture back side with padding
      const backCanvas = await html2canvas(backCardRef.current, {
        scale: 4, // Higher scale for better quality
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        width: backCardRef.current.offsetWidth + 40, // Add padding
        height: backCardRef.current.offsetHeight + 40,
        x: -20, // Center with padding
        y: -20,
      });

      // Add front side to PDF with proper spacing
      const frontImgData = frontCanvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(frontImgData, "JPEG", 20, 20, 380, 580); // 20pt margin on all sides

      // Add new page for back side
      pdf.addPage();
      const backImgData = backCanvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(backImgData, "JPEG", 20, 20, 380, 580); // 20pt margin on all sides

      // Save the PDF
      pdf.save(`JonojivanID-${userData.membershipId || "member"}.pdf`);

      toast.dismiss();
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.dismiss();
      toast.error("Failed to generate PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const IDCardFront = ({ userData, qrCodeUrl }) => (
    <div
      ref={frontCardRef}
      className="w-[380px] h-[580px] flex flex-col rounded-2xl shadow-2xl border border-blue-300 overflow-hidden bg-white relative mx-auto"
      style={{
        padding: 0,
        background: "linear-gradient(135deg,#ddeeff 0%,#f8fafc 80%)",
      }}
    >
      <div className="flex items-center justify-center bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 h-[80px] px-6 py-3 text-white">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-md mr-4">
          <img
            src="/logo/logo.png"
            alt="JonoJivan Gramin Vikash Foundation Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>{" "}
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-wide">
            Jonojivan Foundation
          </h1>
          <p className="font-light text-xs uppercase tracking-widest">
            Gramin Vikash
          </p>
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col px-8 pt-6 pb-4">
        {/* Profile Picture */}

        <div className="flex items-center justify-between mb-4 px-6">
          <div className="border-4 border-blue-300 rounded-full w-24 h-24 bg-white flex items-center justify-center shadow-lg overflow-hidden">
            {userData.avatar ? (
              <img
                src={userData.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-14 h-14 text-blue-200" />
            )}
          </div>
          <div className="flex flex-col ml-4 flex-1">
            <h3 className="text-lg font-extrabold tracking-wide text-gray-800">
              {userData.name}
            </h3>
            <Badge
              className={`inline-flex gap-1 ${getStatusClass(
                userData.membershipStatus
              )} py-1 px-4 text-xs font-semibold border`}
            >
              <Shield className="w-4 h-4 -mt-0.5" />
              {userData.membershipStatus}
            </Badge>
          </div>
        </div>

        {/* Member Details */}
        <div className="my-4 text-sm text-gray-700 space-y-2">
          <div className="grid grid-cols-1 gap-y-2">
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="font-bold">ID:</span>
              <span className="text-right">{userData.membershipId}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="font-bold">Email:</span>
              <span className="text-right text-xs">{userData.email}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="font-bold">Phone:</span>
              <span className="text-right">{userData.phone}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="font-bold">District:</span>
              <span className="text-right">{userData.district}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="font-bold">State:</span>
              <span className="text-right">{userData.state}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="font-bold">Post:</span>
              <span className="text-right">{userData.post}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="font-bold">Committee:</span>
              <span className="text-right">{userData.committee}</span>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 mb-4 gap-2">
          <span className="flex items-center gap-1 text-xs text-gray-600">
            <Calendar className="w-4 h-4 text-blue-500" />
            Issue: {userData.issueDate}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-600">
            <Calendar className="w-4 h-4 text-blue-500" />
            Valid: {userData.validUntil}
          </span>
        </div>

        {/* QR Code Section */}
      </CardContent>

      {/* Footer */}
      <div className="w-full text-center text-[11px] text-gray-500 px-4  bg-blue-50 border-t border-blue-200">
        © {new Date().getFullYear()} Jonojivan Foundation. All rights reserved.
      </div>
    </div>
  );

  const IDCardBack = ({ userData }) => (
    <div
      ref={backCardRef}
      className="w-[380px] h-[580px] flex flex-col rounded-2xl shadow-2xl border border-blue-300 overflow-hidden bg-white relative mx-auto"
      style={{
        padding: 0,
        background: "linear-gradient(135deg,#f8fafc 0%,#ddeeff 80%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-center bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 h-[80px] px-6 py-3 text-white">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-md mr-4">
          <img
            src="/logo/logo.png"
            alt="JonoJivan Gramin Vikash Foundation Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>{" "}
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-wide">
            TERMS & CONDITIONS
          </h1>
          <p className="font-light text-xs uppercase tracking-widest">
            Membership Guidelines
          </p>
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col px-8 pt-6 pb-4">
        {/* Terms and Conditions */}
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-800 mb-3 text-center border-b border-gray-300 pb-2">
              MEMBERSHIP TERMS & CONDITIONS
            </h3>
          </div>

          <div className="space-y-2.5 text-[9px] text-gray-700 leading-relaxed">
            {TERMS_AND_CONDITIONS.map((term, index) => (
              <div
                key={index}
                className="flex items-start border-b border-gray-100 pb-1.5"
              >
                <span className="font-bold text-blue-600 mr-2 mt-0.5 text-[8px] bg-blue-100 rounded-full w-4 h-4 flex items-center justify-center">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{term}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-4 border-t border-gray-300 pt-4">
          <h4 className="text-[11px] font-bold text-gray-800 mb-3 text-center">
            CONTACT INFORMATION
          </h4>

          {/* Headquarters */}
          <div className="mb-3 p-2 bg-gray-50 rounded border">
            <h5 className="text-[10px] font-bold text-blue-700 mb-1">
              {CONTACT_DETAILS.headquarters.title}
            </h5>
            <div className="text-[9px] text-gray-600 leading-tight">
              <div>{CONTACT_DETAILS.headquarters.address}</div>
              <div>{CONTACT_DETAILS.headquarters.location}</div>
              <div>{CONTACT_DETAILS.headquarters.state}</div>
            </div>
          </div>

          {/* Communication Details */}
          <div className="grid grid-cols-1 gap-1.5 text-[9px] text-gray-600 mb-3">
            <div className="flex items-center">
              <Mail className="w-3 h-3 mr-2 text-blue-500" />
              <span className="font-medium">Email:</span>
              <span className="ml-1">
                {CONTACT_DETAILS.communication.email}
              </span>
            </div>
            <div className="flex items-center">
              <Phone className="w-3 h-3 mr-2 text-blue-500" />
              <span className="font-medium">Phone:</span>
              <span className="ml-1">
                {CONTACT_DETAILS.communication.phone}
              </span>
            </div>
            <div className="flex items-center">
              <QrCode className="w-3 h-3 mr-2 text-blue-500" />
              <span className="font-medium">Website:</span>
              <span className="ml-1">
                {CONTACT_DETAILS.communication.website}
              </span>
            </div>
            <div className="flex items-center">
              <Phone className="w-3 h-3 mr-2 text-green-500" />
              <span className="font-medium">WhatsApp:</span>
              <span className="ml-1">
                {CONTACT_DETAILS.communication.whatsapp}
              </span>
            </div>
          </div>

          {/* Office Hours */}
          <div className="text-center">
            <h5 className="text-[10px] font-bold text-gray-700 mb-1">
              OFFICE HOURS
            </h5>
            <div className="text-[8px] text-gray-500 leading-tight">
              <div>{CONTACT_DETAILS.office_hours.weekdays}</div>
              <div>{CONTACT_DETAILS.office_hours.saturday}</div>
              <div className="text-red-500 font-medium">
                {CONTACT_DETAILS.office_hours.sunday}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <div className="w-full text-center text-[10px] text-gray-500 px-4 py-2 bg-blue-50 border-t border-blue-200">
        <div className="mb-1">
          <span className="font-bold">Member ID:</span> {userData?.membershipId}
        </div>
        <div>
          © {new Date().getFullYear()} Jonojivan Foundation. All rights
          reserved.
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-100 py-16 px-6 relative">
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[90vh] py-16">
          <div className="space-y-8">
            <div>
              <div className="text-center mb-4">
                <Skeleton className="h-6 w-24 mx-auto mb-2" />
              </div>
              <Skeleton className="w-[380px] h-[580px] rounded-2xl" />
            </div>
            <div>
              <div className="text-center mb-4">
                <Skeleton className="h-6 w-24 mx-auto mb-2" />
              </div>
              <Skeleton className="w-[380px] h-[580px] rounded-2xl" />
            </div>
          </div>
          <Skeleton className="h-12 w-80 mt-8" />
        </div>
      )}

      {!loading && userData && (
        <>
          <div className="flex flex-col lg:flex-row justify-center w-full gap-8">
            {/* Front Side */}
            <div className="flex-1 max-w-[380px]">
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">FRONT SIDE</h2>
              </div>
              <IDCardFront userData={userData} qrCodeUrl={qrCodeUrl} />
            </div>

            {/* Back Side */}
            <div className="flex-1 max-w-[380px]">
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">BACK SIDE</h2>
              </div>
              <IDCardBack userData={userData} />
            </div>
          </div>

          <div className="flex justify-center gap-4 my-10">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-semibold rounded-xl shadow hover:bg-green-800 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              {isGeneratingPDF ? "Generating..." : "Download PDF"}
            </button>
          </div>

          {/* Remove the hidden elements section since both sides are now visible */}
        </>
      )}
    </div>
  );
}
