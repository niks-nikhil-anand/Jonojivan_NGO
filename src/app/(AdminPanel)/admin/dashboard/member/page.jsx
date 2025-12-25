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

      const formData = new FormData();
      
      // Append Image if exists
      if (updatedData.imageFile) {
        formData.append("image", updatedData.imageFile);
      }

      // Append all other fields
      // We iterate through available fields and append standard ones
      Object.keys(updatedData).forEach(key => {
        if (key === 'user' && typeof updatedData[key] === 'object') {
          // Flatten user object: user.fullName -> user.fullName (or backend handles it)
          // Actually, our backend logic splits `updates` and `userUpdates`.
          // We can append flattened keys for user:
          if(updatedData.user.fullName) formData.append("user.fullName", updatedData.user.fullName);
          if(updatedData.user.email) formData.append("user.email", updatedData.user.email);
          if(updatedData.user.mobileNumber) formData.append("user.mobileNumber", updatedData.user.mobileNumber);
          // And profilePic might be just a string if not changing, but we only send image file if changing
        } else if (key !== 'imageFile' && key !== 'previewImage' && key !== '_removeProfilePic') {
           // Append standard fields
           if (updatedData[key] !== null && updatedData[key] !== undefined) {
             formData.append(key, updatedData[key]);
           }
        }
      });

      // Handle explicit profile pic removal if no new file
      if (updatedData._removeProfilePic && !updatedData.imageFile) {
        formData.append("profileImage", ""); // Send empty string to indicate removal
      }

      const response = await fetch(`/api/member/${id}`, {
        method: "PATCH",
        body: formData, 
        // Note: Do NOT set Content-Type header when using FormData, browser sets it with boundary
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Member updated successfully");
        await fetchMembers(); // Refresh the members list
        setEditMember(null); // Close the edit modal
        setEditFormData({});
      } else {
        toast.error(data.msg || "Failed to update member");
        console.error("Update failed:", data);
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
        (member.documentNumber || "").includes(searchTerm) ||
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
                placeholder="Search by name, email, membership ID, document number..."
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
          {!loading && (<>
            <Card className="bg-white border-gray-200 h-[50vh] overflow-y-auto">
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
                      <TableHead className="text-gray-700">Document Type</TableHead>
                      <TableHead className="text-gray-700">Document Number</TableHead>
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
                          {member.documentType || "N/A"}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-gray-700">
                          {member.documentNumber || "N/A"}
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
            </Card>

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
          </>)}

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
                              <span className="text-indigo-500">📄</span>
                              Document Type
                            </label>
                            <p className="text-gray-800 font-medium mt-1 bg-indigo-50 px-3 py-2 rounded-lg border-l-4 border-indigo-400 capitalize">
                              {selectedMember.documentType}
                            </p>
                          </div>
                          <div className="group">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                              <span className="text-indigo-500">🆔</span>
                              Document Number
                            </label>
                            <p className="text-gray-800 font-mono font-medium mt-1 bg-indigo-50 px-3 py-2 rounded-lg border-l-4 border-indigo-400">
                              {selectedMember.documentNumber}
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
              <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-indigo-50 to-purple-50 p-0 border-0 shadow-2xl rounded-2xl">
                <DialogHeader className="p-6 bg-white border-b border-gray-100 sticky top-0 z-10 rounded-t-2xl shadow-sm">
                  <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-gray-800">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                      <Pencil className="h-6 w-6" />
                    </div>
                    <div>
                      Edit Member Details
                      <p className="text-sm font-normal text-gray-500 mt-1">
                        Editing: <span className="font-semibold text-indigo-600">{editMember.user?.fullName}</span>
                      </p>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleEditSubmit} className="p-8 space-y-8">
                  
                  {/* Profile Picture Section */}
                  <div className="flex flex-col items-center justify-center space-y-4 bg-white p-8 rounded-2xl shadow-sm border border-indigo-100">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg ring-4 ring-indigo-50">
                        {editFormData.previewImage ? (
                          <img
                            src={editFormData.previewImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : editFormData.user?.profilePic ? (
                          <img
                            src={editFormData.user.profilePic}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <User className="w-16 h-16" />
                          </div>
                        )}
                        
                        {/* Overlay for hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <label htmlFor="profile-upload" className="cursor-pointer text-white text-xs font-semibold flex flex-col items-center">
                            <Pencil className="h-6 w-6 mb-1" />
                            Change
                          </label>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      {(editFormData.previewImage || editFormData.user?.profilePic) && (
                         <button
                           type="button"
                           onClick={() => {
                             setEditFormData(prev => ({
                               ...prev,
                               imageFile: null,
                               previewImage: null,
                               user: { ...prev.user, profilePic: "" },
                               _removeProfilePic: true // Flag to tell backend to remove if needed, or just send empty
                             }));
                           }}
                           className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
                           title="Remove Photo"
                         >
                           <Minus className="h-4 w-4" />
                         </button>
                      )}
                    </div>
                    
                    <input
                      type="file"
                      id="profile-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setEditFormData(prev => ({
                            ...prev,
                            imageFile: file,
                            previewImage: URL.createObjectURL(file), 
                            _removeProfilePic: false
                          }));
                        }
                      }}
                    />
                    <div className="text-center">
                       <label htmlFor="profile-upload" className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-md">
                        Upload New Photo
                       </label>
                       <p className="text-xs text-gray-500 mt-2">Recommended: Square JPG, PNG. Max 2MB.</p>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                      <span className="text-blue-500 text-xl">👤</span> Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <Input
                          name="user.fullName"
                          value={editFormData.user?.fullName || ""}
                          onChange={handleEditInputChange}
                          className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <Input
                          name="user.email"
                          value={editFormData.user?.email || ""}
                          onChange={handleEditInputChange}
                          className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                        <Input
                          name="user.mobileNumber"
                          value={editFormData.user?.mobileNumber || ""}
                          onChange={handleEditInputChange}
                          className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">WhatsApp Number</label>
                        <Input
                          name="whatsappNumber"
                          value={editFormData.whatsappNumber || ""}
                          onChange={handleEditInputChange}
                          className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Gender</label>
                         <Select
                          value={editFormData.gender || ""}
                          onValueChange={(value) => setEditFormData(prev => ({ ...prev, gender: value }))}
                        >
                          <SelectTrigger className="bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Marital Status</label>
                        <Select
                          value={editFormData.maritalStatus || ""}
                          onValueChange={(value) => setEditFormData(prev => ({ ...prev, maritalStatus: value }))}
                        >
                          <SelectTrigger className="bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Guardian Name</label>
                        <Input
                          name="guardianName"
                          value={editFormData.guardianName || ""}
                          onChange={handleEditInputChange}
                          className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Guardian Mobile</label>
                        <Input
                          name="guardianMobile"
                          value={editFormData.guardianMobile || ""}
                          onChange={handleEditInputChange}
                          className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                      <span className="text-green-500 text-xl">🏠</span> Address Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="md:col-span-2 lg:col-span-3 space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Address</label>
                        <Input
                          name="address"
                          value={editFormData.address || ""}
                          onChange={handleEditInputChange}
                          className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                       <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">State</label>
                        <Input
                          name="state"
                          value={editFormData.state || ""}
                          onChange={handleEditInputChange}
                           className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">District</label>
                        <Input
                          name="district"
                          value={editFormData.district || ""}
                          onChange={handleEditInputChange}
                           className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Pincode</label>
                        <Input
                          name="pincode"
                          value={editFormData.pincode || ""}
                          onChange={handleEditInputChange}
                           className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Country</label>
                        <Input
                          name="country"
                          value={editFormData.country || "India"}
                          onChange={handleEditInputChange}
                           className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Identity Information */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                      <span className="text-purple-500 text-xl">🆔</span> Identity Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Document Type</label>
                        <Select
                          value={editFormData.documentType || ""}
                          onValueChange={(value) => setEditFormData(prev => ({ ...prev, documentType: value }))}
                        >
                          <SelectTrigger className="bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select Document Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Aadhaar Card">Aadhaar Card</SelectItem>
                            <SelectItem value="PAN Card">PAN Card</SelectItem>
                            <SelectItem value="Voter ID Card">Voter ID Card</SelectItem>
                            <SelectItem value="Driving License">Driving License</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Document Number</label>
                        <Input
                          name="documentNumber"
                          value={editFormData.documentNumber || ""}
                          onChange={handleEditInputChange}
                           className="bg-gray-50 border-gray-200 focus:bg-white transition-colors font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Membership Information */}
                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                      <span className="text-amber-500 text-xl">🎗️</span> Membership Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Committee</label>
                         <Select
                          value={editFormData.committee || ""}
                          onValueChange={(value) => setEditFormData(prev => ({ ...prev, committee: value }))}
                        >
                          <SelectTrigger className="bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select Committee" />
                          </SelectTrigger>
                          <SelectContent>
                             <SelectItem value="Executive Committee">Executive Committee</SelectItem>
                             <SelectItem value="National Committee">National Committee</SelectItem>
                             <SelectItem value="State Committee">State Committee</SelectItem>
                             <SelectItem value="District Committee">District Committee</SelectItem>
                             <SelectItem value="Mandal Committee">Mandal Committee</SelectItem>
                             <SelectItem value="Tehsil Committee">Tehsil Committee</SelectItem>
                             <SelectItem value="Block Committee">Block Committee</SelectItem>
                             <SelectItem value="Member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Sub-Committee</label>
                         <Select
                          value={editFormData.subCommittee || ""}
                          onValueChange={(value) => setEditFormData(prev => ({ ...prev, subCommittee: value }))}
                        >
                          <SelectTrigger className="bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select Sub-Committee" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Main Body">Main Body</SelectItem>
                            <SelectItem value="National Body">National Body</SelectItem>
                            <SelectItem value="State Body">State Body</SelectItem>
                            <SelectItem value="District Body">District Body</SelectItem>
                             <SelectItem value="Sub Body">Sub Body</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Post</label>
                        <Input
                          name="post"
                          value={editFormData.post || ""}
                          onChange={handleEditInputChange}
                           className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Joining State</label>
                         <Input
                          name="joiningState"
                          value={editFormData.joiningState || ""}
                          onChange={handleEditInputChange}
                           className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                       <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Supporting Amount</label>
                         <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <Input
                              type="number"
                              name="supportingAmount"
                              value={editFormData.supportingAmount || ""}
                              onChange={handleEditInputChange}
                               className="bg-gray-50 border-gray-200 focus:bg-white transition-colors pl-8"
                            />
                         </div>
                      </div>
                       <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <Select
                          value={editFormData.membershipStatus || ""}
                          onValueChange={(value) => setEditFormData(prev => ({ ...prev, membershipStatus: value }))}
                        >
                          <SelectTrigger className="bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Suspended">Suspended</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                       <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Payment Status</label>
                        <Select
                          value={editFormData.paymentStatus || ""}
                          onValueChange={(value) => setEditFormData(prev => ({ ...prev, paymentStatus: value }))}
                        >
                          <SelectTrigger className="bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select Payment" />
                          </SelectTrigger>
                          <SelectContent>
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
                  <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 bg-white sticky bottom-0 p-4 -mx-8 -mb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] rounded-b-2xl">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditMember(null)}
                      className="px-6 py-2 h-11 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={updateLoading}
                      className="px-8 py-2 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-200 rounded-xl transition-all"
                    >
                      {updateLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Updating Profile...
                        </>
                      ) : (
                        "Save Changes"
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
