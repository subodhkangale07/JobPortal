import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className='flex-1 mr-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        onClick={() => navigate('/admin/companies/create')}
                        className=' text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out'
                    >
                        New Company
                    </Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    );
}

export default Companies;
