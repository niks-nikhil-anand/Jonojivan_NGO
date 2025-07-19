"use client";
import { useEffect, useMemo, useState } from "react";

// UI Components from shadcn
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

// Icons
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

  const toast = {
    error: (message) => console.error(message),
    success: (message) => console.log(message),
  };

  useEffect(() => {
    fetchMembers();
  }, [searchTerm, statusFilter, committeeFilter, sortField, sortOrder]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, committeeFilter]);

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
      pending: data.filter((member) => member?.membershipStatus === "Pending").length,
      active: data.filter((member) => member?.membershipStatus === "Active").length,
      suspended: data.filter((member) => member?.membershipStatus === "Suspended").length,
      inactive: data.filter((member) => member?.membershipStatus === "Inactive").length,
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

  const updateMemberStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/member/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          membershipStatus: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Status updated successfully");
        fetchMembers(); // Refresh the list
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const deleteMember = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      const response = await fetch(`/api/member/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Member deleted successfully");
        fetchMembers(); // Refresh the list
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Failed to delete member");
    }
  };

  const viewMember = (member) => {
    setSelectedMember(member);
  };

  const filteredMembers = useMemo(() => {
    if (!Array.isArray(members)) return [];

    return members.filter((member) => {
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
  }, [members, searchTerm, statusFilter, committeeFilter]);

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
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
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
            <div className="text-2xl font-bold text-black">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Suspended</CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Inactive</CardTitle>
            <User className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-500">{stats.inactive}</div>
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
            <SelectItem value="all" className="text-black hover:bg-gray-100">All Status</SelectItem>
            <SelectItem value="Pending" className="text-black hover:bg-gray-100">Pending</SelectItem>
            <SelectItem value="Active" className="text-black hover:bg-gray-100">Active</SelectItem>
            <SelectItem value="Suspended" className="text-black hover:bg-gray-100">Suspended</SelectItem>
            <SelectItem value="Inactive" className="text-black hover:bg-gray-100">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={committeeFilter} onValueChange={setCommitteeFilter}>
          <SelectTrigger className="w-full md:w-48 bg-white border-gray-300 text-black">
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            <SelectValue placeholder="Filter by committee" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-300">
            <SelectItem value="all" className="text-black hover:bg-gray-100">All Committees</SelectItem>
            <SelectItem value="Executive Committee" className="text-black hover:bg-gray-100">Executive Committee</SelectItem>
            <SelectItem value="National Committee" className="text-black hover:bg-gray-100">National Committee</SelectItem>
            <SelectItem value="State Committee" className="text-black hover:bg-gray-100">State Committee</SelectItem>
            <SelectItem value="District Committee" className="text-black hover:bg-gray-100">District Committee</SelectItem>
            <SelectItem value="Member" className="text-black hover:bg-gray-100">Member</SelectItem>
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
                  <TableHead className="text-gray-700">Membership ID</TableHead>
                  <TableHead className="text-gray-700">Committee</TableHead>
                  <TableHead className="text-gray-700">Post</TableHead>
                  <TableHead className="text-gray-700">Status</TableHead>
                  <TableHead className="text-gray-700">Payment Status</TableHead>
                  <TableHead className="text-gray-700">
                    <button
                      onClick={() => handleSort("registrationDate")}
                      className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded transition-colors"
                    >
                      Registration Date {getSortIcon("registrationDate")}
                    </button>
                  </TableHead>
                  <TableHead className="text-center text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentMembers.map((member) => (
                  <TableRow key={member._id} className="hover:bg-gray-50 border-gray-200">
                    <TableCell className="font-medium text-black">
                      {member.user?.fullName || "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-700">{member.user?.email || "N/A"}</TableCell>
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
                          member.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800 border-green-200' :
                          member.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          member.paymentStatus === 'Failed' ? 'bg-red-100 text-red-800 border-red-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }`}
                      >
                        {member.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(member.registrationDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
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
                        <Select
                          value={member.membershipStatus}
                          onValueChange={(value) =>
                            updateMemberStatus(member._id, value)
                          }
                        >
                          <SelectTrigger className={`w-32 h-8 text-white font-medium rounded-md border-0
                            ${
                              member.membershipStatus === "Active"
                                ? "bg-green-600"
                                : member.membershipStatus === "Pending"
                                ? "bg-yellow-500"
                                : member.membershipStatus === "Suspended"
                                ? "bg-red-600"
                                : member.membershipStatus === "Inactive"
                                ? "bg-gray-500"
                                : "bg-gray-500"
                            }
                          `}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300">
                            <SelectItem value="Pending" className="text-black hover:bg-gray-100">Pending</SelectItem>
                            <SelectItem value="Active" className="text-black hover:bg-gray-100">Active</SelectItem>
                            <SelectItem value="Suspended" className="text-black hover:bg-gray-100">Suspended</SelectItem>
                            <SelectItem value="Inactive" className="text-black hover:bg-gray-100">Inactive</SelectItem>
                          </SelectContent>
                        </Select>

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
                <p className="text-sm">Try adjusting your search or filter criteria</p>
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
                    <SelectItem value="5" className="text-black hover:bg-gray-100">5</SelectItem>
                    <SelectItem value="10" className="text-black hover:bg-gray-100">10</SelectItem>
                    <SelectItem value="20" className="text-black hover:bg-gray-100">20</SelectItem>
                    <SelectItem value="50" className="text-black hover:bg-gray-100">50</SelectItem>
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

                  if (pageNumber < 1 || pageNumber > totalPages) return null;

                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
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
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white border-gray-300">
            <DialogHeader className="border-b border-gray-200 pb-4">
              <DialogTitle className="text-xl font-semibold text-black">
                Member Details
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 bg-gray-50 p-6 rounded-md mt-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-semibold text-black mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <img
                        src={selectedMember.profileImage || "/api/placeholder/150/150"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                      />
                      <div className="mt-2 text-center">
                        <p className="text-lg font-semibold text-black">{selectedMember.user?.fullName}</p>
                        <p className="text-sm text-gray-600">{selectedMember.membershipId}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <p className="text-sm text-black font-medium mt-1">{selectedMember.user?.fullName || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-black font-medium mt-1">{selectedMember.user?.email || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                    <p className="text-sm text-black font-medium mt-1">{selectedMember.user?.mobileNumber || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">WhatsApp Number</label>
                    <p className="text-sm text-black font-medium mt-1">{selectedMember.whatsappNumber || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Gender</label>
                    <p className="text-sm text-black font-medium mt-1 capitalize">{selectedMember.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Aadhaar Number</label>
                    <p className="text-sm text-black font-mono font-medium mt-1">{selectedMember.adhaarNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Marital Status</label>
                    <p className="text-sm text-black font-medium mt-1 capitalize">{selectedMember.maritalStatus}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Guardian Name</label>
                    <p className="text-sm text-black font-medium mt-1">{selectedMember.guardianName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Guardian Mobile</label>
                    <p className="text-sm text-black font-medium mt-1">{selectedMember.guardianMobile}</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <p className="text-sm text-black font-medium mt-1">{selectedMember.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Country</label>
                    <p className="text-sm text-black font-medium mt-1">{selectedMember.country}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">State</label>
                    <p className="text-sm text-black font-medium mt-1">{selectedMember.state}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">District</label>
                    <p className="text-sm text-black font-medium mt-1">{selectedMember.district}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Pincode</label>
                                      <p className="text-sm text-black font-medium mt-1">
                      {selectedMember.pincode || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Membership Info */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Membership Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Committee</label>
                    <p className="text-sm text-black font-medium mt-1">{selectedMember.committee || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Post</label>
                    <p className="text-sm text-black font-medium mt-1">{selectedMember.post || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Membership ID</label>
                    <p className="text-sm text-black font-mono font-medium mt-1">{selectedMember.membershipId || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <p className="text-sm font-medium mt-1">
                      {getStatusBadge(selectedMember.membershipStatus)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Payment Status</label>
                    <p className="text-sm font-medium mt-1">
                      <Badge 
                        variant="outline" 
                        className={`font-medium ${
                          selectedMember.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800 border-green-200' :
                          selectedMember.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          selectedMember.paymentStatus === 'Failed' ? 'bg-red-100 text-red-800 border-red-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }`}
                      >
                        {selectedMember.paymentStatus}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Registration Date</label>
                    <p className="text-sm text-black font-medium mt-1">
                      {new Date(selectedMember.registrationDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
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
    </div>
  );
}

