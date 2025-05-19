import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2, EyeIcon, EyeOffIcon, Upload, Check } from 'lucide-react';
import signUpImg from '../../assets/signUp.jpg';

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
    const [showPassword, setShowPassword] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [fileName, setFileName] = useState('');
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        if (e.target.files?.[0]) {
            setInput({ ...input, file: e.target.files[0] });
            setFileName(e.target.files[0].name);
            setIsUploaded(true);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const validateForm = () => {
        if (!input.fullName) {
            toast.error("Please enter your full name");
            return false;
        }
        if (!input.email) {
            toast.error("Please enter your email");
            return false;
        }
        if (!input.password) {
            toast.error("Please enter a password");
            return false;
        }
        if (!input.phoneNumber) {
            toast.error("Please enter your phone number");
            return false;
        }
        if (!input.role) {
            toast.error("Please select a role");
            return false;
        }
        return true;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left Column - Image and Text */}
                        <div className="lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-600/90 mix-blend-multiply"></div>
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 z-10">
                                <h2 className="text-3xl font-bold mb-6 max-w-md text-center">Start Your Journey Today</h2>
                                <p className="text-lg mb-8 max-w-md text-center">Create your account to unlock a world of opportunities and connections.</p>
                                
                                <div className="space-y-4 max-w-md">
                                    <div className="flex items-center bg-white/10 p-4 rounded-lg">
                                        <div className="mr-4 bg-white/20 p-2 rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Personalized Job Matches</h3>
                                            <p className="text-sm text-white/80">Get recommendations tailored to your skills</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center bg-white/10 p-4 rounded-lg">
                                        <div className="mr-4 bg-white/20 p-2 rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Secure Profile</h3>
                                            <p className="text-sm text-white/80">Your data is always protected</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center bg-white/10 p-4 rounded-lg">
                                        <div className="mr-4 bg-white/20 p-2 rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Real-time Notifications</h3>
                                            <p className="text-sm text-white/80">Never miss an opportunity</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Signup Form */}
                        <div className="lg:w-1/2 p-8 lg:p-12">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
                                <p className="mt-2 text-gray-600">Join our community of professionals</p>
                            </div>

                            <form onSubmit={submitHandler} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            value={input.fullName}
                                            onChange={changeEventHandler}
                                            placeholder="John Doe"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</Label>
                                        <Input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            value={input.phoneNumber}
                                            onChange={changeEventHandler}
                                            placeholder="+1 (555) 123-4567"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        placeholder="you@example.com"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                                    <div className="mt-1 relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={input.password}
                                            onChange={changeEventHandler}
                                            placeholder="••••••••"
                                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon className="h-5 w-5" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">Password should be at least 8 characters</p>
                                </div>

                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">I am a:</Label>
                                    <RadioGroup 
                                        className="flex gap-6" 
                                        defaultValue={input.role} 
                                        name="role" 
                                        onValueChange={(value) => setInput({...input, role: value})}
                                    >
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="student" id="student" />
                                            <Label htmlFor="student" className="text-gray-700 cursor-pointer">Student</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="recruiter" id="recruiter" />
                                            <Label htmlFor="recruiter" className="text-gray-700 cursor-pointer">Recruiter</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</Label>
                                    <div className="mt-1 flex items-center">
                                        <div className="relative w-full">
                                            <Input
                                                id="profilePicture"
                                                name="file"
                                                type="file"
                                                accept="image/*"
                                                onChange={changeFileHandler}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className={`flex items-center justify-between px-4 py-2 border ${isUploaded ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-md`}>
                                                <div className="flex items-center space-x-2">
                                                    {isUploaded ? <Check className="h-5 w-5 text-green-500" /> : <Upload className="h-5 w-5 text-gray-400" />}
                                                    <span className="text-sm text-gray-600 truncate max-w-xs">
                                                        {fileName || "Choose a file..."}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    {isUploaded ? "Uploaded" : "JPG, PNG, GIF up to 10MB"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </Button>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <Button
                                        type="button"
                                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <FcGoogle className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        type="button"
                                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <FaGithub className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        type="button"
                                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <FaLinkedin className="h-5 w-5 text-blue-600" />
                                    </Button>
                                </div>

                                <p className="text-center text-sm text-gray-600 mt-6">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                                        Sign in instead
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center">
                        <Loader2 className="h-10 w-10 text-purple-600 animate-spin" />
                        <p className="mt-3 text-gray-700">Creating your account...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;