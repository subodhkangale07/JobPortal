import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import { SearchIcon, Plus, Briefcase, Filter } from 'lucide-react';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar component */}
      <Navbar />

      {/* Header Banner */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-violet-600 py-8 pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
                <Briefcase className="mr-3 h-6 w-6" />
                Jobs Directory
              </h1>
              <p className="text-blue-100 mt-1">Browse, search and manage job listings</p>
            </div>
            <Button
              onClick={() => navigate('/admin/jobs/create')}
              className="mt-4 md:mt-0 bg-white text-violet-700 hover:bg-blue-50 font-medium px-5 py-2 rounded-md transition-all flex items-center gap-2 shadow-sm"
            >
              <Plus size={18} />
              Add New Job
            </Button>
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-6">
        {/* Search and Filter Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="Search by job title, company or location..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Filter jobs by name or role"
              />
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              className="min-w-[120px] border-gray-200 text-gray-600 hover:bg-gray-50 font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2"
            >
              <Filter size={16} />
              Filters
            </Button>
          </div>
        </div>

        {/* Jobs Table Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-violet-600" />
              All Jobs
            </h2>
          </div>

          {/* Jobs Table */}
          <div className="overflow-x-auto">
            <AdminJobsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;