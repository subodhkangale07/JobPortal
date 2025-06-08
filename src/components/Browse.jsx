import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Navbar from './shared/navbar';
import Job from './Job';
import { Search, Filter, MapPin } from 'lucide-react';
import Footer from './shared/Footer';

const Browse = () => { 
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    fullTime: false,
    remote: false,
    entry: false,
    experienced: false 
  });

  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchedQuery(searchTerm));
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search job titles, keywords, or companies"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="relative">
              <button
                type="button"
                onClick={toggleFilter}
                className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
              
              {filterOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10 border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Job Type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.fullTime}
                        onChange={() => setSelectedFilters({...selectedFilters, fullTime: !selectedFilters.fullTime})}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <span className="ml-2 text-gray-700">Full-time</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.remote}
                        onChange={() => setSelectedFilters({...selectedFilters, remote: !selectedFilters.remote})}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <span className="ml-2 text-gray-700">Remote</span>
                    </label>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mt-4 mb-3">Experience Level</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.entry}
                        onChange={() => setSelectedFilters({...selectedFilters, entry: !selectedFilters.entry})}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <span className="ml-2 text-gray-700">Entry Level</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.experienced}
                        onChange={() => setSelectedFilters({...selectedFilters, experienced: !selectedFilters.experienced})}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <span className="ml-2 text-gray-700">Experienced</span>
                    </label>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <button 
                      type="button"
                      onClick={() => setSelectedFilters({fullTime: false, remote: false, entry: false, experienced: false})}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Clear all
                    </button>
                    <button 
                      type="button"
                      onClick={toggleFilter}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button> */}
          </form>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Search Results <span className="text-gray-500">({allJobs.length})</span>
          </h2>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 text-sm">
              <option>Most Relevant</option>
              <option>Newest First</option>
              <option>Highest Salary</option>
            </select>
          </div>
        </div>
        
        {allJobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <Search className="h-full w-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <Job job={job} />
              </div>
            ))}
          </div>
        )}
        
        {allJobs.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center bg-white px-4 py-3 rounded-md shadow-sm">
              <button className="mr-2 px-3 py-1 rounded-md hover:bg-gray-100" disabled>Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
              <button className="px-3 py-1 rounded-md hover:bg-gray-100">2</button>
              <button className="px-3 py-1 rounded-md hover:bg-gray-100">3</button>
              <span className="px-2">...</span>
              <button className="ml-2 px-3 py-1 rounded-md hover:bg-gray-100">Next</button>
            </nav>
          </div>
        )}
      </main>
      
      <Footer/>
    </div>
  );
};

export default Browse;