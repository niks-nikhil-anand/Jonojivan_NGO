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
    const canvas = await html2canvas(letterRef.current, { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const PDF_WIDTH = pdf.internal.pageSize.getWidth();
    const PDF_HEIGHT = pdf.internal.pageSize.getHeight();

    const imgProps = {
      width: canvas.width,
      height: canvas.height,
    };
    let pdfWidth = PDF_WIDTH;
    let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    let x = 0, y = 0;

    if (pdfHeight > PDF_HEIGHT) {
      pdfHeight = PDF_HEIGHT;
      pdfWidth = (imgProps.width * pdfHeight) / imgProps.height;
      x = (PDF_WIDTH - pdfWidth) / 2;
      y = 0;
    } else {
      y = (PDF_HEIGHT - pdfHeight) / 2;
      x = 0;
    }

    pdf.addImage(imgData, "PNG", x, y, pdfWidth, pdfHeight);
    pdf.save("appointment-letter.pdf");
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-4">
      {/* Main container with letter and button side by side */}
      <div className="flex gap-4 items-start">
        {/* Letter container */}
        <div
          ref={letterRef}
          className="w-full max-w-3xl h-[90vh] border border-gray-300 rounded-lg shadow-lg bg-white overflow-hidden"
          style={{ aspectRatio: '210/297' }} // A4 ratio
        >
          <Card className="h-full border-none shadow-none">
            <CardContent className="h-full p-0 flex flex-col">
              {/* Header with date only */}
              <div className="px-6 pt-4 pb-2">
                <div className="text-xs text-gray-600">
                  Date:{" "}
                  <span className="font-medium">
                    {userData ? userData.issueDate : ""}
                  </span>
                </div>
              </div>

              {/* Main content area */}
              <div className="flex-1 px-6 pb-4 flex flex-col">
                {/* Address section */}
                <div className="space-y-0.5 mb-3">
                  <p className="font-semibold text-sm">To,</p>
                  <p className="text-sm">{userData ? userData.name : "Umesh Gehlot"}</p>
                  <p className="text-sm">Flat No AO-1/02, Anubhuti Apartments,</p>
                  <p className="text-sm">Sitapur Road, Sector CS, Daliganj,</p>
                  <p className="text-sm">Ujjain</p>
                </div>

                {/* Subject */}
                <h1 className="text-lg font-bold text-center mb-4">
                  Subject: Letter of Appointment
                </h1>

                {/* Letter content */}
                <div className="flex-1 space-y-2.5 text-justify text-sm leading-5">
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
                  <ul className="list-disc list-inside ml-3 space-y-0.5">
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

                  <div className="bg-gray-50 p-3 rounded-md border text-xs text-gray-700 space-y-1.5">
                    <p className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-blue-600 flex-shrink-0" />
                      info@jonojivan.org
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-blue-600 flex-shrink-0" />
                      +91 94352 66783
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-blue-600 flex-shrink-0" />
                      Jonojivan Foundation, Uttar Khatowal, PO- Uttar Khatowal, PS-
                      Rupahihat, Nagaon, Assam – 782124
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
                <div className="mt-4">
                  <p className="font-bold text-sm">Warm regards,</p>
                  <p className="text-sm">Nazrul Islam</p>
                  <p className="text-xs text-gray-600">President / Founder</p>
                  <p className="text-xs text-gray-600">Jonojivan Foundation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Download button positioned outside on the right */}
        <div className="flex-shrink-0 mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md"
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
