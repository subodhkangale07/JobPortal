import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../shared/navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2, EyeIcon, EyeOffIcon } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loginTimeout, setLoginTimeout] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        // Clear any error message when user starts typing again
        if (errorMessage) setErrorMessage('');
    };

    // Clear loading state and any pending timeouts
    const clearLoadingState = () => {
        dispatch(setLoading(false));
        setLoginTimeout(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };
    useEffect(() => {
        return () => clearLoadingState(); // Clear timeout on unmount
      }, []);
      
    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Validate form inputs
        if(!input.email || !input.password || !input.role) {
            toast.error("Please fill all required fields");
            return;
        }

        // Reset states
        setLoginTimeout(false);
        setErrorMessage('');
        clearLoadingState();
        
        try {
            dispatch(setLoading(true));
            
            // Set a timeout for 30 seconds (a more reasonable timeout period)
            timeoutRef.current = setTimeout(() => {
                setLoginTimeout(true);
                dispatch(setLoading(false));
                toast.error("Login is taking longer than expected. Please try again later.");
            }, 30000); // 30 seconds timeout instead of 3 seconds
            
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                clearLoadingState();
                dispatch(setUser(res.data.user));
                localStorage.setItem("token", res.data.user.token);
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            clearLoadingState();
            console.error("Login error:", error);
            
            // Set specific error message based on response
            if (error.response) {
                setErrorMessage(error.response.data.message || "Login failed. Please check your credentials.");
                toast.error(error.response.data.message || "Login failed");
            } else if (error.request) {
                setErrorMessage("No response from server. Please check your internet connection.");
                toast.error("No response from server");
            } else {
                setErrorMessage("An unexpected error occurred.");
                toast.error("Something went wrong!");
            }
        }
    };

    // Cleanup timeouts when component unmounts
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if(user) {
            navigate('/')
        }
    }, [user, navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to handle retry after timeout
    const handleRetry = () => {
        setLoginTimeout(false);
        setErrorMessage('');
        toast.info("You can try logging in again now");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-3">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left Column - Image and Text */}
                        <div className="lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 mix-blend-multiply"></div>
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 z-10">
                                <h2 className="text-3xl font-bold mb-6 max-w-md text-center">Connect to Your Career Future</h2>
                                <p className="text-lg mb-8 max-w-md text-center">Find your dream job or discover top talent for your company in one place.</p>
                                <div className="space-y-4 max-w-md">
                                    <div className="flex items-center bg-white/10 p-4 rounded-lg">
                                        <div className="mr-4 bg-white/20 p-2 rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">For Job Seekers</h3>
                                            <p className="text-sm text-white/80">Access thousands of job opportunities</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center bg-white/10 p-4 rounded-lg">
                                        <div className="mr-4 bg-white/20 p-2 rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">For Recruiters</h3>
                                            <p className="text-sm text-white/80">Find qualified candidates quickly</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img
                                className="absolute inset-0 h-full w-full object-cover opacity-30"
                                src="https://images.unsplash.com/photo-1573164574472-797cdf4a583a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                                alt="People working together"
                            />
                        </div>

                        {/* Right Column - Login Form */}
                        <div className="lg:w-1/2 p-8 lg:p-12">
                            <div className="max-w-md mx-auto">
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                                    <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
                                </div>

                                {errorMessage && (
                                    <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                                        {errorMessage}
                                    </div>
                                )}

                                <form onSubmit={submitHandler} className="space-y-6">
                                    <div>
                                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</Label>
                                        <div className="mt-1">
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={input.email}
                                                onChange={changeEventHandler}
                                                placeholder="you@example.com"
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
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
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                                        <div className="text-right mt-1">
                                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="block text-sm font-medium text-gray-700 mb-2">I am a:</Label>
                                        <RadioGroup className="flex gap-6" value={input.role} name="role" onValueChange={(value) => setInput({...input, role: value})}>
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

                                    <Button
                                        type="submit"
                                        disabled={loading || loginTimeout}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Signing in...
                                            </>
                                        ) : loginTimeout ? (
                                            "Login Timed Out"
                                        ) : (
                                            "Sign in"
                                        )}
                                    </Button>
                                    
                                    {loginTimeout && (
                                        <div className="text-center">
                                            <p className="text-sm text-red-600 mb-2">
                                                Login took too long to complete.
                                            </p>
                                            <Button 
                                                type="button"
                                                onClick={handleRetry}
                                                variant="outline"
                                                className="text-sm"
                                            >
                                                Try again
                                            </Button>
                                        </div>
                                    )}
                                </form>

                                <div className="mt-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-3 gap-3">
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
                                </div>

                                <div className="mt-8 text-center">
                                    <p className="text-sm text-gray-600">
                                        Don't have an account?{' '}
                                        <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                                            Sign up
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center">
                        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
                        <p className="mt-3 text-gray-700">Logging you in...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;