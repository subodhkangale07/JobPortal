import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { Search, Plus, Building2, Filter } from 'lucide-react';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="pt-24 pb-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <h1 className="text-3xl font-bold mb-2">Companies Directory</h1>
                            <p className="text-blue-100">Browse, search and manage company listings</p>
                        </div>
                        <Button
                            onClick={() => navigate('/admin/companies/create')}
                            className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg shadow-sm transition duration-300 ease-in-out flex items-center gap-2"
                        >
                            <Plus size={18} />
                            <span>Add New Company</span>
                        </Button>
                    </div>
                </div>
            </div>
            
            <div className={`bg-white sticky top-16 z-10 py-4 border-b ${isScrolled ? 'shadow-md' : ''} transition-shadow duration-300`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Search companies by name..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 self-end sm:self-auto">
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-4"
                            >
                                <Filter size={16} />
                                <span>Filters</span>
                            </Button>
                            <Button
                                onClick={() => navigate('/admin/companies/create')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-300 ease-in-out flex items-center gap-1 sm:hidden"
                            >
                                <Plus size={18} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {input && (
                    <div className="mb-4 flex items-center text-sm text-gray-600">
                        <span>Showing results for: </span>
                        <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                            {input}
                        </span>
                        <button 
                            onClick={() => setInput('')}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                            Clear
                        </button>
                    </div>
                )}
                
                {!input && (
                    <div className="mb-6 flex items-center">
                        <Building2 className="text-blue-600 mr-2" size={20} />
                        <h2 className="text-xl font-semibold text-gray-800">All Companies</h2>
                    </div>
                )}
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <CompaniesTable />
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                    Can't find what you're looking for? 
                    <Button 
                        variant="link" 
                        className="text-blue-600 hover:text-blue-800 font-medium underline ml-1"
                        onClick={() => navigate('/admin/companies/create')}
                    >
                        Add a new company
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Companies;