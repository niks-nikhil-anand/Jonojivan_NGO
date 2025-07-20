"use client";
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  User, Calendar, Shield, MapPin, Phone, Mail,
  Building, Download, QrCode, CreditCard
} from 'lucide-react';

const IDCard = () => {
  const memberData = {
    name: "John Doe",
    phone: "1234567890",
    email: "anushkawinggosoft@gmail.com",
    location: "Ujjain",
    id: "MBR-17",
    designation: {
      name: "Executive Committee",
      level: "National Level",
      description:
        "The highest governing body of Jonojivan Foundation, responsible for strategic decision-making, policy formulation, and overall organizational leadership..."
    },
    issueDate: "26-12-2024",
    validUntil: "26-12-2025",
  };

  const qrData = `Name: ${memberData.name}\nID: ${memberData.id}\nPhone: ${memberData.phone}\nEmail: ${memberData.email}\nDesignation: ${memberData.designation.name}\nLocation: ${memberData.location}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(qrData)}`;

  const downloadPDF = () => {
    const printWindow = window.open('', '_blank');
    const frontCard = document.getElementById('front-card');
    const backCard = document.getElementById('back-card');

    if (printWindow && frontCard && backCard) {
      printWindow.document.write(`
        <html>
          <head>
            <title>ID Card - ${memberData.name}</title>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial; background: #fff; }
              .print-container { display: flex; gap: 20px; justify-content: center; }
              .card { width: 350px; height: 550px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
              @media print { .print-container { gap: 10px; } }
            </style>
          </head>
          <body>
            <div class="print-container">
              ${frontCard.outerHTML}
              ${backCard.outerHTML}
            </div>
            <script>
              window.onload = () => {
                window.print();
                window.close();
              };
            </script>
          </body>
        </html>
      `);
    }
  };

  const IDCardFront = () => (
    <Card id="front-card" className="w-[350px] h-[550px] bg-white shadow-lg border border-gray-300 rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-20 flex items-center justify-center text-white">
        <Building className="w-7 h-7 mr-2" />
        <div>
          <h1 className="text-xl font-bold leading-none">JONOJIVAN</h1>
          <p className="text-sm tracking-wider">FOUNDATION</p>
        </div>
      </div>
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex justify-center">
          <div className="w-24 h-28 bg-gray-100 border-2 border-gray-300 rounded-md flex items-center justify-center">
            <User className="w-16 h-16 text-gray-400" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-gray-800">{memberData.name}</h3>
          <Badge className="bg-green-500 text-white px-3 py-1 text-sm inline-flex items-center gap-1">
            <Shield className="w-4 h-4" />
            ACTIVE
          </Badge>
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>ID:</strong> {memberData.id}</p>
          <p><strong>Phone:</strong> {memberData.phone}</p>
          <p><strong>Email:</strong> {memberData.email}</p>
          <p><strong>Location:</strong> {memberData.location}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
          <h4 className="font-bold text-blue-800 text-base mb-1">{memberData.designation.name}</h4>
          <p className="text-blue-600 text-sm">{memberData.designation.level}</p>
        </div>
        <div className="text-xs text-gray-600 space-y-1 mt-auto">
          <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-600" /> Issue: {memberData.issueDate}</p>
          <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-600" /> Valid Until: {memberData.validUntil}</p>
        </div>
      </CardContent>
    </Card>
  );

  const IDCardBack = () => (
    <Card id="back-card" className="w-[350px] h-[550px] bg-white shadow-lg border border-gray-300 rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-20 flex items-center justify-center text-white">
        <QrCode className="w-6 h-6 mr-2" />
        <div>
          <h1 className="text-lg font-bold">VERIFICATION</h1>
          <p className="text-xs">BACK SIDE</p>
        </div>
      </div>
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex justify-center">
          <div className="bg-white border-2 border-gray-300 p-3 rounded-lg">
            <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20" />
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-md text-xs text-blue-700">
          <strong>QR CODE VERIFICATION:</strong><br />
          Scan the QR code to verify this member&apos;s identity.
        </div>
        <div className="bg-gray-50 border border-gray-200 p-3 rounded-md text-xs text-gray-700 space-y-2">
          <strong>TERMS & CONDITIONS</strong>
          <ul className="list-disc pl-4">
            <li>This card is property of Jonojivan Foundation.</li>
            <li>Carry during all official activities.</li>
            <li>Report if lost, stolen or damaged.</li>
            <li>Non-transferable and for official use only.</li>
            <li>Misuse may result in action.</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 p-3 rounded-md text-xs text-red-700">
          <strong>EMERGENCY CONTACT</strong>
          <p>📞 +91 1800-XXX-XXXX</p>
          <p>✉️ help@jonojivan.org</p>
        </div>
        <div className="flex justify-between pt-4 text-xs text-gray-600">
          <div className="text-center">
            <div className="w-20 border-t border-gray-400 mb-1" />
            Member Sign
          </div>
          <div className="text-center">
            <div className="w-20 border-t border-gray-400 mb-1" />
            Authorized Sign
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-6">
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
        <div className="flex justify-center gap-8 flex-wrap">
          <div>
            <div className="flex items-center justify-center mb-3 text-gray-700 font-semibold text-lg">
              <CreditCard className="w-5 h-5 mr-2" />
              Front Side
            </div>
            <IDCardFront />
          </div>
          <div>
            <div className="flex items-center justify-center mb-3 text-gray-700 font-semibold text-lg">
              <CreditCard className="w-5 h-5 mr-2" />
              Back Side
            </div>
            <IDCardBack />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDCard;
