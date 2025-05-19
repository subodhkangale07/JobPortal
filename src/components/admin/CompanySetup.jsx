import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Building2, Globe, MapPin, FileImage, Loader2, Plus } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const token = localStorage.getItem('token');
    const params = useParams();
    useGetCompanyById(params.id); 

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        formData.append('token', token);

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg p-6 mb-8 shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-bold text-2xl text-white">Company Setup</h1>
                            <p className="text-blue-100 mt-1">Update your company information and branding</p>
                        </div>
                        <Button 
                            onClick={() => navigate("/admin/companies")} 
                            variant="ghost" 
                            className="bg-white/20 text-white hover:bg-white/30 rounded-full p-2"
                        >
                            <ArrowLeft size={18} />
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <form onSubmit={submitHandler} className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="space-y-2">
                                <Label className="text-gray-700 font-medium flex items-center gap-2">
                                    <Building2 size={16} className="text-violet-600" />
                                    Company Name
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="rounded-md border-gray-200 focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50 transition-all"
                                    placeholder="Enter company name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-700 font-medium flex items-center gap-2">
                                    <Globe size={16} className="text-violet-600" />
                                    Website
                                </Label>
                                <Input
                                    type="url"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="rounded-md border-gray-200 focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50 transition-all"
                                    placeholder="https://example.com"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-700 font-medium flex items-center gap-2">
                                    <MapPin size={16} className="text-violet-600" />
                                    Location
                                </Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="rounded-md border-gray-200 focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50 transition-all"
                                    placeholder="City, Country"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-700 font-medium flex items-center gap-2">
                                    <FileImage size={16} className="text-violet-600" />
                                    Company Logo
                                </Label>
                                <div className="relative">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="rounded-md border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1 lg:col-span-2 space-y-2">
                                <Label className="text-gray-700 font-medium">Description</Label>
                                <textarea
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="w-full rounded-md border-gray-200 focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50 transition-all min-h-32"
                                    placeholder="Brief description of your company"
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            {loading ? (
                                <Button 
                                    disabled
                                    className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md transition-colors flex items-center gap-2"
                                >
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Updating...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md transition-colors flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Update Company
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup;