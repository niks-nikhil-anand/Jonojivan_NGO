'use client';

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AppointmentLetter = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-md border border-gray-200">
          <CardContent className="p-6 sm:p-10 text-gray-800 space-y-4">
            <div className="text-right text-sm text-gray-600">
              Date: <span className="font-medium">26-12-2024</span>
            </div>

            <div className="space-y-1">
              <p className="font-semibold">To,</p>
              <p>Umesh Gehlot</p>
              <p>Flat No AO-1/02, Anubhuti Apartments,</p>
              <p>Sitapur Road, Sector CS, Daliganj,</p>
              <p>Ujjain</p>
            </div>

            <h1 className="text-xl font-bold text-center mt-6">Subject: Letter of Appointment</h1>

            <div className="space-y-4 mt-6 text-justify">
              <p>Dear Mr. Umesh Gehlot,</p>
              <p>
                We are delighted to extend this formal appointment letter and welcome you as a valuable member of the <strong>Jonojivan Foundation</strong>.
              </p>
              <p>
                Your dedication to community service and your passion for contributing to meaningful causes align perfectly with our mission. We are confident that your association with us will significantly strengthen our collective efforts toward societal transformation.
              </p>
              <p>
                As a member of the Jonojivan Foundation, you will have the opportunity to actively participate in our initiatives, events, and developmental projects. Your insights and efforts will play a pivotal role in driving our objectives forward.
              </p>
              <p>
                In addition to your active role, you will enjoy the following benefits:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>Access to members-only events and training workshops</li>
                <li>Networking with a wide range of professionals and social leaders</li>
                <li>Regular updates through our newsletters and project reports</li>
                <li>Opportunities for personal and professional development within the organization</li>
              </ul>
              <p>
                We believe in the power of collective action and are truly excited about the contributions you will bring to our mission. Should you have any questions or require assistance, feel free to contact us at:
              </p>

              <div className="bg-gray-50 p-4 rounded-md border text-sm text-gray-700 space-y-2">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  info@jonojivan.org
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  +91 94352 66783
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Jonojivan Foundation, Uttar Khatowal, PO- Uttar Khatowal,
                  PS- Rupahihat, Nagaon, Assam – 782124
                </p>
              </div>

              <p>
                Once again, welcome to the Jonojivan Foundation. We look forward to your support, ideas, and active engagement.
              </p>

              <p className="font-medium">
                This Appointment Letter is verified and officially issued by the organization.
              </p>
            </div>

            <div className="pt-8">
              <p className="font-bold">Warm regards,</p>
              <p>Rajkumar Maurya</p>
              <p className="text-sm text-gray-600">President / Founder</p>
              <p className="text-sm text-gray-600">Jonojivan Foundation</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentLetter;
