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

// Icons
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Loader2,
  Minus,
  Search,
  Award,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Medal,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
} from "lucide-react";
import downloadCertificateFunction from "@/lib/downloadCertificateFunction";

export default function CertificateManagement() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [downloadingId, setDownloadingId] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    active: 0,
    blocked: 0,
    pending: 0,
  });

  useEffect(() => {
    fetchCertificates();
  }, [searchTerm, statusFilter, categoryFilter, sortField, sortOrder]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter]);

  const fetchCertificates = async () => {
  try {
    setLoading(true);
    const response = await fetch(`/api/admin/dashboard/certificate/member`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API Response:", data);

    // Based on your API response structure, the certificates are in data.data
    let certificatesData = [];
    
    if (data && data.data && Array.isArray(data.data)) {
      certificatesData = data.data;
    } else if (data && Array.isArray(data)) {
      // Fallback: if the response is directly an array
      certificatesData = data;
    }

    console.log("Processed certificates:", certificatesData);
    setCertificates(certificatesData);
    calculateStats(certificatesData);
    
  } catch (error) {
    console.error("Error fetching certificates:", error);
    toast.error("Failed to fetch certificates");
    setCertificates([]);
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
      draft: data.filter((cert) => cert?.status === "Draft").length,
      active: data.filter((cert) => cert?.status === "Active").length,
      blocked: data.filter((cert) => cert?.status === "Blocked").length,
      pending: data.filter((cert) => cert?.status === "Pending").length,
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
      Draft: {
        label: "Draft",
        className: "bg-gray-100 text-gray-800 border-gray-200",
        icon: <AlertCircle className="h-3 w-3 mr-1" />,
      },
      Active: {
        label: "Active",
        className: "bg-green-100 text-green-800 border-green-200",
        icon: <CheckCircle className="h-3 w-3 mr-1" />,
      },
      Blocked: {
        label: "Blocked",
        className: "bg-red-100 text-red-800 border-red-200",
        icon: <XCircle className="h-3 w-3 mr-1" />,
      },
      Pending: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <Clock className="h-3 w-3 mr-1" />,
      },
    };

    const config = statusConfig[status] || statusConfig.Draft;
    return (
      <Badge variant="outline" className={`${config.className} font-medium`}>
        <div className="flex items-center">
          {config.icon}
          {config.label}
        </div>
      </Badge>
    );
  };

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      Achievement: {
        label: "Achievement",
        className: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <Trophy className="h-3 w-3 mr-1" />,
      },
      Participation: {
        label: "Participation",
        className: "bg-purple-100 text-purple-800 border-purple-200",
        icon: <Medal className="h-3 w-3 mr-1" />,
      },
      Excellence: {
        label: "Excellence",
        className: "bg-orange-100 text-orange-800 border-orange-200",
        icon: <Star className="h-3 w-3 mr-1" />,
      },
    };

    const config = categoryConfig[category] || categoryConfig.Achievement;
    return (
      <Badge variant="outline" className={`${config.className} font-medium`}>
        <div className="flex items-center">
          {config.icon}
          {config.label}
        </div>
      </Badge>
    );
  };

  const deleteCertificate = async (id) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    try {
      const response = await fetch(`/api/admin/dashboard/certificate/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Certificate deleted successfully");
        fetchCertificates();
      } else {
        toast.error(data.msg || "Failed to delete certificate");
        console.error("API Error:", data.msg);
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
      toast.error("Failed to delete certificate");
    }
  };

  const filteredCertificates = useMemo(() => {
    if (!Array.isArray(certificates)) return [];

    return certificates.filter((certificate) => {
      if (!certificate) return false;

      const matchesSearch =
        (certificate.name?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (certificate.email?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (certificate.member?.user?.fullName?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (certificate.member?.membershipId || "").includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || certificate.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || certificate.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [certificates, searchTerm, statusFilter, categoryFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCertificates = filteredCertificates.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 max-h-[80vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-black">
          Certificate Management System
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Total Certificates
            </CardTitle>
            <Award className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Draft
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-500">
              {stats.draft}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Active
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
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
              Blocked
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.blocked}
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
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, email, member name, membership ID..."
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
            <SelectItem value="all" className="text-black hover:bg-gray-100">
              All Status
            </SelectItem>
            <SelectItem value="Draft" className="text-black hover:bg-gray-100">
              Draft
            </SelectItem>
            <SelectItem value="Active" className="text-black hover:bg-gray-100">
              Active
            </SelectItem>
            <SelectItem
              value="Blocked"
              className="text-black hover:bg-gray-100"
            >
              Blocked
            </SelectItem>
            <SelectItem
              value="Pending"
              className="text-black hover:bg-gray-100"
            >
              Pending
            </SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48 bg-white border-gray-300 text-black">
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-300">
            <SelectItem value="all" className="text-black hover:bg-gray-100">
              All Categories
            </SelectItem>
            <SelectItem
              value="Achievement"
              className="text-black hover:bg-gray-100"
            >
              Achievement
            </SelectItem>
            <SelectItem
              value="Participation"
              className="text-black hover:bg-gray-100"
            >
              Participation
            </SelectItem>
            <SelectItem
              value="Excellence"
              className="text-black hover:bg-gray-100"
            >
              Excellence
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          <span className="ml-2 text-gray-600">Loading certificates...</span>
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
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded transition-colors"
                    >
                      Certificate Name {getSortIcon("name")}
                    </button>
                  </TableHead>
                  <TableHead className="text-gray-700">Email</TableHead>
                  <TableHead className="text-gray-700">Member</TableHead>
                  <TableHead className="text-gray-700">Membership ID</TableHead>
                  <TableHead className="text-gray-700">Category</TableHead>
                  <TableHead className="text-gray-700">Status</TableHead>
                  <TableHead className="text-gray-700">
                    <button
                      onClick={() => handleSort("createdAt")}
                      className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded transition-colors"
                    >
                      Created Date {getSortIcon("createdAt")}
                    </button>
                  </TableHead>
                  <TableHead className="text-center text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCertificates.map((certificate) => (
                  <TableRow
                    key={certificate._id}
                    className="hover:bg-gray-50 border-gray-200"
                  >
                    <TableCell className="font-medium text-black">
                      {certificate.name || "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {certificate.email || "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {certificate.member?.user?.fullName || "N/A"}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-gray-700">
                      {certificate.member?.membershipId || "N/A"}
                    </TableCell>
                    <TableCell>
                      {getCategoryBadge(certificate.category)}
                    </TableCell>
                    <TableCell>{getStatusBadge(certificate.status)}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(certificate.createdAt).toLocaleDateString(
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
                        {/* Download Button - Only shown for Active certificates */}
                        {certificate.status === "Active" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              downloadCertificateFunction(
                                certificate,
                                setDownloadingId
                              )
                            }
                            disabled={downloadingId === certificate._id}
                            className="h-8 w-8 p-0 bg-white border-gray-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-50"
                            title="Download Certificate"
                          >
                            {downloadingId === certificate._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="h-4 w-4" />
                            )}
                          </Button>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteCertificate(certificate._id)}
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

            {filteredCertificates.length === 0 && !loading && (
              <div className="text-center py-12 text-gray-500">
                <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No certificates found</p>
                <p className="text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredCertificates.length > 0 && (
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
                  {Math.min(endIndex, filteredCertificates.length)} of{" "}
                  {filteredCertificates.length} entries
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
    </div>
  );
}
