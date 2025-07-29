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

// Icons
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Filter,
  Loader2,
  Minus,
  Search,
  Award,
  Eye,
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
  const [selectedCertificate, setSelectedCertificate] = useState(null);
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
      const response = await fetch(`/api/admin/dashboard/certificate`);
      const data = await response.json();
      console.log(data);

      // Safely access the certificates array
      let certificatesData = [];
      if (data && data.certificates) {
        if (Array.isArray(data.certificates)) {
          certificatesData = data.certificates;
        } else if (
          data.certificates.certificates &&
          Array.isArray(data.certificates.certificates)
        ) {
          certificatesData = data.certificates.certificates;
        }
      }

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

  const updateCertificateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/admin/dashboard/certificate/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        toast.success("Certificate status updated successfully");
        fetchCertificates();
      } else {
        toast.error(data.msg || "Failed to update certificate status");
        console.error("API Error:", data.msg);
      }
    } catch (error) {
      console.error("Error updating certificate status:", error);
      toast.error("Failed to update certificate status");
    }
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

  const viewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
  };

  // Certificate download function
  // Certificate download function with updated design
  const downloadCertificate = async (certificate) => {
    if (certificate.status !== "Active") {
      toast.error("Only active certificates can be downloaded");
      return;
    }

    try {
      setDownloadingId(certificate._id);

      // Import jsPDF dynamically to avoid SSR issues
      const { default: jsPDF } = await import("jspdf");

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Certificate dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Colors matching the template
      const goldColor = "#D4A574"; // Elegant gold
      const darkGray = "#2D2D2D"; // Dark text
      const lightGray = "#F8F8F8"; // Background

      // Background with slight cream color
      doc.setFillColor(248, 248, 245);
      doc.rect(0, 0, pageWidth, pageHeight, "F");

      // Outer decorative border
      doc.setDrawColor(212, 165, 116); // Gold color
      doc.setLineWidth(3);
      doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

      // Inner decorative border
      doc.setDrawColor(212, 165, 116);
      doc.setLineWidth(1);
      doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

      // Corner decorative elements (simple gold squares)
      doc.setFillColor(212, 165, 116);
      // Top corners
      doc.rect(15, 15, 8, 8, "F");
      doc.rect(pageWidth - 23, 15, 8, 8, "F");
      // Bottom corners
      doc.rect(15, pageHeight - 23, 8, 8, "F");
      doc.rect(pageWidth - 23, pageHeight - 23, 8, 8, "F");

      // Decorative pattern line at top
      doc.setDrawColor(212, 165, 116);
      doc.setLineWidth(0.5);
      const patternY = 30;
      for (let x = 40; x < pageWidth - 40; x += 6) {
        doc.line(x, patternY, x + 3, patternY);
      }

      // Certificate title
      doc.setFontSize(36);
      doc.setTextColor(45, 45, 45);
      doc.setFont("helvetica", "bold");
      const title = "Certificate Of Achievement";
      const titleWidth = doc.getTextWidth(title);
      doc.text(title, (pageWidth - titleWidth) / 2, 50);

      // Decorative line under title
      doc.setDrawColor(212, 165, 116);
      doc.setLineWidth(2);
      doc.line((pageWidth - 120) / 2, 55, (pageWidth + 120) / 2, 55);

      // "Proudly Presented To" text
      doc.setFontSize(14);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      const presentedText = "PROUDLY PRESENTED TO";
      const presentedWidth = doc.getTextWidth(presentedText);
      doc.text(presentedText, (pageWidth - presentedWidth) / 2, 75);

      // Recipient name with elegant styling
      doc.setFontSize(32);
      doc.setTextColor(45, 45, 45);
      doc.setFont("helvetica", "bold");
      const recipientName =
        certificate.member?.user?.fullName || certificate.name || "N/A";
      const nameWidth = doc.getTextWidth(recipientName);
      doc.text(recipientName, (pageWidth - nameWidth) / 2, 100);

      // Elegant underline for name
      doc.setDrawColor(212, 165, 116);
      doc.setLineWidth(1.5);
      doc.line(
        (pageWidth - nameWidth) / 2,
        105,
        (pageWidth + nameWidth) / 2,
        105
      );

      // Description text
      doc.setFontSize(14);
      doc.setTextColor(80, 80, 80);
      doc.setFont("helvetica", "normal");

      // Multi-line description similar to the template
      const descriptionLines = [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever",
        "since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five",
        "centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      ];

      let descY = 120;
      descriptionLines.forEach((line) => {
        const lineWidth = doc.getTextWidth(line);
        doc.text(line, (pageWidth - lineWidth) / 2, descY);
        descY += 8;
      });

      // Certificate details in a more structured format
      const detailsY = 155;

      // Left side - Certificate ID
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      doc.text("Certificate ID:", 40, detailsY);
      doc.setTextColor(45, 45, 45);
      doc.setFont("helvetica", "bold");
      doc.text(
        certificate._id.substring(0, 12).toUpperCase(),
        40,
        detailsY + 6
      );

      // Center - Category
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      const categoryLabel = "Category:";
      const categoryLabelWidth = doc.getTextWidth(categoryLabel);
      doc.text(categoryLabel, (pageWidth - categoryLabelWidth) / 2, detailsY);
      doc.setTextColor(45, 45, 45);
      doc.setFont("helvetica", "bold");
      const categoryText = certificate.category || "Achievement";
      const categoryTextWidth = doc.getTextWidth(categoryText);
      doc.text(categoryText, (pageWidth - categoryTextWidth) / 2, detailsY + 6);

      // Right side - Membership ID
      if (certificate.member?.membershipId) {
        doc.setTextColor(100, 100, 100);
        doc.setFont("helvetica", "normal");
        doc.text("Membership ID:", pageWidth - 80, detailsY);
        doc.setTextColor(45, 45, 45);
        doc.setFont("helvetica", "bold");
        doc.text(certificate.member.membershipId, pageWidth - 80, detailsY + 6);
      }

      // Date section
      doc.setFontSize(12);
      doc.setTextColor(45, 45, 45);
      doc.setFont("helvetica", "normal");
      const dateText = new Date(certificate.createdAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "January",
          day: "numeric",
        }
      );
      doc.text(`Date: ${dateText}`, 40, pageHeight - 40);

      // Signature section
      doc.setFontSize(12);
      doc.setTextColor(45, 45, 45);
      doc.setFont("helvetica", "normal");
      doc.text("Signature", pageWidth - 60, pageHeight - 50);

      // Signature line
      doc.setDrawColor(45, 45, 45);
      doc.setLineWidth(0.5);
      doc.line(
        pageWidth - 80,
        pageHeight - 35,
        pageWidth - 25,
        pageHeight - 35
      );

      // Award icon representation (simple geometric shape)
      doc.setFillColor(212, 165, 116);
      const iconX = pageWidth / 2 - 10;
      const iconY = 165;

      // Create a simple award medallion
      doc.circle(iconX, iconY, 8, "F");
      doc.setFillColor(255, 255, 255);
      doc.circle(iconX, iconY, 5, "F");
      doc.setFillColor(212, 165, 116);
      doc.circle(iconX, iconY, 3, "F");

      // Decorative pattern at bottom
      doc.setDrawColor(212, 165, 116);
      doc.setLineWidth(0.5);
      const bottomPatternY = pageHeight - 25;
      for (let x = 40; x < pageWidth - 40; x += 6) {
        doc.line(x, bottomPatternY, x + 3, bottomPatternY);
      }

      // Generate filename
      const fileName = `certificate_${
        certificate.member?.user?.fullName?.replace(/\s+/g, "_") ||
        certificate.name?.replace(/\s+/g, "_") ||
        "certificate"
      }_${new Date().getTime()}.pdf`;

      // Save the PDF
      doc.save(fileName);

      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      console.error("Error generating certificate:", error);
      toast.error("Failed to download certificate");
    } finally {
      setDownloadingId(null);
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => viewCertificate(certificate)}
                              className="h-8 w-8 p-0 bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                        </Dialog>

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

                        <Select
                          value={certificate.status}
                          onValueChange={(value) =>
                            updateCertificateStatus(certificate._id, value)
                          }
                        >
                          <SelectTrigger
                            className={`w-24 h-8 text-white font-medium rounded-md border-0 text-xs
                            ${
                              certificate.status === "Active"
                                ? "bg-green-600"
                                : certificate.status === "Draft"
                                ? "bg-gray-500"
                                : certificate.status === "Blocked"
                                ? "bg-red-600"
                                : certificate.status === "Pending"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                            }
                          `}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300">
                            <SelectItem
                              value="Draft"
                              className="text-black hover:bg-gray-100"
                            >
                              Draft
                            </SelectItem>
                            <SelectItem
                              value="Active"
                              className="text-black hover:bg-gray-100"
                            >
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

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <Dialog
          open={!!selectedCertificate}
          onOpenChange={() => setSelectedCertificate(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-gray-300">
            <DialogHeader className="border-b border-gray-200 pb-4">
              <DialogTitle className="text-xl font-semibold text-black flex items-center justify-between">
                Certificate Details
                {selectedCertificate.status === "Active" && (
                  <Button
                    onClick={() => downloadCertificate(selectedCertificate)}
                    disabled={downloadingId === selectedCertificate._id}
                    className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {downloadingId === selectedCertificate._id ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                )}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 bg-gray-50 p-6 rounded-md mt-4">
              {/* Certificate Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Certificate Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Certificate Name
                      </label>
                      <p className="text-sm text-black font-medium mt-1">
                        {selectedCertificate.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <p className="text-sm text-black font-medium mt-1">
                        {selectedCertificate.email || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <p className="text-sm font-medium mt-1">
                        {getCategoryBadge(selectedCertificate.category)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <p className="text-sm font-medium mt-1">
                        {getStatusBadge(selectedCertificate.status)}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Member Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Member Name
                      </label>
                      <p className="text-sm text-black font-medium mt-1">
                        {selectedCertificate.member?.user?.fullName || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Membership ID
                      </label>
                      <p className="text-sm text-black font-mono font-medium mt-1">
                        {selectedCertificate.member?.membershipId || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Member Email
                      </label>
                      <p className="text-sm text-black font-medium mt-1">
                        {selectedCertificate.member?.user?.email || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Committee
                      </label>
                      <p className="text-sm text-black font-medium mt-1">
                        {selectedCertificate.member?.committee || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">
                  Timeline Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Created Date
                    </label>
                    <p className="text-sm text-black font-medium mt-1">
                      {new Date(
                        selectedCertificate.createdAt
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Last Updated
                    </label>
                    <p className="text-sm text-black font-medium mt-1">
                      {new Date(
                        selectedCertificate.updatedAt
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
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
