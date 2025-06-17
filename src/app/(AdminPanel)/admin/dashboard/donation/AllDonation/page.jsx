"use client"
import React, { useEffect, useState, useMemo } from "react";
import { 
  Search, 
  Download, 
  Trash2, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  Filter,
  FileText,
  FileSpreadsheet,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
import { Badge } from "@/components/ui/badge";

const DonationTable = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [donationsPerPage, setDonationsPerPage] = useState(15);
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);

 

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("/api/donationSuccess");
        console.log(response)
        setDonations(Array.isArray(response.data.donations) ? response.data.donations : []);
        
        // Using sample data for demonstration
        setDonations(sampleDonations);
      } catch (error) {
        console.error("Error fetching donations:", error);
        toast.error("Failed to fetch donations");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Filtering and searching logic
  const filteredDonations = useMemo(() => {
    let filtered = [...donations];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(donation =>
        donation.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.razorpay_payment_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (donation.panCardNumber && donation.panCardNumber.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Payment method filter
    if (paymentMethodFilter !== "all") {
      filtered = filtered.filter(donation => 
        donation.paymentMethod.toLowerCase() === paymentMethodFilter.toLowerCase()
      );
    }

    // Amount filter
    if (amountFilter !== "all") {
      filtered = filtered.filter(donation => {
        const amount = donation.amount;
        switch (amountFilter) {
          case "0-1000": return amount <= 1000;
          case "1001-5000": return amount > 1000 && amount <= 5000;
          case "5001-10000": return amount > 5000 && amount <= 10000;
          case "10000+": return amount > 10000;
          default: return true;
        }
      });
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      filtered = filtered.filter(donation => {
        const donationDate = new Date(donation.createdAt);
        const diffTime = Math.abs(now - donationDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        switch (dateFilter) {
          case "today": return diffDays <= 1;
          case "week": return diffDays <= 7;
          case "month": return diffDays <= 30;
          case "year": return diffDays <= 365;
          default: return true;
        }
      });
    }

    return filtered;
  }, [donations, searchTerm, paymentMethodFilter, amountFilter, dateFilter]);

  // Sorting logic
  const sortedDonations = useMemo(() => {
    if (!sortField) return filteredDonations;

    return [...filteredDonations].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle different data types
      if (sortField === 'amount') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortField === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredDonations, sortField, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(sortedDonations.length / donationsPerPage);
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = sortedDonations.slice(indexOfFirstDonation, indexOfLastDonation);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortOrder === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const handleDownload = async (id) => {
    try {
      const donation = donations.find(d => d._id === id);
      if (!donation) {
        toast.error("Donation not found");
        return;
      }

      const pdfParams = {
        fullName: donation.fullName || "Unknown",
        panCard: donation.panCardNumber || "N/A",
        amount: donation.amount || 0,
        bankName: "Unknown Bank",
        receiptNo: donation.razorpay_payment_id || "000",
        date: new Date(donation.createdAt).toLocaleDateString(),
        transactionId: donation.razorpay_payment_id || "N/A",
      };

      await generatePdfReceiptClient(pdfParams);
      toast.success("Receipt downloaded successfully!");
    } catch (error) {
      console.error("Error generating receipt:", error);
      toast.error("Failed to generate receipt.");
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      const toastId = toast.loading("Deleting donation...");
      
      // Simulate API call
      // await axios.delete(`/api/admin/dashboard/donation/${deleteId}`);
      
      setDonations(donations.filter((donation) => donation._id !== deleteId));
      setShowDeleteDialog(false);
      setDeleteId(null);
      
      toast.success("Donation deleted successfully!", { id: toastId });
    } catch (error) {
      console.error("Error deleting donation:", error);
      toast.error("Failed to delete the donation. Please try again.");
    }
  };

  const exportToCSV = () => {
    const headers = ['Full Name', 'Email', 'PAN Card', 'Amount', 'Payment Method', 'Payment ID', 'Date'];
    const csvContent = [
      headers.join(','),
      ...sortedDonations.map(donation =>
        [
          `"${donation.fullName}"`,
          `"${donation.email}"`,
          `"${donation.panCardNumber || 'N/A'}"`,
          donation.amount,
          `"${donation.paymentMethod}"`,
          `"${donation.razorpay_payment_id}"`,
          `"${new Date(donation.createdAt).toLocaleDateString()}"`
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `donations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("CSV exported successfully!");
  };

  const exportToPDF = async () => {
    try {
      // This is a simplified PDF export. You might want to use a library like jsPDF
      toast.info("PDF export functionality would be implemented here");
    } catch (error) {
      toast.error("Failed to export PDF");
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setPaymentMethodFilter("all");
    setAmountFilter("all");
    setDateFilter("all");
    setCurrentPage(1);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Donation Management</CardTitle>
        
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search donations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="card">Card</SelectItem>
              </SelectContent>
            </Select>

            <Select value={amountFilter} onValueChange={setAmountFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Amount Range" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Amounts</SelectItem>
                <SelectItem value="0-1000">₹0 - ₹1,000</SelectItem>
                <SelectItem value="1001-5000">₹1,001 - ₹5,000</SelectItem>
                <SelectItem value="5001-10000">₹5,001 - ₹10,000</SelectItem>
                <SelectItem value="10000+">₹10,000+</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={resetFilters} size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Export and Actions */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstDonation + 1} to {Math.min(indexOfLastDonation, sortedDonations.length)} of {sortedDonations.length} donations
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem onClick={exportToCSV}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToPDF}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Select value={donationsPerPage.toString()} onValueChange={(value) => setDonationsPerPage(parseInt(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50">
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('fullName')}
                >
                  <div className="flex items-center gap-2">
                    Full Name
                    {getSortIcon('fullName')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center gap-2">
                    Email
                    {getSortIcon('email')}
                  </div>
                </TableHead>
                <TableHead>PAN Card</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center gap-2">
                    Amount
                    {getSortIcon('amount')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('paymentMethod')}
                >
                  <div className="flex items-center gap-2">
                    Payment Method
                    {getSortIcon('paymentMethod')}
                  </div>
                </TableHead>
                <TableHead>Payment ID</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center gap-2">
                    Date
                    {getSortIcon('createdAt')}
                  </div>
                </TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentDonations.map((donation) => (
                <TableRow key={donation._id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{donation.fullName}</TableCell>
                  <TableCell className="text-sm text-gray-600">{donation.email}</TableCell>
                  <TableCell>
                    {donation.panCardNumber ? (
                      <Badge variant="outline">{donation.panCardNumber}</Badge>
                    ) : (
                      <span className="text-gray-400 text-sm">Not Available</span>
                    )}
                  </TableCell>
                  <TableCell className="font-semibold text-green-600">
                    ₹{donation.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{donation.paymentMethod}</Badge>
                  </TableCell>
                  <TableCell className="text-sm font-mono text-gray-600">
                    {donation.razorpay_payment_id}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      {new Date(donation.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(donation.createdAt).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(donation._id)}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => confirmDelete(donation._id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const pageNumber = Math.max(1, currentPage - 2) + index;
                if (pageNumber > totalPages) return null;
                
                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNumber}
                  </Button>
                );
              })}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this donation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default DonationTable;