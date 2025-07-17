"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Eye, Trash2, ChevronUp, ChevronDown, Minus, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
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

export default function CampaignManagement() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const toast = {
    error: (message) => console.error(message)
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("/api/admin/dashboard/campaign/addCampaign");
        console.log(response)
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

  const truncateWords = (text, wordCount) => {
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <Minus className="h-3 w-3" />;
    return sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />;
  };

  const toggleStatus = (id, currentStatus) => {
    // Handle status toggle - implement your logic here
    console.log('Toggle status for campaign:', id, 'Current status:', currentStatus);
  };

  const confirmDelete = (id) => {
    // Handle delete confirmation - implement your logic here
    console.log('Delete campaign:', id);
  };

  const filteredAndSortedCampaigns = useMemo(() => {
    let filtered = campaigns.filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
                           campaign.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortField) {
          case 'title':
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          case 'goal':
            aValue = parseFloat(a.goal);
            bValue = parseFloat(b.goal);
            break;
          case 'raised':
            aValue = parseFloat(a.raised || 0);
            bValue = parseFloat(b.raised || 0);
            break;
          case 'createdAt':
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
            break;
          default:
            return 0;
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      });
    }

    return filtered;
  }, [campaigns, searchTerm, statusFilter, sortField, sortOrder]);

  return (
    <div className="space-y-6 p-6 bg-white min-h-screen">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          <span className="ml-2 text-gray-600">Loading campaigns...</span>
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <>
          {/* Header: Title, Search & Filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-2xl font-semibold text-black">Campaign Management</h2>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64 border-gray-300 bg-white text-black placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-32 border-gray-300 bg-white text-black hover:bg-gray-50 focus:border-gray-500 focus:ring-gray-500">
                  <Filter className="h-4 w-4 mr-2 text-gray-600" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  <SelectItem value="all" className="text-black hover:bg-gray-100 focus:bg-gray-100">All</SelectItem>
                  <SelectItem value="active" className="text-black hover:bg-gray-100 focus:bg-gray-100">Active</SelectItem>
                  <SelectItem value="pending" className="text-black hover:bg-gray-100 focus:bg-gray-100">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="text-center text-black font-semibold">Image</TableHead>
                  <TableHead className="text-black font-semibold">
                    <button 
                      onClick={() => handleSort("title")} 
                      className="flex items-center gap-1 hover:bg-gray-200 p-1 rounded transition-colors"
                    >
                      Title {getSortIcon("title")}
                    </button>
                  </TableHead>
                  <TableHead className="text-black font-semibold">Description</TableHead>
                  <TableHead className="text-black font-semibold">
                    <button 
                      onClick={() => handleSort("goal")} 
                      className="flex items-center gap-1 hover:bg-gray-200 p-1 rounded transition-colors"
                    >
                      Goal {getSortIcon("goal")}
                    </button>
                  </TableHead>
                  <TableHead className="text-black font-semibold">
                    <button 
                      onClick={() => handleSort("raised")} 
                      className="flex items-center gap-1 hover:bg-gray-200 p-1 rounded transition-colors"
                    >
                      Raised {getSortIcon("raised")}
                    </button>
                  </TableHead>
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
                {filteredAndSortedCampaigns.map((campaign) => (
                  <TableRow key={campaign._id} className="hover:bg-gray-50 border-b border-gray-200">
                    <TableCell className="text-center">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-12 h-12 object-cover rounded border border-gray-200"
                      />
                    </TableCell>
                    <TableCell className="font-medium max-w-48 truncate text-black">{campaign.title}</TableCell>
                    <TableCell className="max-w-64 text-sm text-gray-600">
                      {truncateWords(campaign.description, 8)}
                    </TableCell>
                    <TableCell className="text-black font-semibold">
                      ₹{parseFloat(campaign.goal).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-black font-semibold">
                      ₹{parseFloat(campaign.raised || 0).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 text-sm">
                        {new Date(campaign.createdAt).toLocaleDateString('en-US', {
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
                        onClick={() => console.log('View campaign:', campaign._id)}
                        className="h-8 w-8 p-0 border-gray-300 bg-white text-black hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => confirmDelete(campaign._id)}
                        className="h-8 w-8 p-0 border-gray-300 bg-white text-black hover:bg-gray-100 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredAndSortedCampaigns.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Search className="h-10 w-10 mx-auto mb-2" />
                <p className="text-black">No campaigns found.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}