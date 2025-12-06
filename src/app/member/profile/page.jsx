"use client";

import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit2, Save, X, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [updating, setUpdating] = useState(false);
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
          
          // Transform the data for use in the component
          const transformedData = {
            id: memberData._id,
            name: memberData.user?.fullName || "N/A",
            email: memberData.user?.email || "N/A",
            avatar: memberData.profileImage || memberData.user?.profilePic || "/api/placeholder/40/40",
            role: `${memberData.post} - ${memberData.committee}`,
            committee: memberData.committee,
            subCommittee: memberData.subCommittee,
            post: memberData.post,
            membershipId: memberData.membershipId,
            membershipStatus: memberData.membershipStatus,
            joinDate: new Date(memberData.registrationDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            }),
            supportingAmount: memberData.supportingAmount || 0,
            paymentStatus: memberData.paymentStatus,
            state: memberData.state,
            district: memberData.district,
            joiningState: memberData.joiningState,
            mobileNumber: memberData.user?.mobileNumber,
            whatsappNumber: memberData.whatsappNumber,
            gender: memberData.gender,
            documentType: memberData.documentType,
            documentNumber: memberData.documentNumber,
            guardianName: memberData.guardianName,
            guardianMobile: memberData.guardianMobile,
            maritalStatus: memberData.maritalStatus,
            address: memberData.address,
            country: memberData.country,
            pincode: memberData.pincode,
            notes: memberData.notes
          };
          
          setUserData(transformedData);
          setEditData(transformedData);
        } else {
          const errorData = await response.json();
          toast.error(`Failed to fetch member data: ${errorData.msg}`);
          // Redirect to login if unauthorized
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

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...userData });
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setUpdating(true);
      
      // Prepare update data (only editable fields)
      const updatePayload = {
        whatsappNumber: editData.whatsappNumber,
        guardianName: editData.guardianName,
        guardianMobile: editData.guardianMobile,
        maritalStatus: editData.maritalStatus,
        address: editData.address,
        state: editData.state,
        district: editData.district,
        pincode: editData.pincode,
        supportingAmount: editData.supportingAmount,
        notes: editData.notes,
        // User fields
        fullName: editData.name,
        mobileNumber: editData.mobileNumber
      };

      const response = await fetch(`/api/member/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatePayload),
      });

      if (response.ok) {
        const updatedData = await response.json();
        toast.success("Profile updated successfully!");
        setUserData({ ...userData, ...editData });
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        toast.error(`Update failed: ${errorData.msg || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'partial': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="text-center">
          <p className="text-muted-foreground">No profile data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen bg-background overflow-y-auto scrollbar-hide ">
      <div className="w-full mx-auto space-y-6 py-8  px-4">
        {/* Header */}
        <div className="bg-card rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-border"
                />
                <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1.5 rounded-full hover:bg-primary/90 transition-colors">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{userData.name}</h1>
                <p className="text-muted-foreground">{userData.role}</p>
                <p className="text-sm text-muted-foreground">ID: {userData.membershipId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(userData.membershipStatus)}`}>
                {userData.membershipStatus}
              </span>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary/90 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={updating}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{updating ? 'Saving...' : 'Save'}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={updating}
                    className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg border flex items-center space-x-2 hover:bg-secondary/80 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  ) : (
                    <p className="text-foreground">{userData.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Gender</label>
                  <p className="text-foreground capitalize">{userData.gender}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Marital Status</label>
                  {isEditing ? (
                    <select
                      value={editData.maritalStatus}
                      onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  ) : (
                    <p className="text-foreground capitalize">{userData.maritalStatus}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">{userData.documentType || "Document Number"}</label>
                  <p className="text-foreground">{userData.documentNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <p className="text-foreground">{userData.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Mobile Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                ) : (
                  <p className="text-foreground">{userData.mobileNumber}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">WhatsApp Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.whatsappNumber}
                    onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                ) : (
                  <p className="text-foreground">{userData.whatsappNumber || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Guardian Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.guardianName}
                    onChange={(e) => handleInputChange('guardianName', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                ) : (
                  <p className="text-foreground">{userData.guardianName}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Guardian Mobile</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.guardianMobile}
                    onChange={(e) => handleInputChange('guardianMobile', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                ) : (
                  <p className="text-foreground">{userData.guardianMobile}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Address Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Address</label>
                {isEditing ? (
                  <textarea
                    value={editData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                ) : (
                  <p className="text-foreground">{userData.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  ) : (
                    <p className="text-foreground">{userData.state}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">District</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  ) : (
                    <p className="text-foreground">{userData.district}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Country</label>
                  <p className="text-foreground">{userData.country}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Pincode</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  ) : (
                    <p className="text-foreground">{userData.pincode}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Membership Information */}
          <Card>
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Membership Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Committee</label>
                  <p className="text-foreground">{userData.committee}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Sub Committee</label>
                  <p className="text-foreground">{userData.subCommittee}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Post</label>
                  <p className="text-foreground">{userData.post}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Joining State</label>
                  <p className="text-foreground">{userData.joiningState}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Join Date</label>
                  <p className="text-foreground flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{userData.joinDate}</span>
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Supporting Amount</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.supportingAmount}
                      onChange={(e) => handleInputChange('supportingAmount', parseFloat(e.target.value) || 0)}
                      className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  ) : (
                    <p className="text-foreground">₹{userData.supportingAmount}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Payment Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(userData.paymentStatus)}`}>
                    {userData.paymentStatus}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes Section */}
        {(userData.notes || isEditing) && (
          <Card>
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isEditing ? (
                <textarea
                  value={editData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows="4"
                  placeholder="Add any additional notes..."
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              ) : (
                <p className="text-foreground">{userData.notes || 'No additional notes'}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
