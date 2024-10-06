import React, { useEffect, useState, useMemo } from 'react';
import Navbar from './shared/navbar';
import Job from './Job';
import FilterJob from './FilterJob';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    
    // Use useMemo to memoize the filtered jobs
    const filterJobs = useMemo(() => {
        if (!searchedQuery) return allJobs;

        return allJobs.filter(job => 
            job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-1/5 mt-11'>
                        {/* Left side filter component */}
                        <FilterJob />
                    </div>

                    {/* Right side job cards */}
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5 mt-11'>
                        {filterJobs.length <= 0 ? (
                            <span>Job Not Found</span>
                        ) : (
                            <div className='grid grid-cols-3 gap-4'>
                                {filterJobs.map(job => (
                                    <motion.div 
                                        key={job?._id}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
