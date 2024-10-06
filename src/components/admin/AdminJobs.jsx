import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import { SearchIcon } from 'lucide-react';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar component */}
      <Navbar/>

      {/* Main content container */}
      <div className="max-w-6xl h-full mx-auto p-6 mt-24 bg-white shadow-lg rounded-lg ">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6 ">Admin Job Management</h1>

        {/* Search and Add New Job actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-5">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <Input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Filter by name or role"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Filter jobs by name or role"
            />
            {/* Search icon */}
            <SearchIcon className="absolute right-3 top-2 text-gray-400 w-6 h-6"/>
          </div>

          {/* New Job Button */}
          <Button
            className="w-full md:w-auto bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => navigate('/admin/jobs/create')}
            aria-label="Create new job"
          >
            + Create New Job
          </Button>
        </div>

        {/* Jobs Table */}
        <div>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
