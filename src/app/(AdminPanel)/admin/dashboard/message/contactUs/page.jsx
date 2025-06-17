"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Eye,
  ChevronUp,
  ChevronDown,
  Calendar,
  FileText,
  Table,
  X,
  Mail,
  Phone,
  User,
  MessageSquare,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Loader from "@/components/loader/loader";

const News = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterBy, setFilterBy] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const contactsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/admin/dashboard/contactUs");
        console.log(response.data.data);
        setContacts(Array.isArray(response.data.data) ? response.data.data : []);
        toast.success("Contacts loaded successfully");
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to load contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Filter and search logic
  const filteredContacts = useMemo(() => {
    let filtered = [...contacts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        Object.values(contact).some(value =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(contact => 
            new Date(contact.createdAt) >= filterDate
          );
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(contact => 
            new Date(contact.createdAt) >= filterDate
          );
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(contact => 
            new Date(contact.createdAt) >= filterDate
          );
          break;
      }
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "createdAt") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [contacts, searchTerm, sortField, sortDirection, dateFilter]);

  // Pagination
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleView = async (id) => {
    try {
      setViewLoading(true);
      const response = await axios.get(`/api/admin/dashboard/contactUs/${id}`);
      setSelectedContact(response.data);
      setViewModalOpen(true);
      toast.success("Contact details loaded");
    } catch (error) {
      console.error("Error fetching contact details:", error);
      toast.error("Failed to fetch contact details");
    } finally {
      setViewLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/dashboard/contactUs/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
    }
  };

  const exportToCSV = () => {
    const headers = ["First Name", "Last Name", "Email", "Phone Number", "Message", "Created At"];
    const csvData = filteredContacts.map(contact => [
      contact.firstName,
      contact.lastName,
      contact.email,
      contact.mobileNumber,
      contact.message,
      new Date(contact.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(field => `"${field || ""}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `contacts_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV exported successfully");
  };

  const exportToPDF = () => {
    // Simple PDF export using browser print
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <html>
        <head>
          <title>Contacts Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Contacts Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <p>Total Contacts: ${filteredContacts.length}</p>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              ${filteredContacts.map(contact => `
                <tr>
                  <td>${contact.firstName}</td>
                  <td>${contact.lastName}</td>
                  <td>${contact.email}</td>
                  <td>${contact.mobileNumber}</td>
                  <td>${contact.message}</td>
                  <td>${new Date(contact.createdAt).toLocaleDateString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
    toast.success("PDF export initiated");
  };

  const truncateWords = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table className="h-5 w-5" />
            Contact Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Date Filter */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-40 bg-white">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date filter" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg">
                <SelectItem value="all" className="hover:bg-gray-50">All Time</SelectItem>
                <SelectItem value="today" className="hover:bg-gray-50">Today</SelectItem>
                <SelectItem value="week" className="hover:bg-gray-50">Last Week</SelectItem>
                <SelectItem value="month" className="hover:bg-gray-50">Last Month</SelectItem>
              </SelectContent>
            </Select>

            {/* Export Buttons */}
            <div className="flex gap-2">
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                CSV
              </Button>
              <Button onClick={exportToPDF} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{contacts.length}</div>
                <p className="text-sm text-gray-500">Total Contacts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{filteredContacts.length}</div>
                <p className="text-sm text-gray-500">Filtered Results</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{currentContacts.length}</div>
                <p className="text-sm text-gray-500">Current Page</p>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50/50">
                    {[
                      { key: "firstName", label: "First Name" },
                      { key: "lastName", label: "Last Name" },
                      { key: "email", label: "Email" },
                      { key: "mobileNumber", label: "Phone" },
                      { key: "message", label: "Message" },
                      { key: "createdAt", label: "Created At" }
                    ].map((column) => (
                      <th
                        key={column.key}
                        className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-700"
                        onClick={() => handleSort(column.key)}
                      >
                        <div className="flex items-center gap-2">
                          {column.label}
                          {sortField === column.key && (
                            sortDirection === "asc" ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentContacts.map((contact) => (
                    <tr key={contact._id} className="border-b hover:bg-gray-50/50">
                      <td className="px-4 py-3 text-sm">{contact.firstName}</td>
                      <td className="px-4 py-3 text-sm">{contact.lastName}</td>
                      <td className="px-4 py-3 text-sm">{contact.email}</td>
                      <td className="px-4 py-3 text-sm">{contact.mobileNumber}</td>
                      <td className="px-4 py-3 text-sm max-w-xs">
                        <div className="truncate" title={contact.message}>
                          {truncateWords(contact.message, 10)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Badge variant="secondary">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            onClick={() => handleView(contact._id)}
                            variant="ghost"
                            size="sm"
                            disabled={viewLoading}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the contact.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(contact._id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstContact + 1} to {Math.min(indexOfLastContact, filteredContacts.length)} of {filteredContacts.length} results
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="px-2">...</span>;
                  }
                  return null;
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Contact Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-6 py-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <h3 className="font-semibold text-sm text-gray-700">Name</h3>
                    </div>
                    <p className="text-lg font-medium">
                      {selectedContact.firstName} {selectedContact.lastName}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <h3 className="font-semibold text-sm text-gray-700">Submitted On</h3>
                    </div>
                    <p className="text-lg">
                      {formatDate(selectedContact.createdAt)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-red-600" />
                      <h3 className="font-semibold text-sm text-gray-700">Email Address</h3>
                    </div>
                    <p className="text-lg break-all">
                      {selectedContact.email}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-purple-600" />
                      <h3 className="font-semibold text-sm text-gray-700">Phone Number</h3>
                    </div>
                    <p className="text-lg">
                      {selectedContact.mobileNumber || 'Not provided'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Message */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-orange-600" />
                    <h3 className="font-semibold text-sm text-gray-700">Message</h3>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {selectedContact.message || 'No message provided'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information (if any) */}
              {selectedContact.subject && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-indigo-600" />
                      <h3 className="font-semibold text-sm text-gray-700">Subject</h3>
                    </div>
                    <p className="text-lg">
                      {selectedContact.subject}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setViewModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${selectedContact.email}`)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Reply via Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default News;