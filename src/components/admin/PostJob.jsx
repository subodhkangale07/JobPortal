import React, { useState, useEffect } from 'react';
import Navbar from '../shared/navbar';
import { useSelector } from 'react-redux';
import { Loader2, Briefcase, MapPin, DollarSign, Clock, Award, Users, FileText, Building } from 'lucide-react';

import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 1, // Default to 1 position
    companyId: ""
  });

  const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Remote", "Internship"];

  const { companies } = useSelector(store => store.company);

  const token = localStorage.getItem('token');

  // Check token on component mount
  useEffect(() => {
    if (!token) {
      console.warn("No authentication token found!");
      toast.error("You need to be logged in to post jobs", {
        duration: 5000,
      });
    } else {
      console.log("Authentication token found:", token ? "Token exists" : "Token missing");
    }
  }, [token]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e) => {
    const selectedValue = e.target.value.toLowerCase();
    if (!selectedValue) return;

    const selectedCompany = companies.find((company) => company.name.toLowerCase() === selectedValue);
    if (selectedCompany) {
      console.log("Selected company:", selectedCompany);
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Comprehensive validation to match server requirements
    if (!input.title || !input.description || !input.location || !input.experience ||
      !input.salary || !input.companyId || !input.requirements || !input.jobType ||
      input.position < 1) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      // Format the data exactly as the server expects it
      const jobData = {
        title: input.title,
        description: input.description,
        location: input.location,
        // Send the experience as a number value
        experience: Number(input.experience),
        // Ensure salary is a number
        salary: Number(input.salary),
        companyId: input.companyId,
        // Send requirements as a string (backend will split it)
        requirements: input.requirements,
        jobType: input.jobType,
        // Ensure position is a number
        position: Number(input.position)
      };

      console.log("Sending job data:", jobData);

      const res = await axios.post(`${JOB_API_END_POINT}/post`, jobData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("Server response:", res.data);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      console.error("Error posting job:", error);
      if (error.response) {
        console.error("Server response data:", error.response.data);
        console.error("Server response status:", error.response.status);
        toast.error(error.response.data?.message || "Server error. Check console for details.");
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm py-4 px-6 border-b">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 text-white">
            <h2 className="text-2xl font-bold flex items-center">
              <Briefcase className="mr-2" size={24} />
              Post a New Job
            </h2>
            <p className="text-blue-100 mt-1">
              Fill in the details below to create a new job posting
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="flex items-center text-sm font-medium text-gray-700">
                  <Briefcase className="mr-2" size={16} />
                  Job Title <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="e.g. Senior Frontend Developer"
                  value={input.title}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>

              {/* Company Selection */}
              <div className="space-y-2">
                <label htmlFor="company" className="flex items-center text-sm font-medium text-gray-700">
                  <Building className="mr-2" size={16} />
                  Company <span className="text-red-500 ml-1">*</span>
                </label>
                {companies.length > 0 ? (
                  <select
                    id="company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    onChange={handleCompanyChange}
                    required
                  >
                    <option value="">Select a Company</option>
                    {companies.map((company) => (
                      <option key={company._id} value={company.name.toLowerCase()}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                    <p className="text-amber-700 text-sm flex items-center">
                      <span className="font-medium">Please register a company first</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label htmlFor="location" className="flex items-center text-sm font-medium text-gray-700">
                  <MapPin className="mr-2" size={16} />
                  Location <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="e.g. San Francisco, CA or Remote"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>

              {/* Salary */}
              <div className="space-y-2">
                <label htmlFor="salary" className="flex items-center text-sm font-medium text-gray-700">
                  <DollarSign className="mr-2" size={16} />
                  Salary <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  name="salary"
                  id="salary"
                  placeholder="e.g. 80000"
                  value={input.salary}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
                <small className="text-gray-500"><strong>Important:</strong> Enter numeric value only, without commas or currency symbols (e.g. 80000)</small>
              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <label htmlFor="jobType" className="flex items-center text-sm font-medium text-gray-700">
                  <Clock className="mr-2" size={16} />
                  Job Type <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="jobType"
                  id="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                >
                  <option value="">Select job type</option>
                  {jobTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Level - MODIFIED to match backend numeric format */}
              <div className="space-y-2">
                <label htmlFor="experience" className="flex items-center text-sm font-medium text-gray-700">
                  <Award className="mr-2" size={16} />
                  Experience in Years <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  name="experience"
                  id="experience"
                  placeholder="e.g. 1"
                  value={input.experience}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />

              </div>

              {/* No of Position */}
              <div className="space-y-2">
                <label htmlFor="position" className="flex items-center text-sm font-medium text-gray-700">
                  <Users className="mr-2" size={16} />
                  Number of Positions <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  name="position"
                  id="position"
                  min="1"
                  placeholder="1"
                  value={input.position}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="description" className="flex items-center text-sm font-medium text-gray-700">
                  <FileText className="mr-2" size={16} />
                  Job Description <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="4"
                  placeholder="Provide a detailed description of the job position..."
                  value={input.description}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                ></textarea>
              </div>

              {/* Requirements */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="requirements" className="flex items-center text-sm font-medium text-gray-700">
                  <FileText className="mr-2" size={16} />
                  Job Requirements <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  name="requirements"
                  id="requirements"
                  rows="4"
                  placeholder="List the key qualifications and skills required (comma-separated)..."
                  value={input.requirements}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  required
                ></textarea>
                <small className="text-gray-500">
                  <strong>Important:</strong> Enter requirements as comma-separated values (e.g. React,JavaScript,3+ years experience)
                </small>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            {companies.length === 0 && (
              <div className="bg-red-50 p-4 rounded-md border border-red-200 mb-4">
                <p className="text-red-600 text-sm font-medium text-center">
                  You must register a company before posting jobs
                </p>
              </div>
            )}

            <button
              onClick={submitHandler}
              disabled={loading || companies.length === 0}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </div>
              ) : (
                "Post New Job"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;