import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Badge } from '../ui/badge';
import { 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Mail, 
  Phone, 
  FileText, 
  User, 
  Clock,
  Download,
  Eye
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
// Import the action creator directly from your Redux slice file
// Make sure this path is correct - adjust to match your project structure
import { updateApplicationStatus } from '@/redux/applicationSlice'; 

const ApplicantsTable = () => {
  const token = localStorage.getItem('token');
  const { applicants } = useSelector(store => store.application);
  const dispatch = useDispatch();
  // Local state to track status changes while waiting for API
  const [applicantStatus, setApplicantStatus] = useState({});

  const statusHandler = async (status, id) => {
    try {
      console.log(`Updating status for application ${id} to ${status}`);
      
      // Check if updateApplicationStatus exists
      if (typeof updateApplicationStatus !== 'function') {
        console.error("Error: updateApplicationStatus is not a function!", updateApplicationStatus);
        toast.error("Application error: Action creator not available");
        return;
      }
      
      // Update UI immediately for better user experience
      setApplicantStatus(prev => {
        const newState = {
          ...prev,
          [id]: status
        };
        console.log("Updated local state:", newState);
        return newState;
      });
      
      // Make sure we're sending the data in the correct format
      const formData = new FormData();
      formData.append('status', status);
      
      // Fixed axios request format
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}`, 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      console.log("API response:", res.data);

      if (res.data.success) {
        toast.success(res.data.message);
        
        // Create and log the action before dispatching
        const action = updateApplicationStatus({
          id,
          status
        });
        console.log("Dispatching action:", action);
        
        // Dispatch the action
        dispatch(action);
        
        // Log the updated state
        console.log("Status updated in Redux for id:", id, "with status:", status);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      // Show a more detailed error message
      const errorMessage = error.response?.data?.message || 
                           error.message || 
                           "Failed to update status";
      
      toast.error(errorMessage);
      
      // Revert the local status on error
      setApplicantStatus(prev => ({
        ...prev,
        [id]: undefined
      }));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Add a useEffect to log the current state of applicants
  useEffect(() => {
    if (applicants && applicants.applications) {
      console.log("Current applicants state:", 
        applicants.applications.map(app => ({
          id: app._id,
          name: app?.applicant?.fullName,
          status: app.status
        }))
      );
    }
  }, [applicants]);

  // Function to get status badge
  const getStatusBadge = (item) => {
    // Use local state if available, otherwise use the item's status
    console.log(`Item ${item._id}:`, item.status, "Local state:", applicantStatus[item._id]);
    
    // First check local state, then fallback to item status
    const currentStatus = applicantStatus[item._id] || item.status;
    
    // Default to pending if no status is found
    if (!currentStatus) {
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-600 border-0">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    }
    
    // Case-insensitive comparison
    const statusLower = typeof currentStatus === 'string' ? currentStatus.toLowerCase() : '';
    
    if (statusLower === 'accepted') {
      return (
        <Badge className="bg-green-100 text-green-800 border-0 hover:bg-green-200">
          <CheckCircle className="mr-1 h-3 w-3" />
          Accepted
        </Badge>
      );
    }
    
    if (statusLower === 'rejected') {
      return (
        <Badge className="bg-red-100 text-red-800 border-0 hover:bg-red-200">
          <XCircle className="mr-1 h-3 w-3" />
          Rejected
        </Badge>
      );
    }
    
    // Handle any other status values
    return (
      <Badge variant="outline" className="bg-gray-100 text-gray-600 border-0">
        <Clock className="mr-1 h-3 w-3" />
        {currentStatus}
      </Badge>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <User className="mr-2 h-5 w-5 text-violet-600" />
          Job Applicants
        </h2>
        <p className="text-sm text-gray-500 mt-1">Review and manage candidate applications</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-700">Applicant</TableHead>
              <TableHead className="font-medium text-gray-700">Contact Info</TableHead>
              <TableHead className="font-medium text-gray-700">Resume</TableHead>
              <TableHead className="font-medium text-gray-700">Applied On</TableHead>
              <TableHead className="font-medium text-gray-700">Status</TableHead>
              <TableHead className="font-medium text-gray-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              applicants && applicants?.applications?.length > 0 ? (
                applicants.applications.map((item) => (
                  <TableRow key={item._id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-medium">
                          {item?.applicant?.fullName?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{item?.applicant?.fullName}</div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="mr-2 h-3.5 w-3.5" />
                          {item?.applicant?.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="mr-2 h-3.5 w-3.5" />
                          {item?.applicant?.phoneNumber || "Not provided"}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      {item?.applicant?.profile?.resume ? (
                        <a 
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-sm" 
                          href={item?.applicant?.profile?.resume} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {item?.applicant?.profile?.resumeOriginalName || "View Resume"}
                          </span>
                        </a>
                      ) : (
                        <span className="text-gray-500 text-sm">Not available</span>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="mr-1.5 h-3.5 w-3.5" />
                        {formatDate(item?.applicant?.createdAt)}
                      </div>
                    </TableCell>

                    <TableCell>
                      {getStatusBadge(item)}
                    </TableCell>

                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger>
                          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                            <MoreHorizontal className="h-5 w-5 text-gray-500" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-1.5 shadow-lg border border-gray-100 rounded-lg">
                          <div className="space-y-0.5">
                            <button
                              onClick={() => statusHandler('Accepted', item?._id)}
                              className="flex w-full items-center gap-2 p-2 hover:bg-green-50 rounded-md text-left text-sm transition-colors"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>Accept Application</span>
                            </button>
                            <button
                              onClick={() => statusHandler('Rejected', item?._id)}
                              className="flex w-full items-center gap-2 p-2 hover:bg-red-50 rounded-md text-left text-sm transition-colors"
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                              <span>Reject Application</span>
                            </button>
                            {item?.applicant?.profile?.resume && (
                              <a
                                href={item?.applicant?.profile?.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center gap-2 p-2 hover:bg-blue-50 rounded-md text-left text-sm transition-colors"
                              >
                                <Eye className="h-4 w-4 text-blue-600" />
                                <span>View Resume</span>
                              </a>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No applicants found
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
      
      {applicants && applicants?.applications?.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-100 text-sm text-gray-500">
          Showing {applicants.applications.length} applicant{applicants.applications.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default ApplicantsTable;