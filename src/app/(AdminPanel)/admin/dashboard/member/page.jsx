"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Filter,
  Loader2,
  Minus,
  Search,
  Users,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  UserCheck,
  UserX,
  Clock,
  Pencil,
} from "lucide-react";

export default function MemberManagement() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [committeeFilter, setCommitteeFilter] = useState("all");
  const [sortField, setSortField] = useState("registrationDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    active: 0,
    suspended: 0,
    inactive: 0,
  });

  const [editMember, setEditMember] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, [searchTerm, statusFilter, committeeFilter, sortField, sortOrder]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, committeeFilter]);

  // Fetch member data for editing
  const fetchMemberForEdit = async (memberId) => {
    try {
      const response = await fetch(`/api/member/${memberId}`);
      const data = await response.json();

      if (response.ok) {
        setEditMember(data.member || data);
        setEditFormData(data.member || data);
      } else {
        toast.error("Failed to fetch member details");
      }
    } catch (error) {
      console.error("Error fetching member:", error);
      toast.error("Failed to fetch member details");
    }
  };

  // Open edit modal - Fixed function
  const openEditModal = (member) => {
    setEditMember(member);
    setEditFormData({
      ...member,
      user: { ...member.user }, // Deep copy user object
    });
  };

  // Handle form input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested properties like user.fullName
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEditFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setEditFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Update member using PATCH method
  // Update member using PATCH method with dual API calls
  const updateMemberPatch = async (id, updatedData) => {
    try {
      setUpdateLoading(true);

      // Separate user data from member data
      const { user, ...memberData } = updatedData;

      let userUpdateSuccess = true;

      // Update user information first if user data exists
      if (user && editFormData.user?._id) {
        try {
          // Only send name, email, and mobile to user API
          const userDataToUpdate = {
            fullName: user.fullName,
            email: user.email,
            mobileNumber: user.mobileNumber,
          };

          // Call PATCH API for user update
          const userResponse = await fetch(
            `/api/user/${editFormData.user._id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userDataToUpdate),
            }
          );

          const userData = await userResponse.json();

          if (userResponse.ok) {
            console.log("User information updated successfully");
          } else {
            userUpdateSuccess = false;
            console.error(
              "User update failed:",
              userData.msg || "Unknown error"
            );
          }
        } catch (userError) {
          userUpdateSuccess = false;
          console.error("User update failed:", userError);
        }
      }

      // Update member information (everything except user data)
      const response = await fetch(`/api/member/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      });

      const data = await response.json();

      if (response.ok) {
        if (userUpdateSuccess && user) {
          toast.success("Member and user updated successfully");
        } else if (!user) {
          toast.success("Member updated successfully");
        } else {
          toast.success("Member updated successfully (user update failed)");
        }
        await fetchMembers(); // Refresh the members list
        setEditMember(null); // Close the edit modal
        setEditFormData({});
      } else {
        toast.error(data.msg || "Failed to update member");
      }
    } catch (error) {
      console.error("Error updating member:", error);
      toast.error("Failed to update member");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateMemberPatch(editMember._id, editFormData);
  };

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/member`);
      const data = await response.json();
      console.log(data);

      // Safely access the members array
      let membersData = [];
      if (data && data.members) {
        if (Array.isArray(data.members)) {
          membersData = data.members;
        } else if (
          data.members.members &&
          Array.isArray(data.members.members)
        ) {
          membersData = data.members.members;
        }
      }

      setMembers(membersData);
      calculateStats(membersData);
    } catch (error) {
      console.error("Error fetching members:", error);
      toast.error("Failed to fetch members");
      setMembers([]);
      calculateStats([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data = []) => {
    if (!Array.isArray(data)) {
      console.warn("calculateStats received non-array data:", data);
      data = [];
    }

    const stats = {
      total: data.length,
      pending: data.filter((member) => member?.membershipStatus === "Pending")
        .length,
      active: data.filter((member) => member?.membershipStatus === "Active")
        .length,
      suspended: data.filter(
        (member) => member?.membershipStatus === "Suspended"
      ).length,
      inactive: data.filter((member) => member?.membershipStatus === "Inactive")
        .length,
    };
    setStats(stats);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <Minus className="h-3 w-3" />;
    return sortOrder === "asc" ? (
      <ChevronUp className="h-3 w-3" />
    ) : (
      <ChevronDown className="h-3 w-3" />
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      Active: {
        label: "Active",
        className: "bg-green-100 text-green-800 border-green-200",
      },
      Suspended: {
        label: "Suspended",
        className: "bg-red-100 text-red-800 border-red-200",
      },
      Inactive: {
        label: "Inactive",
        className: "bg-gray-100 text-gray-800 border-gray-200",
      },
    };

    const config = statusConfig[status] || statusConfig.Pending;
    return (
      <Badge variant="outline" className={`${config.className} font-medium`}>
        {config.label}
      </Badge>
    );
  };

  const deleteMember = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      const response = await fetch(`/api/member/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Member deleted successfully");
        await fetchMembers();
      } else {
        toast.error(data.msg || "Failed to delete member");
        console.error("API Error:", data.msg);
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Failed to delete member");
    }
  };

  const viewMember = (member) => {
    setSelectedMember(member);
  };

  // Fixed sorting logic
  const sortedMembers = useMemo(() => {
    if (!Array.isArray(members)) return [];

    return [...members].sort((a, b) => {
      let aValue, bValue;

      // Handle nested properties like user.fullName
      if (sortField.includes(".")) {
        const [parent, child] = sortField.split(".");
        aValue = a[parent]?.[child] || "";
        bValue = b[parent]?.[child] || "";
      } else {
        aValue = a[sortField] || "";
        bValue = b[sortField] || "";
      }

      // Convert to string for comparison
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [members, sortField, sortOrder]);

  const filteredMembers = useMemo(() => {
    if (!Array.isArray(sortedMembers)) return [];

    return sortedMembers.filter((member) => {
      if (!member) return false;

      const matchesSearch =
        (member.user?.fullName?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (member.user?.email?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (member.adhaarNumber || "").includes(searchTerm) ||
        (member.membershipId || "").includes(searchTerm) ||
        (member.guardianName?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        );

      const matchesStatus =
        statusFilter === "all" || member.membershipStatus === statusFilter;

      const matchesCommittee =
        committeeFilter === "all" || member.committee === committeeFilter;

      return matchesSearch && matchesStatus && matchesCommittee;
    });
  }, [sortedMembers, searchTerm, statusFilter, committeeFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <>
      <div className=" min-h-[80vh]">
        <div className="space-y-6 p-6 ">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-3xl font-bold text-black">
              Member Management System
            </h2>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Total Members
                </CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">
                  {stats.total}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Pending
                </CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Active
                </CardTitle>
                <UserCheck className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.active}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Suspended
                </CardTitle>
                <UserX className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {stats.suspended}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Inactive
                </CardTitle>
                <User className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-500">
                  {stats.inactive}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, membership ID, Aadhaar number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-black placeholder-gray-400"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 bg-white border-gray-300 text-black">
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem
                  value="all"
                  className="text-black hover:bg-gray-100"
                >
                  All Status
                </SelectItem>
                <SelectItem
                  value="Pending"
                  className="text-black hover:bg-gray-100"
                >
                  Pending
                </SelectItem>
                <SelectItem
                  value="Active"
                  className="text-black hover:bg-gray-100"
                >
                  Active
                </SelectItem>
                <SelectItem
                  value="Suspended"
                  className="text-black hover:bg-gray-100"
                >
                  Suspended
                </SelectItem>
                <SelectItem
                  value="Inactive"
                  className="text-black hover:bg-gray-100"
                >
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={committeeFilter} onValueChange={setCommitteeFilter}>
              <SelectTrigger className="w-full md:w-48 bg-white border-gray-300 text-black">
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Filter by committee" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem
                  value="all"
                  className="text-black hover:bg-gray-100"
                >
                  All Committees
                </SelectItem>
                <SelectItem
                  value="Executive Committee"
                  className="text-black hover:bg-gray-100"
                >
                  Executive Committee
                </SelectItem>
                <SelectItem
                  value="National Committee"
                  className="text-black hover:bg-gray-100"
                >
                  National Committee
                </SelectItem>
                <SelectItem
                  value="State Committee"
                  className="text-black hover:bg-gray-100"
                >
                  State Committee
                </SelectItem>
                <SelectItem
                  value="District Committee"
                  className="text-black hover:bg-gray-100"
                >
                  District Committee
                </SelectItem>
                <SelectItem
                  value="Member"
                  className="text-black hover:bg-gray-100"
                >
                  Member
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
              <span className="ml-2 text-gray-600">Loading members...</span>
            </div>
          )}

          {/* Table */}
          {!loading && (
            <Card className="bg-white border-gray-200">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead className="text-gray-700">
                        <button
                          onClick={() => handleSort("user.fullName")}
                          className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded transition-colors"
                        >
                          Full Name {getSortIcon("user.fullName")}
                        </button>
                      </TableHead>
                      <TableHead className="text-gray-700">Email</TableHead>
                      <TableHead className="text-gray-700">
                        Membership ID
                      </TableHead>
                      <TableHead className="text-gray-700">Committee</TableHead>
                      <TableHead className="text-gray-700">Post</TableHead>
                      <TableHead className="text-gray-700">Status</TableHead>
                      <TableHead className="text-gray-700">
                        Payment Status
                      </TableHead>
                      <TableHead className="text-gray-700">
                        <button
                          onClick={() => handleSort("registrationDate")}
                          className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded transition-colors"
                        >
                          Registration Date {getSortIcon("registrationDate")}
                        </button>
                      </TableHead>
                      <TableHead className="text-center text-gray-700">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentMembers.map((member) => (
                      <TableRow
                        key={member._id}
                        className="hover:bg-gray-50 border-gray-200"
                      >
                        <TableCell className="font-medium text-black">
                          {member.user?.fullName || "N/A"}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {member.user?.email || "N/A"}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-gray-700">
                          {member.membershipId}
                        </TableCell>
                        <TableCell className="text-sm text-gray-700">
                          {member.committee}
                        </TableCell>
                        <TableCell className="text-sm text-gray-700">
                          {member.post}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(member.membershipStatus)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`font-medium ${
                              member.paymentStatus === "Paid"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : member.paymentStatus === "Partial"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : member.paymentStatus === "Failed"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : "bg-gray-100 text-gray-800 border-gray-200"
                            }`}
                          >
                            {member.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {new Date(member.registrationDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => viewMember(member)}
                                  className="h-8 w-8 p-0 bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                            </Dialog>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditModal(member)}
                              className="h-8 w-8 p-0 bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteMember(member._id)}
                              className="h-8 w-8 p-0 bg-white border-gray-300 text-gray-600 hover:text-black hover:bg-gray-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredMembers.length === 0 && !loading && (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No members found</p>
                    <p className="text-sm">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredMembers.length > 0 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Show</span>
                    <Select
                      value={itemsPerPage.toString()}
                      onValueChange={handleItemsPerPageChange}
                    >
                      <SelectTrigger className="w-20 h-8 bg-white border-gray-300 text-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem
                          value="5"
                          className="text-black hover:bg-gray-100"
                        >
                          5
                        </SelectItem>
                        <SelectItem
                          value="10"
                          className="text-black hover:bg-gray-100"
                        >
                          10
                        </SelectItem>
                        <SelectItem
                          value="20"
                          className="text-black hover:bg-gray-100"
                        >
                          20
                        </SelectItem>
                        <SelectItem
                          value="50"
                          className="text-black hover:bg-gray-100"
                        >
                          50
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <span>entries</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>
                      Showing {startIndex + 1} to{" "}
                      {Math.min(endIndex, filteredMembers.length)} of{" "}
                      {filteredMembers.length} entries
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0 bg-white border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber =
                        currentPage <= 3
                          ? i + 1
                          : currentPage >= totalPages - 2
                          ? totalPages - 4 + i
                          : currentPage - 2 + i;

                      if (pageNumber < 1 || pageNumber > totalPages)
                        return null;

                      return (
                        <Button
                          key={pageNumber}
                          variant={
                            currentPage === pageNumber ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handlePageChange(pageNumber)}
                          className={`h-8 w-8 p-0 ${
                            currentPage === pageNumber
                              ? "bg-black text-white border-black hover:bg-gray-800"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNumber}
                        </Button>
                      );
                    })}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0 bg-white border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Member Detail Modal */}
          {selectedMember && (
            <Dialog
              open={!!selectedMember}
              onOpenChange={() => setSelectedMember(null)}
            >
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 shadow-2xl">
                <DialogHeader className="border-b-2 pb-6 bg-white  p-6 shadow-lg border border-gray-100rounded-t-lg -m-6 mb-6 px-6 pt-6 ">
                  <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      👤
                    </div>
                    Member Details
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-8 p-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                          <span className="text-2xl">📋</span>
                          Profile Information
                        </h3>
                        <div className="flex flex-col items-center">
                          <div className="relative">
                            <img
                              src={
                                selectedMember.profileImage ||
                                "/api/placeholder/150/150"
                              }
                              alt="Profile"
                              className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl"
                            />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                              ✓
                            </div>
                          </div>
                          <div className="mt-4 text-center">
                            <p className="text-xl font-bold text-white">
                              {selectedMember.user?.fullName}
                            </p>
                            <p className="text-purple-100 font-mono text-sm bg-white/20 px-3 py-1 rounded-full mt-2">
                              {selectedMember.membershipId}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Personal Details */}
                    <div className="lg:col-span-2">
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                          <span className="text-2xl">👨‍💼</span>
                          Personal Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="group">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                              <span className="text-blue-500">📧</span>
                              Email
                            </label>
                            <p className="text-gray-800 font-medium mt-1 bg-blue-50 px-3 py-2 rounded-lg border-l-4 border-blue-400">
                              {selectedMember.user?.email || "N/A"}
                            </p>
                          </div>
                          <div className="group">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                              <span className="text-green-500">📱</span>
                              Mobile Number
                            </label>
                            <p className="text-gray-800 font-medium mt-1 bg-green-50 px-3 py-2 rounded-lg border-l-4 border-green-400">
                              {selectedMember.user?.mobileNumber || "N/A"}
                            </p>
                          </div>
                          <div className="group">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                              <span className="text-emerald-500">💬</span>
                              WhatsApp Number
                            </label>
                            <p className="text-gray-800 font-medium mt-1 bg-emerald-50 px-3 py-2 rounded-lg border-l-4 border-emerald-400">
                              {selectedMember.whatsappNumber || "N/A"}
                            </p>
                          </div>
                          <div className="group">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                              <span className="text-pink-500">⚧</span>
                              Gender
                            </label>
                            <p className="text-gray-800 font-medium mt-1 bg-pink-50 px-3 py-2 rounded-lg border-l-4 border-pink-400 capitalize">
                              {selectedMember.gender}
                            </p>
                          </div>
                          <div className="group">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                              <span className="text-indigo-500">🆔</span>
                              Aadhaar Number
                            </label>
                            <p className="text-gray-800 font-mono font-medium mt-1 bg-indigo-50 px-3 py-2 rounded-lg border-l-4 border-indigo-400">
                              {selectedMember.adhaarNumber}
                            </p>
                          </div>
                          <div className="group">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                              <span className="text-orange-500">💍</span>
                              Marital Status
                            </label>
                            <p className="text-gray-800 font-medium mt-1 bg-orange-50 px-3 py-2 rounded-lg border-l-4 border-orange-400 capitalize">
                              {selectedMember.maritalStatus}
                            </p>
                          </div>
                          <div className="group">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                              <span className="text-teal-500">👨‍👩‍👧‍👦</span>
                              Guardian Name
                            </label>
                            <p className="text-gray-800 font-medium mt-1 bg-teal-50 px-3 py-2 rounded-lg border-l-4 border-teal-400">
                              {selectedMember.guardianName}
                            </p>
                          </div>
                          <div className="group">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                              <span className="text-cyan-500">📞</span>
                              Guardian Mobile
                            </label>
                            <p className="text-gray-800 font-medium mt-1 bg-cyan-50 px-3 py-2 rounded-lg border-l-4 border-cyan-400">
                              {selectedMember.guardianMobile}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  {/* Address Information */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <span className="text-2xl">🏠</span>
                      Address Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="group md:col-span-2 lg:col-span-3">
                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                          <span className="text-emerald-500">📍</span>
                          Full Address
                        </label>
                        <p className="text-gray-800 font-medium mt-1 bg-emerald-50 px-4 py-3 rounded-lg border-l-4 border-emerald-400">
                          {selectedMember.address}
                        </p>
                      </div>
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                          <span className="text-blue-500">🌍</span>
                          Country
                        </label>
                        <p className="text-gray-800 font-medium mt-1 bg-blue-50 px-4 py-3 rounded-lg border-l-4 border-blue-400">
                          {selectedMember.country}
                        </p>
                      </div>
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                          <span className="text-purple-500">🏛️</span>
                          State
                        </label>
                        <p className="text-gray-800 font-medium mt-1 bg-purple-50 px-4 py-3 rounded-lg border-l-4 border-purple-400">
                          {selectedMember.state}
                        </p>
                      </div>
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                          <span className="text-amber-500">🏘️</span>
                          District
                        </label>
                        <p className="text-gray-800 font-medium mt-1 bg-amber-50 px-4 py-3 rounded-lg border-l-4 border-amber-400">
                          {selectedMember.district}
                        </p>
                      </div>
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                          <span className="text-indigo-500">📮</span>
                          Pincode
                        </label>
                        <p className="text-gray-800 font-medium mt-1 bg-indigo-50 px-4 py-3 rounded-lg border-l-4 border-indigo-400">
                          {selectedMember.pincode || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Membership Information */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <span className="text-2xl">🎖️</span>
                      Membership Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                          <span className="text-purple-500">🏢</span>
                          Committee
                        </label>
                        <p className="text-gray-800 font-medium mt-1 bg-purple-50 px-4 py-3 rounded-lg border-l-4 border-purple-400">
                          {selectedMember.committee || "N/A"}
                        </p>
                      </div>
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                          <span className="text-amber-500">💼</span>
                          Post
                        </label>
                        <p className="text-gray-800 font-medium mt-1 bg-amber-50 px-4 py-3 rounded-lg border-l-4 border-amber-400">
                          {selectedMember.post || "N/A"}
                        </p>
                      </div>
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                          <span className="text-blue-500">🆔</span>
                          Membership ID
                        </label>
                        <p className="text-gray-800 font-mono font-medium mt-1 bg-blue-50 px-4 py-3 rounded-lg border-l-4 border-blue-400">
                          {selectedMember.membershipId || "N/A"}
                        </p>
                      </div>
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-1 mb-2">
                          <span className="text-green-500">📊</span>
                          Status
                        </label>
                        <div className="flex items-center">
                          {getStatusBadge(selectedMember.membershipStatus)}
                        </div>
                      </div>
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-1 mb-2">
                          <span className="text-emerald-500">💳</span>
                          Payment Status
                        </label>
                        <Badge
                          variant="outline"
                          className={`font-semibold px-4 py-2 text-sm rounded-full ${
                            selectedMember.paymentStatus === "Paid"
                              ? "bg-gradient-to-r from-green-400 to-green-500 text-white border-green-400 shadow-md"
                              : selectedMember.paymentStatus === "Partial"
                              ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-yellow-400 shadow-md"
                              : selectedMember.paymentStatus === "Failed"
                              ? "bg-gradient-to-r from-red-400 to-red-500 text-white border-red-400 shadow-md"
                              : "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-gray-400 shadow-md"
                          }`}
                        >
                          <span className="mr-1">
                            {selectedMember.paymentStatus === "Paid"
                              ? "✅"
                              : selectedMember.paymentStatus === "Partial"
                              ? "⚠️"
                              : selectedMember.paymentStatus === "Failed"
                              ? "❌"
                              : "⏳"}
                          </span>
                          {selectedMember.paymentStatus}
                        </Badge>
                      </div>
                      <div className="group">
                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                          <span className="text-indigo-500">📅</span>
                          Registration Date
                        </label>
                        <p className="text-gray-800 font-medium mt-1 bg-indigo-50 px-4 py-3 rounded-lg border-l-4 border-indigo-400">
                          {new Date(
                            selectedMember.registrationDate
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Edit Member Modal */}
          {editMember && (
            <Dialog
              open={!!editMember}
              onOpenChange={() => setEditMember(null)}
            >
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-gray-300">
                <DialogHeader className="border-b border-gray-200 pb-4">
                  <DialogTitle className="text-xl font-semibold text-black">
                    Edit Member: {editMember.user?.fullName}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleEditSubmit} className="space-y-6 p-6">
                  {/* Personal Information Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <Input
                          type="text"
                          name="user.fullName"
                          value={editFormData.user?.fullName || ""}
                          onChange={handleEditInputChange}
                          className="mt-1 bg-white border-gray-300 text-black"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <Input
                          type="email"
                          name="user.email"
                          value={editFormData.user?.email || ""}
                          onChange={handleEditInputChange}
                          className="mt-1 bg-white border-gray-300 text-black"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Mobile Number
                        </label>
                        <Input
                          type="tel"
                          name="user.mobileNumber"
                          value={editFormData.user?.mobileNumber || ""}
                          onChange={handleEditInputChange}
                          className="mt-1 bg-white border-gray-300 text-black"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          WhatsApp Number
                        </label>
                        <Input
                          type="tel"
                          name="whatsappNumber"
                          value={editFormData.whatsappNumber || ""}
                          onChange={handleEditInputChange}
                          className="mt-1 bg-white border-gray-300 text-black"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Gender
                        </label>
                        <Select
                          value={editFormData.gender || ""}
                          onValueChange={(value) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              gender: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-1 bg-white border-gray-300 text-black">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Aadhaar Number
                        </label>
                        <Input
                          type="text"
                          name="adhaarNumber"
                          value={editFormData.adhaarNumber || ""}
                          onChange={handleEditInputChange}
                          className="mt-1 bg-white border-gray-300 text-black"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Guardian Name
                        </label>
                        <Input
                          type="text"
                          name="guardianName"
                          value={editFormData.guardianName || ""}
                          onChange={handleEditInputChange}
                          className="mt-1 bg-white border-gray-300 text-black"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Guardian Mobile
                        </label>
                        <Input
                          type="tel"
                          name="guardianMobile"
                          value={editFormData.guardianMobile || ""}
                          onChange={handleEditInputChange}
                          className="mt-1 bg-white border-gray-300 text-black"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-4">
                      Address Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <Input
                          type="text"
                          name="address"
                          value={editFormData.address || ""}
                          onChange={handleEditInputChange}
                          className="mt-1 bg-white border-gray-300 text-black"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <Input
                          type="text"
                          name="country"
                          value={editFormData.country || ""}
                          onChange={handleEditInputChange}
                          className="mt-1 bg-white border-gray-300 text-black"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          State
                        </label>
                        <Input
                          type="text"
                          name="state"
                          value={editFormData.state || ""}
                          onChange={handleEditInputChange}
                          className="mt-1 bg-white border-gray-300 text-black"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          District
                        </label>
                        <Input
                          type="text"
                          name="district"
                          value={editFormData.district || ""}
                          onChange={handleEditInputChange}
                          className="mt-1 bg-white border-gray-300 text-black"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Pincode
                        </label>
                        <Input
                          type="text"
                          name="pincode"
                          value={editFormData.pincode || ""}
                          onChange={handleEditInputChange}
                          className="mt-1 bg-white border-gray-300 text-black"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Membership Information Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-4">
                      Membership Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Committee
                        </label>
                        <Select
                          value={editFormData.committee || ""}
                          onValueChange={(value) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              committee: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-1 bg-white border-gray-300 text-black">
                            <SelectValue placeholder="Select committee" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300">
                            <SelectItem value="Executive Committee">
                              Executive Committee
                            </SelectItem>
                            <SelectItem value="National Committee">
                              National Committee
                            </SelectItem>
                            <SelectItem value="State Committee">
                              State Committee
                            </SelectItem>
                            <SelectItem value="District Committee">
                              District Committee
                            </SelectItem>
                            <SelectItem value="Member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Post
                        </label>
                        <Input
                          type="text"
                          name="post"
                          value={editFormData.post || ""}
                          onChange={handleEditInputChange}
                          className="mt-1 bg-white border-gray-300 text-black"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Membership Status
                        </label>
                        <Select
                          value={editFormData.membershipStatus || ""}
                          onValueChange={(value) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              membershipStatus: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-1 bg-white border-gray-300 text-black">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300">
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Suspended">Suspended</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Payment Status
                        </label>
                        <Select
                          value={editFormData.paymentStatus || ""}
                          onValueChange={(value) =>
                            setEditFormData((prev) => ({
                              ...prev,
                              paymentStatus: value,
                            }))
                          }
                        >
                          <SelectTrigger className="mt-1 bg-white border-gray-300 text-black">
                            <SelectValue placeholder="Select payment status" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300">
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Partial">Partial</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditMember(null)}
                      className="bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={updateLoading}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      {updateLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Updating...
                        </>
                      ) : (
                        "Update Member"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </>
  );
}
