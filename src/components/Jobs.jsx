import React, { useMemo, useState, useEffect } from 'react';
import Navbar from './shared/navbar';
import Job from './Job';
import FilterJob from './FilterJob';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Briefcase, X, AlertCircle } from 'lucide-react';
import { setSearchedQuery } from '@/redux/jobSlice';

const Jobs = () => {
    const dispatch = useDispatch();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
    const [searchInput, setSearchInput] = useState('');
    
    // Initialize search input with current query value from Redux
    useEffect(() => {
        if (searchedQuery) {
            setSearchInput(searchedQuery);
        }
    }, []);
    
    // Simulate loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);
    
    // Memoize filtered jobs to avoid re-filtering on every render
    const filteredJobs = useMemo(() => {
        const query = typeof searchedQuery === 'string' ? searchedQuery.toLowerCase() : '';
    
        if (!query) return allJobs;
    
        return allJobs.filter(job => 
            job.title?.toLowerCase().includes(query) ||
            job.description?.toLowerCase().includes(query) ||
            job.location?.toLowerCase().includes(query)
        );
    }, [allJobs, searchedQuery]);
    
    // Handle mobile filter visibility
    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    // Handle search form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchedQuery(searchInput));
    };

    // Clear all filters and search
    const handleClearFilters = () => {
        dispatch(setSearchedQuery(''));
        setSearchInput('');
        // If you have other filter states in Redux, you would reset those here too
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Hero section */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white mt-5">
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Dream Job</h1>
                        <p className="text-purple-100 mb-6">Discover opportunities that match your skills and career goals</p>
                        
                        {/* Search box */}
                        <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-purple-300" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for job titles, skills, or locations..."
                                className="pl-10 pr-4 py-3 w-full rounded-lg bg-white/10 backdrop-blur-sm border border-purple-400/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                                value={searchInput}
                                onChange={handleSearchChange}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <span className="text-xs font-medium text-purple-200 bg-purple-500/50 px-2 py-1 rounded-md">
                                    {filteredJobs.length} jobs
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            {/* Content area */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Mobile filter toggle */}
                <div className="lg:hidden mb-4 flex items-center justify-between">
                    <button
                        onClick={toggleFilter}
                        className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <Filter className="h-4 w-4" />
                        Filters
                    </button>
                    
                    <div className="flex gap-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setViewType('grid')}
                            className={`p-2 ${viewType === 'grid' ? 'bg-purple-50 text-purple-600' : 'text-gray-500'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewType('list')}
                            className={`p-2 ${viewType === 'list' ? 'bg-purple-50 text-purple-600' : 'text-gray-500'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6"></line>
                                <line x1="8" y1="12" x2="21" y2="12"></line>
                                <line x1="8" y1="18" x2="21" y2="18"></line>
                                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                <line x1="3" y1="18" x2="3.01" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filter sidebar - Desktop */}
                    <div className={`lg:w-1/4 xl:w-1/5 lg:block ${isFilterVisible ? 'block' : 'hidden'}`}>
                        <div className="sticky top-4 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-purple-600" />
                                    Filter Options
                                </h2>
                                <button 
                                    onClick={toggleFilter} 
                                    className="lg:hidden p-1 hover:bg-gray-100 rounded-full"
                                >
                                    <X className="h-4 w-4 text-gray-500" />
                                </button>
                            </div>
                            <div className="p-4">
                                <FilterJob />
                            </div>
                        </div>
                    </div>
                    
                    {/* Job listings */}
                    <div className="flex-1">
                        {/* View type toggle - Desktop */}
                        <div className="hidden lg:flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {filteredJobs.length} Available Positions
                            </h2>
                            
                            <div className="flex gap-2 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setViewType('grid')}
                                    className={`p-2 px-4 flex items-center gap-2 ${viewType === 'grid' ? 'bg-purple-50 text-purple-600' : 'text-gray-500'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="3" width="7" height="7"></rect>
                                        <rect x="3" y="14" width="7" height="7"></rect>
                                        <rect x="14" y="14" width="7" height="7"></rect>
                                    </svg>
                                    Grid
                                </button>
                                <button
                                    onClick={() => setViewType('list')}
                                    className={`p-2 px-4 flex items-center gap-2 ${viewType === 'list' ? 'bg-purple-50 text-purple-600' : 'text-gray-500'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="8" y1="6" x2="21" y2="6"></line>
                                        <line x1="8" y1="12" x2="21" y2="12"></line>
                                        <line x1="8" y1="18" x2="21" y2="18"></line>
                                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                    </svg>
                                    List
                                </button>
                            </div>
                        </div>
                        
                        {/* Loading state */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[...Array(6)].map((_, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 animate-pulse"
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="bg-gray-200 h-12 w-12 rounded-lg"></div>
                                            <div className="ml-3 flex-1">
                                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                        <div className="h-3 bg-gray-200 rounded mb-3 w-full"></div>
                                        <div className="h-3 bg-gray-200 rounded mb-3 w-full"></div>
                                        <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                                        <div className="flex justify-between mt-6">
                                            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                                            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredJobs.length === 0 ? (
                            // Empty state
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="p-4 bg-red-50 rounded-full mb-4">
                                    <AlertCircle className="h-8 w-8 text-red-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Jobs Found</h3>
                                <p className="text-gray-500 max-w-md mb-6">
                                    We couldn't find any jobs matching your search criteria. Try adjusting your filters or search query.
                                </p>
                                <button 
                                    onClick={handleClearFilters}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            // Job listings
                            <AnimatePresence>
                                {viewType === 'grid' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {filteredJobs.map(job => (
                                            <motion.div 
                                                key={job?._id || Math.random()}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="h-full"
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {filteredJobs.map(job => (
                                            <motion.div 
                                                key={job?._id || Math.random()}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.2 }}
                                                className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    {/* Company logo */}
                                                    <div className="flex-shrink-0">
                                                        <div className="h-16 w-16 bg-purple-100 rounded-lg flex items-center justify-center">
                                                            <Briefcase className="h-8 w-8 text-purple-600" />
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Job details */}
                                                    <div className="flex-grow">
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                                            <h3 className="text-lg font-semibold text-gray-800">{job?.title || 'Untitled Position'}</h3>
                                                            <div className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                                                {job?.jobType || 'Full-time'}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex flex-wrap gap-2 mb-3">
                                                            <span className="text-sm text-gray-500">{job?.company || job?.name || 'Company Name'}</span>
                                                            <span className="text-gray-300">•</span>
                                                            <span className="text-sm text-gray-500">{job?.location || 'Location'}</span>
                                                            <span className="text-gray-300">•</span>
                                                            <span className="text-sm text-gray-500">${job?.salary || 'Competitive'}</span>
                                                        </div>
                                                        
                                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                            {job?.description || 'No description available.'}
                                                        </p>
                                                        
                                                        <div className="flex flex-wrap gap-2">
                                                            {(job?.skills || ['React', 'JavaScript']).slice(0, 3).map((skill, index) => (
                                                                <span 
                                                                    key={index}
                                                                    className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-md"
                                                                >
                                                                    {typeof skill === 'string' ? skill : 'Skill'}
                                                                </span>
                                                            ))}
                                                            {(job?.skills || []).length > 3 && (
                                                                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-md">
                                                                    +{(job?.skills || []).length - 3} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Apply button */}
                                                    <div className="flex-shrink-0 flex md:flex-col gap-2 md:items-end justify-between md:justify-center">
                                                        <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                                                            Apply Now
                                                        </button>
                                                        <button className="p-2 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                        )}
                        
                        {/* Pagination */}
                        {filteredJobs.length > 0 && !isLoading && (
                            <div className="mt-8 flex justify-center">
                                <nav className="flex items-center gap-1">
                                    <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-600 text-white font-medium">1</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50">2</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50">3</button>
                                    <span className="px-2 text-gray-500">...</span>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50">8</button>
                                    <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;