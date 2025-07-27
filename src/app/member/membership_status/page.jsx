"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Shield,
  Building,
} from "lucide-react";

const MembershipPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/member/auth/memberAuthToken", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const memberData = await response.json();
          console.log("Member data fetched:", memberData);

          const transformedData = {
            name: memberData.user?.fullName || "N/A",
            email: memberData.user?.email || "N/A",
            avatar:
              memberData.profileImage ||
              memberData.user?.profilePic ||
              "/api/placeholder/40/40",
            role: `${memberData.post} - ${memberData.committee}`,
            committee: memberData.committee,
            subCommittee: memberData.subCommittee,
            post: memberData.post,
            membershipId: memberData.membershipId,
            membershipStatus: memberData.membershipStatus,
            joinDate: new Date(memberData.registrationDate).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
              }
            ),
            supportingAmount: memberData.supportingAmount || 0,
            paymentStatus: memberData.paymentStatus,
            state: memberData.state,
            district: memberData.district,
            joiningState: memberData.joiningState,
            mobileNumber: memberData.user?.mobileNumber,
            whatsappNumber: memberData.whatsappNumber,
          };

          setUserData(transformedData);
        } else {
          const errorData = await response.json();
          toast.error(`Failed to fetch member data: ${errorData.msg}`);
          if (response.status === 401) {
            router.push("/member/login");
          }
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
        toast.error("Failed to fetch member data");
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [router]);

  const getStatusColor = (status) => {
    switch (status) {
      // Membership Status Colors
      case "Active":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200";
      case "Suspended":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
      case "Inactive":
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";

      // Payment Status Colors
      case "Paid":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
      case "Partial":
        return "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200";
      case "Failed":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-600">No membership data found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Membership Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {userData.name}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Registration Details */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Shield className="h-5 w-5" />
                Registration Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Membership ID</p>
                <p className="font-semibold text-gray-900">
                  {userData.membershipId}
                </p>
              </div>
              <Separator className="bg-gray-200" />
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge
                  className={`${getStatusColor(
                    userData.membershipStatus
                  )} border`}
                >
                  {userData.membershipStatus}
                </Badge>
              </div>
              <Separator className="bg-gray-200" />
              <div>
                <p className="text-sm text-gray-600">Registration Date</p>
                <p className="font-medium text-gray-900">{userData.joinDate}</p>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-semibold text-gray-900">{userData.name}</p>
              </div>
              <Separator className="bg-gray-200" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900 text-sm">
                  {userData.email}
                </p>
              </div>
              <Separator className="bg-gray-200" />
              <div>
                <p className="text-sm text-gray-600">Mobile Number</p>
                <p className="font-medium text-gray-900">
                  {userData.mobileNumber || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Position & Committee */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Building className="h-5 w-5" />
                Position & Committee
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Post</p>
                <p className="font-semibold text-gray-900">{userData.post}</p>
              </div>
              <Separator className="bg-gray-200" />
              <div>
                <p className="text-sm text-gray-600">Committee</p>
                <p className="font-medium text-gray-900">
                  {userData.committee}
                </p>
              </div>
              <Separator className="bg-gray-200" />
              <div>
                <p className="text-sm text-gray-600">Sub Committee</p>
                <p className="font-medium text-gray-900">
                  {userData.subCommittee || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <MapPin className="h-5 w-5" />
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">State</p>
                <p className="font-semibold text-gray-900">{userData.state}</p>
              </div>
              <Separator className="bg-gray-200" />
              <div>
                <p className="text-sm text-gray-600">District</p>
                <p className="font-medium text-gray-900">{userData.district}</p>
              </div>
              <Separator className="bg-gray-200" />
              <div>
                <p className="text-sm text-gray-600">Joining State</p>
                <p className="font-medium text-gray-900">
                  {userData.joiningState}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Supporting Amount</p>
                <p className="font-semibold text-gray-900">
                  ₹{userData.supportingAmount}
                </p>
              </div>
              <Separator className="bg-gray-200" />
              <div>
                <p className="text-sm text-gray-600">Payment Status</p>
                <Badge
                  className={`${getStatusColor(userData.paymentStatus)} border`}
                >
                  {userData.paymentStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Mobile</p>
                <p className="font-semibold text-gray-900">
                  {userData.mobileNumber || "N/A"}
                </p>
              </div>
              <Separator className="bg-gray-200" />
              <div>
                <p className="text-sm text-gray-600">WhatsApp</p>
                <p className="font-medium text-gray-900">
                  {userData.whatsappNumber || "N/A"}
                </p>
              </div>
              <Separator className="bg-gray-200" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900 text-sm">
                  {userData.email}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
