
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FcGoogle } from "react-icons/fc";
import { RadioGroup } from '../ui/radio-group';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import sigUpImg from '../../assets/signUp.jpg'

const Signup = () => {
    const [input, setInput] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        role: '',
        file: ''
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    // formdata object
        formData.append("fullName", input.fullName);  // Ensure consistency in key names
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            // Set loading state to true
            dispatch(setLoading(true));

            // API call
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });

            // Success handling
            if (res.data.success) {
                navigate("/login");  // Navigate to login on success
                toast.success(res.data.message);  // Display success toast
            }
        } catch (error) {
            // Error handling
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);  // Display error message if available
            } else {
                toast.error("Something went wrong. Please try again.");  // Fallback error message
            }
        } finally {
            // Set loading state to false
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])
    return (
        <div>
            <Navbar />

            {/* Main container */}
            <div className='flex flex-col lg:flex-row justify-center items-center max-w-7xl mx-auto my-10'>

                {/* Left-side Decorative Image and Text */}
                <div className='lg:w-1/2 w-full flex flex-col justify-center items-center text-center p-4'>

                    <div className=' inset-0 flex'>
                        <h2 className='text-2xl text-gray-500 p-4 ml-[60px] rounded-lg mb-1'>
                            Discover Your Dream Job or Hire Top Talent
                        </h2>
                    </div>
                    <img
                        src={sigUpImg}
                        alt='Decorative 3D Objects'
                        className='w-full h-96  lg:h-full object-cover rounded-lg shadow-lg'
                    />
                </div>

                {/* Signup Form Section */}
                <div className='lg:w-1/2 w-full border border-gray-200 rounded-lg shadow-md p-8 bg-white'>
                    <h1 className='font-bold text-2xl mb-5 text-center text-gray-800'>Sign Up</h1>

                    {/* Signup Form */}
                    <form onSubmit={submitHandler} className='w-full'>
                        <div className='my-4'>
                            <Label>Full Name</Label>
                            <Input
                                type='text'
                                value={input.fullName}
                                name='fullName'
                                onChange={changeEventHandler}
                                placeholder='Enter full name'
                                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='my-4'>
                            <Label>Email Address</Label>
                            <Input
                                type='email'
                                value={input.email}
                                name='email'
                                onChange={changeEventHandler}
                                placeholder='Enter email'
                                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='my-4'>
                            <Label>Password</Label>
                            <Input
                                type='password'
                                value={input.password}
                                name='password'
                                onChange={changeEventHandler}
                                placeholder='Enter your password'
                                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='my-4'>
                            <Label>Phone Number</Label>
                            <Input
                                type='text'
                                value={input.phoneNumber}
                                name='phoneNumber'
                                onChange={changeEventHandler}
                                placeholder='Enter your Phone Number'
                                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        {/* Radio Group for Role Selection */}
                        <div className='flex items-center gap-2'>
                            <RadioGroup className="flex items-center gap-4 my-4">
                                <div className='flex items-center space-x-2'>
                                    <Input
                                        type='radio'
                                        name='role'
                                        value='student'
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className='cursor-pointer'
                                    />
                                    <Label htmlFor='r1' className='text-gray-700'>Student</Label>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <Input
                                        type='radio'
                                        value='recruiter'
                                        name='role'
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className='cursor-pointer'
                                    />
                                    <Label htmlFor='r2' className='text-gray-700'>Recruiter</Label>
                                </div>
                            </RadioGroup>
                            {/* Upload Profile Picture */}
                            <div className='flex items-center gap-2'>
                                <Label>Upload Profile Picture</Label>
                                <Input
                                    name='file'
                                    onChange={changeFileHandler}
                                    type='file'
                                    accept='image/*'
                                    className='cursor-pointer w-[250px]'
                                />
                            </div>

                        </div>

                        {/* Signup Button */}
                        {loading ? (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="text-center text-white">
                                    <Loader2 className="mr-2 h-10 w-10 animate-spin" />
                                    <p className="mt-2">Please wait...</p>
                                </div>
                            </div>
                        ) : (
                        <Button    
                        type="submit" 
                        className='w-full bg-black text-white rounded-md py-2 border-gray-300'>
                            <span>Sign up</span>
                        </Button>)}
                        {/* Separator */}
                        <div className='text-center text-gray-500 my-4'>- OR -</div>
                        {/* Social Signup Buttons */}
                        <div className='flex justify-center gap-4 mb-5'>
                            <Button className='flex items-center gap-2 border border-gray-300 rounded-full px-6 py-2'>
                                <FcGoogle /> Sign up with Google
                            </Button>
                        </div>
                    </form>

                    <p className='text-center text-gray-500 mt-5'>
                        Already have an account? <Link to='/login' className='text-blue-500 hover:underline'>Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
