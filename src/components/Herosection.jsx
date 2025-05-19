import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const Herosection = () => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = (e) => {
        e.preventDefault()
        if (query.trim()) {
            dispatch(setSearchedQuery(query))
            navigate('/browse')
        }
    }
    
    return (
        <div className="bg-gradient-to-b from-purple-50 to-white py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Left content */}
                    <div className="flex-1 text-left">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Find & Apply For Your <span className="text-purple-700 relative">
                                Dream Job
                                <svg className="absolute -bottom-2 left-0 w-full h-2 text-purple-300" viewBox="0 0 200 8" preserveAspectRatio="none">
                                    <path d="M0,5 C40,2 60,8 200,5" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </span>
                        </h1>
                        
                        <p className="text-gray-600 mb-8 text-lg max-w-xl">
                            Discover thousands of job opportunities with top companies and find the perfect role that matches your skills and aspirations.
                        </p>
                        
                        <form onSubmit={searchJobHandler} className="relative flex w-full max-w-xl mb-8">
                            <div className="relative flex w-full items-center">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <Search className="h-5 w-5" />
                                </div>
                                
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Job title, keywords, or company"
                                    className="w-full pl-12 pr-4 py-4 rounded-l-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                                />
                                
                                <Button 
                                    type="submit"
                                    className="h-full py-4 px-6 bg-purple-700 hover:bg-purple-800 rounded-r-full font-medium"
                                >
                                    Search Jobs
                                </Button>
                            </div>
                        </form>
                        
                        <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                            <span>Popular searches:</span>
                            <button className="hover:text-purple-700" onClick={() => setQuery('Software Developer')}>Software Developer</button>
                            <span>•</span>
                            <button className="hover:text-purple-700" onClick={() => setQuery('Marketing')}>Marketing</button>
                            <span>•</span>
                            <button className="hover:text-purple-700" onClick={() => setQuery('Data Analyst')}>Data Analyst</button>
                        </div>
                    </div>
                    
                    {/* Right illustration */}
                    <div className="flex-1 hidden md:block">
                        <div className="relative">
                            {/* Placeholder for illustration - in production you'd use an actual image */}
                            <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
                                <svg className="w-full h-full text-purple-700 opacity-10" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                                    <path d="M12 11c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                </svg>
                                
                                {/* Decorative elements */}
                                <div className="absolute top-6 right-6 w-20 h-20 bg-purple-600 rounded-full opacity-20"></div>
                                <div className="absolute bottom-12 left-8 w-16 h-16 bg-purple-500 rounded-full opacity-20"></div>
                                <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-purple-400 rounded-full opacity-20"></div>
                            </div>
                            
                            {/* Stats cards */}
                            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 w-40">
                                <div className="text-purple-700 font-bold text-lg">10,000+</div>
                                <div className="text-gray-500 text-sm">Jobs Available</div>
                            </div>
                            
                            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 w-40">
                                <div className="text-purple-700 font-bold text-lg">5,000+</div>
                                <div className="text-gray-500 text-sm">Companies</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Trusted by section */}
            <div className="max-w-6xl mx-auto mt-16">
                <div className="text-center text-gray-400 text-sm mb-6">TRUSTED BY TOP COMPANIES</div>
                <div className="flex justify-center items-center flex-wrap gap-8 opacity-60">
                    {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'].map((company) => (
                        <div key={company} className="text-gray-500 font-semibold text-lg">
                            {company}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Herosection