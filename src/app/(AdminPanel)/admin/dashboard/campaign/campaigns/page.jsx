"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Calendar,
  DollarSign,
  Target,
  TrendingUp
} from "lucide-react";

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CampaignTable = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("/api/admin/dashboard/campaign/addCampaign");
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        toast.error("Failed to fetch campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Filter and sort campaigns
  const filteredAndSortedCampaigns = useMemo(() => {
    let filtered = campaigns.filter((campaign) => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || 
                           campaign.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });

    // Sort campaigns
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "createdAt") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortField === "goal" || sortField === "raised") {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [campaigns, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCampaigns = filteredAndSortedCampaigns.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      toast.loading("Deleting campaign...", { id: "delete-campaign" });
      
      await axios.delete(`/api/admin/dashboard/campaign/${deleteId}`);
      
      setCampaigns(campaigns.filter((campaign) => campaign._id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
      
      toast.success("Campaign deleted successfully!", { id: "delete-campaign" });
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast.error("Failed to delete campaign", { id: "delete-campaign" });
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Pending' : 'Active';
      
      toast.loading("Updating status...", { id: "status-update" });
      
      await axios.put(`/api/admin/dashboard/campaign/updateStatus/${id}`, { status: newStatus });
      
      setCampaigns(campaigns.map((campaign) =>
        campaign._id === id ? { ...campaign, status: newStatus } : campaign
      ));
      
      toast.success(`Status updated to ${newStatus}!`, { id: "status-update" });
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status", { id: "status-update" });
    }
  };

  const truncateWords = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Campaigns</p>
                <p className="text-2xl font-bold">{campaigns.length}</p>
              </div>
              <Target className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-green-700 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Active</p>
                <p className="text-2xl font-bold">
                  {campaigns.filter(c => c.status === 'Active').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Pending</p>
                <p className="text-2xl font-bold">
                  {campaigns.filter(c => c.status === 'Pending').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Raised</p>
                <p className="text-2xl font-bold">
                  ₹{campaigns.reduce((sum, c) => sum + (parseFloat(c.raised) || 0), 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="border-0 shadow-xl bg-white">
        <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-t-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-xl font-bold">Campaign Management</CardTitle>
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64 bg-white"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-32 bg-white">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b-2">
                  <TableHead className="text-center font-semibold">Image</TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("title")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Title {getSortIcon("title")}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("goal")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Goal {getSortIcon("goal")}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("raised")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Raised {getSortIcon("raised")}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold text-center">Status</TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("createdAt")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Created {getSortIcon("createdAt")}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {currentCampaigns.map((campaign) => (
                    <motion.tr
                      key={campaign._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <img
                            src={campaign.image}
                            alt={campaign.title}
                            className="w-12 h-12 object-cover rounded-lg shadow-md"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium max-w-48">
                        <div className="truncate">{campaign.title}</div>
                      </TableCell>
                      <TableCell className="max-w-64">
                        <div className="text-sm text-gray-600">
                          {truncateWords(campaign.description, 8)}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        ₹{parseFloat(campaign.goal).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-semibold text-blue-600">
                        ₹{parseFloat(campaign.raised || 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Switch
                            checked={campaign.status === 'Active'}
                            onCheckedChange={() => toggleStatus(campaign._id, campaign.status)}
                            className="data-[state=checked]:bg-green-500"
                          />
                          <Badge 
                            variant={campaign.status === 'Active' ? 'default' : 'secondary'}
                            className={campaign.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {new Date(campaign.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/campaign/${campaign._id}`)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => confirmDelete(campaign._id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
          
          {currentCampaigns.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search className="h-12 w-12 mx-auto mb-4" />
              </div>
              <p className="text-gray-500">No campaigns found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Rows per page:</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedCampaigns.length)} of {filteredAndSortedCampaigns.length}
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + Math.max(1, currentPage - 2);
                  if (page <= totalPages) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="h-8 w-8 p-0"
                      >
                        {page}
                      </Button>
                    );
                  }
                  return null;
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this campaign? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignTable;