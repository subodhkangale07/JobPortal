import React, { useEffect } from 'react';
import Navbar from './shared/navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 mt-20'>
        <h1 className='font-bold my-10 text-2xl lg:text-3xl'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5'>
          {
            allJobs.map((job) => {
              return (
                <Job key={job._id} job={job} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Browse;
