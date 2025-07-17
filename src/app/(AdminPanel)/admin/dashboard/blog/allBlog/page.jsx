"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Search, Filter, Eye, Trash2, ChevronUp, ChevronDown, Minus, Loader2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Table components
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

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const toast = {
    error: (message) => console.error(message)
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log('Fetching articles...');
        const response = await axios.get('/api/admin/dashboard/blog');
        console.log('Articles fetched:', response.data);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        toast.error('Failed to fetch articles');
      } finally {
        setLoading(false);
        console.log('Loading state set to false');
      }
    };

    fetchArticles();
  }, []);

  const truncateWords = (text, wordCount) => {
    if (!text) return "";
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

  const handleViewClick = async (id) => {
    try {
      const response = await axios.get(`/api/admin/dashboard/blog/${id}`);
      setSelectedArticle(response.data);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching full blog content:', error);
      toast.error('Failed to fetch article content');
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const confirmed = confirm('Are you sure you want to delete this article?');
      if (!confirmed) return;

      await axios.delete(`/api/admin/dashboard/blog/${id}`);
      setArticles(articles.filter(article => article._id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Failed to delete article');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedArticle(null);
  };

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortField) {
          case 'title':
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
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
  }, [articles, searchTerm, sortField, sortOrder]);

  return (
    <div className="space-y-6 p-6 bg-white min-h-screen">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          <span className="ml-2 text-gray-600">Loading articles...</span>
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <>
          {/* Header: Title, Search & Filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-2xl font-semibold text-black">Blog Management</h2>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64 border-gray-300 bg-white text-black placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="text-center text-black font-semibold">Featured Image</TableHead>
                  <TableHead className="text-black font-semibold">
                    <button 
                      onClick={() => handleSort("title")} 
                      className="flex items-center gap-1 hover:bg-gray-200 p-1 rounded transition-colors"
                    >
                      Title {getSortIcon("title")}
                    </button>
                  </TableHead>
                  <TableHead className="text-black font-semibold">Content Preview</TableHead>
                  <TableHead className="text-black font-semibold">
                    <button 
                      onClick={() => handleSort("createdAt")} 
                      className="flex items-center gap-1 hover:bg-gray-200 p-1 rounded transition-colors"
                    >
                      Created Date {getSortIcon("createdAt")}
                    </button>
                  </TableHead>
                  <TableHead className="text-center text-black font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedArticles.map((article) => (
                  <TableRow key={article._id} className="hover:bg-gray-50 border-b border-gray-200">
                    <TableCell className="text-center">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-12 h-12 object-cover rounded border border-gray-200"
                      />
                    </TableCell>
                    <TableCell className="font-medium max-w-48 truncate text-black">{article.title}</TableCell>
                    <TableCell className="max-w-64 text-sm text-gray-600">
                      <div dangerouslySetInnerHTML={{ __html: truncateWords(article.content, 10) }} />
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 text-sm">
                        {new Date(article.createdAt).toLocaleDateString('en-US', {
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
                        onClick={() => handleViewClick(article._id)}
                        className="h-8 w-8 p-0 border-gray-300 bg-white text-black hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(article._id)}
                        className="h-8 w-8 p-0 border-gray-300 bg-white text-black hover:bg-gray-100 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredAndSortedArticles.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Search className="h-10 w-10 mx-auto mb-2" />
                <p className="text-black">No articles found.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Popup for Full Blog Content */}
      {showPopup && selectedArticle && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-black truncate pr-4">{selectedArticle.title}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={closePopup}
                className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="mb-4">
                <p className="text-gray-600 text-sm mb-2">By {selectedArticle.author}</p>
                <p className="text-gray-500 text-sm">{selectedArticle.category}</p>
              </div>
              <div
                className="prose prose-sm md:prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default News;