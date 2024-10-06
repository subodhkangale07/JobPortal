import React, { useState } from 'react'
import Navbar from '../shared/navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();
    useGetAllCompanies();

    const registerNewCompany = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName, token }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while creating the company.");
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto p-4'>
                <div className='my-10 text-center'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500 mt-2'>What would you like to give your company name? You can change this later.</p>
                </div>

                <Label className="block text-left mb-2">Company Name</Label>
                <Input
                    type="text"
                    className="my-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="JobHunt, Microsoft etc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center justify-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate;
