import React from 'react';
import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards';

const LatestJobs = () => {
    // Access all jobs from the Redux store
    const { allJobs } = useSelector(store => store.job);
    
    // Log all jobs to the console for debugging
    console.log(allJobs);
    
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'>
                <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings
            </h1>
            {/* Display job cards or a message if no jobs are available */}
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    // Check if there are any jobs available
                    allJobs?.length <= 0 ? (
                        <span>No Job Available</span>
                    ) : (
                        // Map through the first 6 jobs and display them using LatestJobCards component
                        allJobs.slice(0, 6).map(job => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default LatestJobs;
