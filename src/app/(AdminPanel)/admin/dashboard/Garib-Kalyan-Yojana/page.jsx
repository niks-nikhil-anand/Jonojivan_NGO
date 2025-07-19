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
} from "lucide-react";

export default function GaribKalyanManagement() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    under_review: 0,
    approved: 0,
    rejected: 0,
  });

  const toast = {
    error: (message) => console.error(message),
    success: (message) => console.log(message),
  };

  useEffect(() => {
    fetchApplications();
  }, [searchTerm, statusFilter, sortField, sortOrder]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/jonojivan-garib-kalyan`);
      const data = await response.json();
      console.log(data);

      // Safely access the applications array
      let applicationsData = [];
      if (data && data.applications) {
        if (Array.isArray(data.applications)) {
          applicationsData = data.applications;
        } else if (
          data.applications.applications &&
          Array.isArray(data.applications.applications)
        ) {
          applicationsData = data.applications.applications;
        }
      }

      setApplications(applicationsData);
      calculateStats(applicationsData);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to fetch applications");
      // Set empty array on error to prevent undefined issues
      setApplications([]);
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
      pending: data.filter((app) => app?.applicationStatus === "pending")
        .length,
      under_review: data.filter(
        (app) => app?.applicationStatus === "under_review"
      ).length,
      approved: data.filter((app) => app?.applicationStatus === "approved")
        .length,
      rejected: data.filter((app) => app?.applicationStatus === "rejected")
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
      pending: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      under_review: {
        label: "Under Review",
        className: "bg-blue-100 text-blue-800 border-blue-200",
      },
      approved: {
        label: "Approved",
        className: "bg-green-100 text-green-800 border-green-200",
      },
      rejected: {
        label: "Rejected",
        className: "bg-red-100 text-red-800 border-red-200",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge variant="outline" className={`${config.className} font-medium`}>
        {config.label}
      </Badge>
    );
  };

  const updateApplicationStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/jonojivan-garib-kalyan/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          applicationStatus: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Status updated successfully");
        fetchApplications(); // Refresh the list
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const deleteApplication = async (id) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      const response = await fetch(`/api/jonojivan-garib-kalyan/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Application deleted successfully");
        fetchApplications(); // Refresh the list
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application");
    }
  };

  const viewApplication = (application) => {
    setSelectedApplication(application);
  };

  const filteredApplications = useMemo(() => {
    if (!Array.isArray(applications)) return [];

    return applications.filter((application) => {
      if (!application) return false;

      const matchesSearch =
        (application.fullName?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (application.contactNumber || "").includes(searchTerm) ||
        (application.documentNumber?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (application.accountNumber || "").includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" ||
        application.applicationStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = filteredApplications.slice(startIndex, endIndex);

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
          Garib Kalyan Yojana Management
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Total Applications
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
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Under Review</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-700">{stats.under_review}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Approved</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Rejected</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-500">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, contact, document number, or account number..."
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
            <SelectItem value="pending" className="text-black hover:bg-gray-100">Pending</SelectItem>
            <SelectItem value="under_review" className="text-black hover:bg-gray-100">Under Review</SelectItem>
            <SelectItem value="approved" className="text-black hover:bg-gray-100">Approved</SelectItem>
            <SelectItem value="rejected" className="text-black hover:bg-gray-100">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          <span className="ml-2 text-gray-600">Loading applications...</span>
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
                      onClick={() => handleSort("fullName")}
                      className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded transition-colors"
                    >
                      Full Name {getSortIcon("fullName")}
                    </button>
                  </TableHead>
                  <TableHead className="text-gray-700">Contact Number</TableHead>
                  <TableHead className="text-gray-700">Document Number</TableHead>
                  <TableHead className="text-gray-700">Account Number</TableHead>
                  <TableHead className="text-gray-700">Referral ID</TableHead>
                  <TableHead className="text-gray-700">Status</TableHead>
                  <TableHead className="text-gray-700">
                    <button
                      onClick={() => handleSort("createdAt")}
                      className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded transition-colors"
                    >
                      Applied Date {getSortIcon("createdAt")}
                    </button>
                  </TableHead>
                  <TableHead className="text-center text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentApplications.map((application) => (
                  <TableRow key={application._id} className="hover:bg-gray-50 border-gray-200">
                    <TableCell className="font-medium text-black">
                      {application.fullName}
                    </TableCell>
                    <TableCell className="text-gray-700">{application.contactNumber}</TableCell>
                    <TableCell className="font-mono text-sm text-gray-700">
                      {application.documentNumber}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-gray-700">
                      {application.accountNumber}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {application.referLinkIdCard || "N/A"}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(application.applicationStatus)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(application.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2 ">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => viewApplication(application)}
                              className="h-8 w-8 p-0 bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                        <Select
                          value={application.applicationStatus}
                          onValueChange={(value) =>
                            updateApplicationStatus(application._id, value)
                          }
                        >
                          <SelectTrigger className={`w-32 h-8 text-white font-medium rounded-md border-0
                            ${
                              application.applicationStatus === "approved"
                                ? "bg-black"
                                : application.applicationStatus === "pending"
                                ? "bg-gray-400"
                                : application.applicationStatus === "under_review"
                                ? "bg-gray-600"
                                : application.applicationStatus === "rejected"
                                ? "bg-gray-800"
                                : "bg-gray-500"
                            }
                          `}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300 ">
                            <SelectItem value="pending" className="text-black hover:bg-gray-100">Pending</SelectItem>
                            <SelectItem value="under_review" className="text-black hover:bg-gray-100  ">Under Review</SelectItem>
                            <SelectItem value="approved" className="text-black hover:bg-gray-100">Approved</SelectItem>
                            <SelectItem value="rejected" className="text-black hover:bg-gray-100">Rejected</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteApplication(application._id)}
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

            {filteredApplications.length === 0 && !loading && (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No applications found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredApplications.length > 0 && (
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
                  {Math.min(endIndex, filteredApplications.length)} of{" "}
                  {filteredApplications.length} entries
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

      {/* Application Detail Modal */}
      {selectedApplication && (
        <Dialog
          open={!!selectedApplication}
          onOpenChange={() => setSelectedApplication(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-gray-300">
            <DialogHeader className="border-b border-gray-200 pb-4">
              <DialogTitle className="text-xl font-semibold text-black">
                Application Details
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 bg-gray-50 p-6 rounded-md mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <p className="text-sm text-black font-medium mt-1">
                    {selectedApplication.fullName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <p className="text-sm text-black font-medium mt-1">
                    {selectedApplication.contactNumber}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Document Number
                  </label>
                  <p className="text-sm text-black font-mono font-medium mt-1">
                    {selectedApplication.documentNumber}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Account Number
                  </label>
                  <p className="text-sm text-black font-mono font-medium mt-1">
                    {selectedApplication.accountNumber}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Referral ID
                  </label>
                  <p className="text-sm text-black font-medium mt-1">
                    {selectedApplication.referLinkIdCard || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="mt-1">
                    {getStatusBadge(selectedApplication.applicationStatus)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <img
                    src={selectedApplication.photoUpload}
                    alt="Applicant Photo"
                    className="mt-2 w-full h-32 object-cover rounded border border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Aadhaar Card
                  </label>
                  <img
                    src={selectedApplication.aadhaarCard}
                    alt="Aadhaar Card"
                    className="mt-2 w-full h-32 object-cover rounded border border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Bank Passbook
                  </label>
                  <img
                    src={selectedApplication.bankPassbook}
                    alt="Bank Passbook"
                    className="mt-2 w-full h-32 object-cover rounded border border-gray-300 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 pt-4 border-t border-gray-200">
                <div>
                  <label className="font-medium text-gray-700">Applied Date:</label>
                  <p className="text-gray-600 mt-1">
                    {new Date(selectedApplication.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Last Updated:</label>
                  <p className="text-gray-600 mt-1">
                    {new Date(selectedApplication.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}