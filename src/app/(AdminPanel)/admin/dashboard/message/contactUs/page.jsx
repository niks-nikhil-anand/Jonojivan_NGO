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
  X,
  Mail,
  Phone,
  User,
  MessageSquare,
  Clock,
  Minus,
  Loader2
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

// Table components (basic HTML table with styling)
const Table = ({ children, className = '' }) => (
  <table className={`w-full ${className}`}>{children}</table>
);

const TableHeader = ({ children, className = '' }) => (
  <thead className={className}>{children}</thead>
);

const TableBody = ({ children, className = '' }) => (
  <tbody className={className}>{children}</tbody>
);

const TableRow = ({ children, className = '' }) => (
  <tr className={className}>{children}</tr>
);

const TableHead = ({ children, className = '' }) => (
  <th className={`px-4 py-3 text-left font-semibold ${className}`}>{children}</th>
);

const TableCell = ({ children, className = '' }) => (
  <td className={`px-4 py-3 ${className}`}>{children}</td>
);

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
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
        console.log(response);
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

  const truncateWords = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <Minus className="h-3 w-3" />;
    return sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />;
  };

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

  const handleView = async (id) => {
    try {
      setViewLoading(true);
      setViewModalOpen(true);
      
      // Try to fetch detailed contact data first
      try {
        const response = await axios.get(`/api/admin/dashboard/contactUs/${id}`);
        // Handle different possible response structures
        const contactData = response.data.data || response.data || response;
        setSelectedContact(contactData);
        toast.success("Contact details loaded");
      } catch (apiError) {
        console.warn("API call failed, using local data:", apiError);
        // Fallback to local data if API call fails
        const localContact = contacts.find(contact => contact._id === id);
        if (localContact) {
          setSelectedContact(localContact);
          toast.success("Contact details loaded from local data");
        } else {
          throw new Error("Contact not found");
        }
      }
    } catch (error) {
      console.error("Error fetching contact details:", error);
      toast.error("Failed to fetch contact details");
      setViewModalOpen(false);
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

  return (
    <div className="space-y-6 p-6 bg-white min-h-screen">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          <span className="ml-2 text-gray-600">Loading contacts...</span>
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <>
          {/* Header: Title, Search, Filter & Export */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-2xl font-semibold text-black">Contact Management</h2>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64 border-gray-300 bg-white text-black placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-32 border-gray-300 bg-white text-black hover:bg-gray-50 focus:border-gray-500 focus:ring-gray-500">
                  <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  <SelectItem value="all" className="text-black hover:bg-gray-100 focus:bg-gray-100">All Time</SelectItem>
                  <SelectItem value="today" className="text-black hover:bg-gray-100 focus:bg-gray-100">Today</SelectItem>
                  <SelectItem value="week" className="text-black hover:bg-gray-100 focus:bg-gray-100">Last Week</SelectItem>
                  <SelectItem value="month" className="text-black hover:bg-gray-100 focus:bg-gray-100">Last Month</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button 
                  onClick={exportToCSV} 
                  variant="outline" 
                  size="sm"
                  className="border-gray-300 bg-white text-black hover:bg-gray-100"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  CSV
                </Button>
                <Button 
                  onClick={exportToPDF} 
                  variant="outline" 
                  size="sm"
                  className="border-gray-300 bg-white text-black hover:bg-gray-100"
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-gray-200 bg-white">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-black">{contacts.length}</div>
                <p className="text-sm text-gray-600">Total Contacts</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 bg-white">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-black">{filteredContacts.length}</div>
                <p className="text-sm text-gray-600">Filtered Results</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 bg-white">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-black">{currentContacts.length}</div>
                <p className="text-sm text-gray-600">Current Page</p>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="text-black font-semibold">
                    <button 
                      onClick={() => handleSort("firstName")} 
                      className="flex items-center gap-1 hover:bg-gray-200 p-1 rounded transition-colors"
                    >
                      First Name {getSortIcon("firstName")}
                    </button>
                  </TableHead>
                  <TableHead className="text-black font-semibold">
                    <button 
                      onClick={() => handleSort("lastName")} 
                      className="flex items-center gap-1 hover:bg-gray-200 p-1 rounded transition-colors"
                    >
                      Last Name {getSortIcon("lastName")}
                    </button>
                  </TableHead>
                  <TableHead className="text-black font-semibold">
                    <button 
                      onClick={() => handleSort("email")} 
                      className="flex items-center gap-1 hover:bg-gray-200 p-1 rounded transition-colors"
                    >
                      Email {getSortIcon("email")}
                    </button>
                  </TableHead>
                  <TableHead className="text-black font-semibold">
                    <button 
                      onClick={() => handleSort("mobileNumber")} 
                      className="flex items-center gap-1 hover:bg-gray-200 p-1 rounded transition-colors"
                    >
                      Phone {getSortIcon("mobileNumber")}
                    </button>
                  </TableHead>
                  <TableHead className="text-black font-semibold">Message</TableHead>
                  <TableHead className="text-black font-semibold">
                    <button 
                      onClick={() => handleSort("createdAt")} 
                      className="flex items-center gap-1 hover:bg-gray-200 p-1 rounded transition-colors"
                    >
                      Created {getSortIcon("createdAt")}
                    </button>
                  </TableHead>
                  <TableHead className="text-center text-black font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentContacts.map((contact) => (
                  <TableRow key={contact._id} className="hover:bg-gray-50 border-b border-gray-200">
                    <TableCell className="font-medium text-black">{contact.firstName}</TableCell>
                    <TableCell className="font-medium text-black">{contact.lastName}</TableCell>
                    <TableCell className="text-black">{contact.email}</TableCell>
                    <TableCell className="text-black">{contact.mobileNumber}</TableCell>
                    <TableCell className="max-w-64 text-sm text-gray-600">
                      {truncateWords(contact.message, 8)}
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 text-sm">
                        {new Date(contact.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="text-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(contact._id)}
                        disabled={viewLoading}
                        className="h-8 w-8 p-0 border-gray-300 bg-white text-black hover:bg-gray-100"
                      >
                        {viewLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 border-gray-300 bg-white text-black hover:bg-gray-100 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-black">Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600">
                              This action cannot be undone. This will permanently delete the contact.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-white text-black border-gray-300 hover:bg-gray-100">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(contact._id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {currentContacts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Search className="h-10 w-10 mx-auto mb-2" />
                <p className="text-black">No contacts found.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstContact + 1} to {Math.min(indexOfLastContact, filteredContacts.length)} of {filteredContacts.length} results
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-gray-300 bg-white text-black hover:bg-gray-100"
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
                        className={currentPage === pageNumber ? 
                          "bg-black text-white hover:bg-gray-800" : 
                          "border-gray-300 bg-white text-black hover:bg-gray-100"
                        }
                      >
                        {pageNumber}
                      </Button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="px-2 text-gray-500">...</span>;
                  }
                  return null;
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-gray-300 bg-white text-black hover:bg-gray-100"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* View Contact Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
          <DialogHeader className="bg-gray-50 -m-6 mb-0 p-6 rounded-t-lg">
            <DialogTitle className="flex items-center gap-2 text-black">
              <User className="h-5 w-5 text-blue-600" />
              Contact Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedContact ? (
            <div className="space-y-6 py-4 bg-gray-50 -mx-6 px-6 -mb-6 pb-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white shadow-sm border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <h3 className="font-semibold text-sm text-gray-700">Name</h3>
                    </div>
                    <p className="text-lg font-medium text-black">
                      {selectedContact.firstName} {selectedContact.lastName}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <h3 className="font-semibold text-sm text-gray-700">Submitted On</h3>
                    </div>
                    <p className="text-lg text-black">
                      {formatDate(selectedContact.createdAt)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white shadow-sm border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-red-600" />
                      <h3 className="font-semibold text-sm text-gray-700">Email Address</h3>
                    </div>
                    <p className="text-lg break-all text-black">
                      {selectedContact.email}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-purple-600" />
                      <h3 className="font-semibold text-sm text-gray-700">Phone Number</h3>
                    </div>
                    <p className="text-lg text-black">
                      {selectedContact.mobileNumber || 'Not provided'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Message */}
              <Card className="bg-white shadow-sm border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-orange-600" />
                    <h3 className="font-semibold text-sm text-gray-700">Message</h3>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {selectedContact.message || 'No message provided'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information (if any) */}
              {selectedContact.subject && (
                <Card className="bg-white shadow-sm border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-indigo-600" />
                      <h3 className="font-semibold text-sm text-gray-700">Subject</h3>
                    </div>
                    <p className="text-lg text-black">
                      {selectedContact.subject}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 bg-white -mx-6 px-6 -mb-6 pb-6 rounded-b-lg">
                <Button
                  variant="outline"
                  onClick={() => setViewModalOpen(false)}
                  className="bg-white hover:bg-gray-50 border-gray-300 text-black"
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${selectedContact.email}`)}
                  className="text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Reply via Email
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-8 bg-gray-50 -mx-6 -mb-6 rounded-b-lg">
              <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
              <span className="ml-2 text-gray-700">Loading contact details...</span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactUs;