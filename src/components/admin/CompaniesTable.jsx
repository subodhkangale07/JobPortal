import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { 
  Edit2, 
  MoreHorizontal, 
  Trash2, 
  Eye, 
  AlertTriangle,
  ArrowUpDown,
  Building,
  FileText,
  Download
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies || []);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort companies
  useEffect(() => {
    setIsLoading(true);
    const filtered = companies && companies.length > 0 
      ? companies.filter((company) => {
          if (!searchCompanyByText) {
            return true;
          }
          return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
      : [];
    
    const sorted = [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredCompanies(sorted);
    setTimeout(() => setIsLoading(false), 300); // Simulate loading state
  }, [companies, searchCompanyByText, sortConfig]);

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Get company status based on some criteria (customize as needed)
  const getCompanyStatus = (company) => {
    // This is a placeholder - replace with your actual logic
    const daysSinceCreation = (new Date() - new Date(company.createdAt)) / (1000 * 60 * 60 * 24);
    
    if (daysSinceCreation < 7) return { label: 'New', color: 'bg-green-100 text-green-800' };
    if (daysSinceCreation > 180) return { label: 'Established', color: 'bg-blue-100 text-blue-800' };
    return { label: 'Active', color: 'bg-gray-100 text-gray-800' };
  };

  // Get company initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Handle company actions
  const handleEditCompany = (id) => {
    navigate(`/admin/companies/${id}`);
  };

  const handleViewCompany = (id) => {
    navigate(`/admin/companies/${id}`);
  };

  const handleDeleteCompany = (id) => {
    // Implement your delete logic here
    console.log(`Delete company with ID: ${id}`);
  };

  const handleExportData = () => {
    // Implement your export functionality here
    console.log('Exporting company data...');
  };

  if (isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Building className="mr-2 h-5 w-5" />
            Companies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Building className="mr-2 h-5 w-5" />
            Companies Directory
          </CardTitle>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={handleExportData}
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden md:inline">Export</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export company data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => navigate('/admin/companies/create')}
            >
              <span>Add Company</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredCompanies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">No companies found</h3>
            <p className="text-gray-500 mt-2 max-w-sm">
              {searchCompanyByText 
                ? `No results for "${searchCompanyByText}". Try a different search term.` 
                : "Add your first company to get started."}
            </p>
            <Button
              className="mt-4"
              onClick={() => navigate('/admin/companies/add')}
            >
              Add Company
            </Button>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>
                Showing {filteredCompanies.length} companies
              </TableCaption>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-16">Logo</TableHead>
                  <TableHead>
                    <button 
                      className="flex items-center font-semibold"
                      onClick={() => requestSort('name')}
                    >
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                    </button>
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead>
                    <button 
                      className="flex items-center font-semibold"
                      onClick={() => requestSort('createdAt')}
                    >
                      Date Added
                      <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => {
                  const status = getCompanyStatus(company);
                  
                  return (
                    <TableRow 
                      key={company._id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleViewCompany(company._id)}
                    >
                      <TableCell className="font-medium p-3">
                        <Avatar className="h-10 w-10 border">
                          {company.logo ? (
                            <AvatarImage src={company.logo} alt={company.name} />
                          ) : (
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {getInitials(company.name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </TableCell>
                      
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="text-base">{company.name}</span>
                          {company.industry && (
                            <span className="text-sm text-gray-500 truncate max-w-xs">
                              {company.industry}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className={`${status.color} font-medium`}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        {formatDate(company.createdAt)}
                      </TableCell>
                      
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem 
                              className="flex items-center gap-2"
                              onClick={() => handleViewCompany(company._id)}
                            >
                              <Eye className="h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              className="flex items-center gap-2"
                              onClick={() => handleEditCompany(company._id)}
                            >
                              <Edit2 className="h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem 
                              className="flex items-center gap-2 text-red-600 focus:text-red-600"
                              onClick={() => handleDeleteCompany(company._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompaniesTable;