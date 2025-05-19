import React from 'react';
import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const LatestJobs = () => {
    // Access all jobs from the Redux store
    const { allJobs } = useSelector(store => store.job);
    
    // Handle empty state
    const isEmpty = !allJobs || allJobs.length <= 0;
    
    return (
        <section className="py-16 px-4 bg-gradient-to-b from-white to-purple-50">
            <div className="max-w-7xl mx-auto">
                {/* Section header with improved styling */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-1 w-10 bg-purple-700"></div>
                            <span className="text-purple-700 font-medium text-sm uppercase tracking-wider">Job Openings</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Latest & <span className="text-purple-700">Top Opportunities</span>
                        </h2>
                        <p className="text-gray-600 mt-3 max-w-xl">
                            Discover the newest and most sought-after positions from leading companies across industries
                        </p>
                    </div>
                    
                    <Link to="/browse" className="hidden md:flex items-center mt-4 md:mt-0 text-purple-700 font-medium hover:text-purple-800 transition-colors group">
                        View All Jobs
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                
                {/* Job listings with responsive grid and improved empty state */}
                {isEmpty ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="bg-purple-100 p-4 rounded-full mb-4">
                            <Briefcase className="h-8 w-8 text-purple-700" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No Jobs Available</h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                            We're currently updating our job listings. Please check back soon for new opportunities.
                        </p>
                        <Link to="/browse" className="px-5 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition-colors">
                            Browse All Categories
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allJobs.slice(0, 6).map(job => (
                                <LatestJobCards key={job._id} job={job} />
                            ))}
                        </div>
                        
                        {/* Mobile view button */}
                        <div className="flex justify-center mt-10 md:hidden">
                            <Link to="/browse" className="px-6 py-3 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition-colors flex items-center">
                                View All Jobs
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </>
                )}
                
                {/* Stats section */}
                {!isEmpty && (
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { number: "500+", label: "Active Jobs" },
                            { number: "1,200+", label: "Companies" },
                            { number: "10K+", label: "Job Seekers" },
                            { number: "8K+", label: "Successful Hires" },
                        ].map((stat, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-50">
                                <div className="text-2xl md:text-3xl font-bold text-purple-700 mb-1">{stat.number}</div>
                                <div className="text-gray-500 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestJobs;