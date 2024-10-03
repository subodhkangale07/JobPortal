import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar';
import { Form, Link, useNavigate } from 'react-router-dom';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FcGoogle } from "react-icons/fc";
import { RadioGroup } from '../ui/radio-group';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {

    const [input, setInput] = useState({
        email: '',
        password: '',
        role: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true)); // Start loading
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            dispatch(setLoading(false)); // Stop loading
        }
    };

    useEffect( () => {
        if(user){
            navigate('/')
        }
    })

    return (
        <div>
            <Navbar />

            {/* Main container */}
            <div className='flex flex-col lg:flex-row justify-center items-center max-w-7xl mx-auto h-full min-h-screen'>
                {/* Left-side Decorative Image and Text */}
                <div className='lg:w-1/2 w-full relative flex flex-col justify-center items-center p-4 h-full'>
                    <div className=' inset-0 flex'>
                        <h2 className='text-2xl text-gray-500 p-4 ml-[60px] rounded-lg mb-1'>
                            Discover Your Dream Job or Hire Top Talent
                        </h2>
                    </div>
                    <img
                        src='./src/assets/login.svg'
                        alt='Decorative 3D Objects'
                        className='w-full h-[400px] object-cover rounded-lg shadow-lg'
                    />
                </div>

                {/* Signup Form Section */}
                <div className='lg:w-1/2 w-full border border-gray-200 rounded-lg shadow-md p-8 bg-white flex flex-col justify-center h-full'>
                    <h1 className='font-bold text-2xl mb-5 text-center text-gray-800'>Login</h1>

                    <form onSubmit={submitHandler} className='w-full'>
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

                        {/* Role Selection */}
                        <div className='flex items-center gap-3'>
                            <Label>Select Role:</Label>
                            <RadioGroup className="flex items-center gap-4 my-5">
                                <div className='flex items-center space-x-2'>
                                    <Input
                                        type='radio'
                                        value='student'
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        name='role'
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
                                    <Label htmlFor='r1' className='text-gray-700'>Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="text-center text-white">
                        <Loader2 className="mr-2 h-10 w-10 animate-spin" />
                        <p className="mt-2">Please wait...</p>
                    </div>
                </div>
            ) : ( 
            <Button
            type="submit" className='w-full bg-black text-white rounded-md py-2 border-gray-300'>
                <span>Login</span>
            </Button>)}

                        {/* <Button type="submit" className='w-full bg-black text-white rounded-md py-2 border-gray-300'>
                            <span>Login</span>
                        </Button> */}

                        <div className='text-center text-gray-500 my-4'>- OR -</div>

                        <div className='flex justify-center mb-5'>
                            <Button className='flex items-center gap-2 border border-gray-300 rounded-full px-6 py-2'>
                                <FcGoogle /> Sign in with Google
                            </Button>
                        </div>
                    </form>

                    <p className='text-center text-gray-500 mt-5'>
                        Don't have an account? <Link to='/signup' className='text-blue-500 hover:underline'>Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;