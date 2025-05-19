import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/navbar';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar, 
  Users, 
  FileText 
} from 'lucide-react';

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const [isApplied, setIsApplied] = useState(false);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch job details.");
            } finally {
                setLoading(false);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, token, user?._id]);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to apply for the job.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                {/* Job Header Card */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="font-bold text-2xl text-gray-800">{singleJob?.title}</h1>
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                                <Badge className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium">
                                    {singleJob?.position} Positions
                                </Badge>
                                <Badge className="bg-red-100 hover:bg-red-200 text-red-600 font-medium">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium">
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`px-6 py-2 rounded-lg transition-all ${
                                isApplied 
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                                : 'bg-purple-700 hover:bg-purple-800 text-white shadow-md hover:shadow-lg'
                            }`}>
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>
                </div>
                
                {/* Job Details Card */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 pb-4 border-b border-gray-200">
                        Job Details
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Briefcase className="w-5 h-5 text-purple-600 mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700">Role</h3>
                                    <p className="text-gray-800">{singleJob?.title}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700">Location</h3>
                                    <p className="text-gray-800">{singleJob?.location}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-purple-600 mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700">Experience</h3>
                                    <p className="text-gray-800">{singleJob?.experienceLevel} years</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <DollarSign className="w-5 h-5 text-purple-600 mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700">Salary</h3>
                                    <p className="text-gray-800">{singleJob?.salary} LPA</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Users className="w-5 h-5 text-purple-600 mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700">Total Applicants</h3>
                                    <p className="text-gray-800">{singleJob?.applications?.length || 0}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-purple-600 mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-700">Posted Date</h3>
                                    <p className="text-gray-800">{singleJob?.createdAt?.split("T")[0]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Description Section */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-purple-600 mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-700">Description</h3>
                                <p className="text-gray-800 mt-2 whitespace-pre-line">{singleJob?.description}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Apply Button (Bottom) */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`w-full md:w-auto px-6 py-2 rounded-lg transition-all ${
                                isApplied 
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                                : 'bg-purple-700 hover:bg-purple-800 text-white shadow-md hover:shadow-lg'
                            }`}>
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;