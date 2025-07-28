"use client";

import React, { useEffect, useState, useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AppointmentLetter = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const letterRef = useRef(null);

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
            validUntil: member.validUntil || "---",
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

  const downloadPDF = async () => {
    if (!letterRef.current) return;
    
    // Create a clone of the element for PDF generation
    const originalElement = letterRef.current;
    const clonedElement = originalElement.cloneNode(true);
    
    // Apply A4-specific styles to the cloned element
    clonedElement.style.width = '210mm';
    clonedElement.style.height = 'auto';
    clonedElement.style.maxWidth = '210mm';
    clonedElement.style.aspectRatio = '210/297';
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.top = '0';
    clonedElement.style.background = '#ffffff';
    
    // Apply desktop-like styling to ensure consistent PDF output
    const cardContent = clonedElement.querySelector('[class*="CardContent"]') || clonedElement;
    if (cardContent) {
      cardContent.style.padding = '24px'; // equivalent to px-6
      cardContent.style.fontSize = '14px'; // equivalent to text-sm
      cardContent.style.lineHeight = '1.25'; // equivalent to leading-5
    }
    
    // Ensure all text elements use desktop sizing
    const textElements = clonedElement.querySelectorAll('p, div, span, li, h1');
    textElements.forEach(el => {
      const computedStyle = window.getComputedStyle(el);
      if (computedStyle.fontSize) {
        // Convert mobile text sizes to desktop equivalents
        if (el.tagName === 'H1') {
          el.style.fontSize = '18px'; // lg:text-lg
        } else if (el.classList.contains('text-xs')) {
          el.style.fontSize = '12px';
        } else {
          el.style.fontSize = '14px'; // lg:text-sm
        }
      }
    });
    
    // Adjust icon sizes for PDF
    const icons = clonedElement.querySelectorAll('svg');
    icons.forEach(icon => {
      icon.style.width = '12px';
      icon.style.height = '12px';
    });
    
    // Append to document temporarily
    document.body.appendChild(clonedElement);
    
    try {
      // Generate canvas with higher quality settings
      const canvas = await html2canvas(clonedElement, { 
        scale: 3, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI (210mm)
        height: 1123, // A4 height in pixels at 96 DPI (297mm)
        logging: false,
        onclone: (clonedDoc) => {
          // Additional styling adjustments in the cloned document
          const clonedBody = clonedDoc.body;
          clonedBody.style.margin = '0';
          clonedBody.style.padding = '0';
        }
      });
      
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      
      // A4 dimensions in mm
      const PDF_WIDTH = 210;
      const PDF_HEIGHT = 297;
      
      // Add image to PDF with exact A4 dimensions
      pdf.addImage(imgData, "PNG", 0, 0, PDF_WIDTH, PDF_HEIGHT);
      pdf.save("appointment-letter.pdf");
      
    } finally {
      // Clean up - remove the cloned element
      document.body.removeChild(clonedElement);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-4">
      {/* Main container with letter and button side by side */}
      <div className="flex lg:flex-row flex-col lg:gap-4 gap-6 lg:items-start items-center w-full max-w-4xl">
        {/* Letter container */}
        <div
          ref={letterRef}
          className="w-full lg:max-w-3xl max-w-full lg:h-[90vh] h-[130vh] sm:h-[85vh] border border-gray-300 rounded-lg shadow-lg bg-white overflow-hidden"
          style={{ aspectRatio: 'auto lg:210/297' }} // A4 ratio only on desktop
        >
          <Card className="h-full border-none shadow-none">
            <CardContent className="h-full p-0 flex flex-col">
              {/* Header with date only */}
              <div className="lg:px-6 px-4 lg:pt-4 pt-3 lg:pb-2 pb-1">
                <div className="lg:text-xs text-xs text-gray-600">
                  Date:{" "}
                  <span className="font-medium">
                    {userData ? userData.issueDate : ""}
                  </span>
                </div>
              </div>

              {/* Main content area */}
              <div className="flex-1 lg:px-6 px-4 lg:pb-4 pb-3 flex flex-col">
                {/* Address section */}
                <div className="space-y-0.5 lg:mb-3 mb-2">
                  <p className="font-semibold lg:text-sm text-sm">To,</p>
                  <p className="lg:text-sm text-sm">{userData ? userData.name : "Umesh Gehlot"}</p>
                  <p className="lg:text-sm text-sm">Flat No AO-1/02, Anubhuti Apartments,</p>
                  <p className="lg:text-sm text-sm">Sitapur Road, Sector CS, Daliganj,</p>
                  <p className="lg:text-sm text-sm">Ujjain</p>
                </div>

                {/* Subject */}
                <h1 className="lg:text-lg text-base font-bold text-center lg:mb-4 mb-3">
                  Subject: Letter of Appointment
                </h1>

                {/* Letter content */}
                <div className="flex-1 space-y-2.5 text-justify lg:text-sm text-sm lg:leading-5 leading-relaxed overflow-y-auto">
                  <p>Dear {userData ? userData.name : "Mr. Umesh Gehlot"},</p>
                  <p>
                    We are delighted to extend this formal appointment letter and
                    welcome you as a valuable member of the{" "}
                    <strong>Jonojivan Foundation</strong>.
                  </p>
                  <p>
                    Your dedication to community service and your passion for
                    contributing to meaningful causes align perfectly with our
                    mission. We are confident that your association with us will
                    significantly strengthen our collective efforts toward societal
                    transformation.
                  </p>
                  <p>
                    As a member of the Jonojivan Foundation, you will have the
                    opportunity to actively participate in our initiatives, events,
                    and developmental projects. Your insights and efforts will play
                    a pivotal role in driving our objectives forward.
                  </p>
                  <p>
                    In addition to your active role, you will enjoy the following
                    benefits:
                  </p>
                  <ul className="list-disc list-inside lg:ml-3 ml-2 space-y-0.5">
                    <li>Access to members-only events and training workshops</li>
                    <li>
                      Networking with a wide range of professionals and social
                      leaders
                    </li>
                    <li>
                      Regular updates through our newsletters and project reports
                    </li>
                    <li>
                      Opportunities for personal and professional development within
                      the organization
                    </li>
                  </ul>
                  <p>
                    We believe in the power of collective action and are truly
                    excited about the contributions you will bring to our mission.
                    Should you have any questions or require assistance, feel free
                    to contact us at:
                  </p>

                  <div className="bg-gray-50 lg:p-3 p-2 rounded-md border lg:text-xs text-xs text-gray-700 space-y-1.5">
                    <p className="flex items-start lg:items-center gap-2">
                      <Mail className="lg:w-3 lg:h-3 w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 lg:mt-0" />
                      <span className="break-all">info@jonojivan.org</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="lg:w-3 lg:h-3 w-4 h-4 text-blue-600 flex-shrink-0" />
                      +91 94352 66783
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="lg:w-3 lg:h-3 w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 lg:mt-0" />
                      <span>Jonojivan Foundation, Uttar Khatowal, PO- Uttar Khatowal, PS-
                      Rupahihat, Nagaon, Assam – 782124</span>
                    </p>
                  </div>

                  <p>
                    Once again, welcome to the Jonojivan Foundation. We look forward
                    to your support, ideas, and active engagement.
                  </p>

                  <p className="font-medium">
                    This Appointment Letter is verified and officially issued by the
                    organization.
                  </p>
                </div>

                {/* Footer signature */}
                <div className="lg:mt-4 mt-3">
                  <p className="font-bold lg:text-sm text-sm">Warm regards,</p>
                  <p className="lg:text-sm text-sm">Nazrul Islam</p>
                  <p className="lg:text-xs text-xs text-gray-600">President / Founder</p>
                  <p className="lg:text-xs text-xs text-gray-600">Jonojivan Foundation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Download button positioned outside on the right for desktop, below for mobile/tablet */}
        <div className="lg:flex-shrink-0 lg:mt-4 mt-0 w-full lg:w-auto flex justify-center lg:justify-start">
          <button
            className="bg-blue-600 text-white lg:px-4 px-6 lg:py-2 py-3 rounded-lg lg:text-sm text-base font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md lg:w-auto w-full max-w-xs"
            onClick={downloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentLetter;
