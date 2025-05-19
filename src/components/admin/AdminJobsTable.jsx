import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit2, MoreHorizontal, Calendar, Briefcase } from 'lucide-react';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const [openMenuId, setOpenMenuId] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  // Handle filtering jobs based on search text
  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
             job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const toggleDropdown = (jobId) => {
    setOpenMenuId(openMenuId === jobId ? null : jobId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm font-medium">
              <th className="px-6 py-4 text-left">Company</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Posted Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filterJobs?.length > 0 ? (
              filterJobs.map((job, index) => (
                <tr 
                  key={job._id || index} 
                  className="text-gray-700 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        {job?.company?.logo ? (
                        <img 
                          src={job.company.logo} 
                          alt={`${job.company.name} logo`}
                          className="w-10 h-10 rounded-full object-cover object-fill flex-shrink-0 border border-gray-100"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div>
                        <p className="font-medium text-gray-900">{job?.company?.name}</p>
                        <p className="text-xs text-gray-500">ID: {job._id?.substring(0, 8) || 'N/A'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{job?.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{job?.createdAt ? formatDate(job.createdAt) : 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block text-left" ref={job._id === openMenuId ? dropdownRef : null}>
                      <button 
                        className="p-2 rounded-full hover:bg-gray-100"
                        onClick={() => toggleDropdown(job._id)}
                      >
                        <MoreHorizontal className="h-5 w-5 text-gray-500" />
                      </button>
                      
                      {openMenuId === job._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-50">
                          <div className="py-1" role="menu">
                            <button 
                              onClick={() => {
                                navigate(`/admin/jobs/create`, { state: { job } });
                                setOpenMenuId(null);
                              }}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                            >
                              <Edit2 className="h-4 w-4 text-blue-500" />
                              <span>Edit Job Details</span>
                            </button>
                            <button 
                              onClick={() => {
                                navigate(`/admin/jobs/${job._id}/applicants`);
                                setOpenMenuId(null);
                              }}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                            >
                              <Eye className="h-4 w-4 text-green-500" />
                              <span>View Applicants</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Briefcase className="h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-lg font-medium">No jobs found</p>
                    <p className="text-sm mt-1">Try adjusting your search criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 text-sm text-gray-500 border-t border-gray-100 bg-gray-50 rounded-b-lg">
        Showing {filterJobs?.length || 0} of {allAdminJobs?.length || 0} total jobs
      </div>
    </div>
  );
};

export default AdminJobsTable;