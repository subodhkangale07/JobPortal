import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut, User2, Menu, X, Bell, Briefcase, Search, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';
import { setSearchedQuery } from '@/redux/jobSlice';

const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Track scroll position to apply styles
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res?.data?.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    };

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
      }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Determine if current path matches the link
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-lg py-4'}`}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center'>
                    {/* Brand Logo */}
                    <div className='flex items-center'>
                        <div 
                            className='flex items-center cursor-pointer' 
                            onClick={() => navigate('/')}
                        >
                            <div className='bg-gradient-to-r from-purple-600 to-red-500 text-white font-bold text-xl p-2 rounded-lg mr-2'>
                                JH
                            </div>
                            <h1 className='text-2xl font-bold'>
                                Job<span className='text-purple-600'>Hunt</span>
                            </h1>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-10'>
                        {user && user.role === 'recruiter' ? (
                            <div className='flex items-center space-x-6'>
                                <Link 
                                    to='/admin/companies' 
                                    className={`font-medium relative ${isActive('/admin/companies') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'} transition-colors duration-200`}
                                >
                                    Companies
                                    {isActive('/admin/companies') && (
                                        <span className='absolute -bottom-1 left-0 h-0.5 w-full bg-purple-600'></span>
                                    )}
                                </Link>
                                <Link 
                                    to='/admin/jobs' 
                                    className={`font-medium relative ${isActive('/admin/jobs') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'} transition-colors duration-200`}
                                >
                                    Jobs
                                    {isActive('/admin/jobs') && (
                                        <span className='absolute -bottom-1 left-0 h-0.5 w-full bg-purple-600'></span>
                                    )}
                                </Link>
                                <Button 
                                    onClick={() => navigate('/admin/jobs/create')}
                                    className='bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105'
                                >
                                    <Briefcase className='h-4 w-4' />
                                    Post Job
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Link 
                                    to='/' 
                                    className={`font-medium relative ${isActive('/') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'} transition-colors duration-200`}
                                >
                                    Home
                                    {isActive('/') && (
                                        <span className='absolute -bottom-1 left-0 h-0.5 w-full bg-purple-600'></span>
                                    )}
                                </Link>
                                <Link 
                                    to='/jobs' 
                                    className={`font-medium relative ${isActive('/jobs') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'} transition-colors duration-200`}
                                >
                                    Jobs
                                    {isActive('/jobs') && (
                                        <span className='absolute -bottom-1 left-0 h-0.5 w-full bg-purple-600'></span>
                                    )}
                                </Link>

                                {/* <Link 
                                    to='/browse' 
                                    className={`font-medium relative ${isActive('/browse') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'} transition-colors duration-200`}
                                >
                                    Browse
                                    {isActive('/browse') && (
                                        <span className='absolute -bottom-1 left-0 h-0.5 w-full bg-purple-600'></span>
                                    )}
                                </Link> */}
                                
                                <Link 
                                to="/salary" 
                                className={`font-medium relative ${isActive('/salary') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'} transition-colors duration-200`}
                                >Salary Calculator
                                </Link>

                            </>
                        )}
                    </div>



                    {/* User Actions */}
                    <div className='flex items-center gap-4'>
                        {!user ? (
                            <div className='hidden md:flex gap-3'>
                                <Link to='/login'>
                                    <Button variant="outline" className='border-purple-600 text-purple-600 hover:bg-purple-50 transition duration-200'>
                                        Login
                                    </Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button className='bg-purple-600 text-white hover:bg-purple-700 transition duration-200'>
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-4">
                                {/* Notifications */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                                            <Bell className="h-5 w-5 text-gray-600" />
                                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-0 rounded-lg shadow-lg">
                                        <div className="p-4 border-b border-gray-100">
                                            <h3 className="font-medium text-gray-800">Notifications</h3>
                                        </div>
                                        <div className="max-h-72 overflow-y-auto">
                                            {[1, 2, 3].map((item) => (
                                                <div key={item} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                                                    <div className="flex gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                            <Briefcase className="h-4 w-4 text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-800">Your application for <span className="font-medium">Frontend Developer</span> has been reviewed</p>
                                                            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-3 text-center border-t border-gray-100">
                                            <Button variant="link" className="text-purple-600 text-sm">View All Notifications</Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                {/* User Menu */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className='cursor-pointer ring-2 ring-purple-100 transition-all duration-200 hover:ring-purple-300'>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullName} />
                                            <AvatarFallback className="bg-purple-600 text-white">{getInitials(user?.fullName)}</AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-80 p-4 rounded-lg shadow-lg'>
                                        <div className='flex gap-4 items-center border-b border-gray-100 pb-4'>
                                            <Avatar className='h-12 w-12'>
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullName} />
                                                <AvatarFallback className="bg-purple-600 text-white">{getInitials(user?.fullName)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium text-gray-800'>{user?.fullName}</h4>
                                                <p className='text-sm text-gray-500'>{user?.email}</p>
                                                <span className='text-xs inline-block mt-1 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium uppercase'>{user?.role}</span>
                                            </div>
                                        </div>
                                        
                                        <div className='flex flex-col my-2 space-y-1'>
                                            {user && user.role === 'student' && (
                                                <>
                                                    <Link to="/profile" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-200">
                                                        <User2 className='h-5 w-5 text-gray-500' />
                                                        <span className="text-gray-700">View Profile</span>
                                                    </Link>
                                                    
                                                </>
                                            )}
                                            <button 
                                                onClick={logoutHandler}
                                                className="flex items-center gap-3 p-2 rounded-md hover:bg-red-50 transition-colors duration-200 text-left"
                                            >
                                                <LogOut className='h-5 w-5 text-red-500' />
                                                <span className="text-red-500">Logout</span>
                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={toggleMenu} 
                            className='md:hidden p-2 rounded-md focus:outline-none hover:bg-gray-100 transition-colors duration-200'
                        >
                            {isMenuOpen ? <X className='h-6 w-6 text-gray-700' /> : <Menu className='h-6 w-6 text-gray-700' />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='md:hidden bg-white border-t border-gray-100 shadow-lg'>
                    <div className='px-4 py-5 space-y-6'>
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="w-full relative">
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        </form>
                        
                        {/* Mobile Navigation Links */}
                        <nav className='flex flex-col space-y-1'>
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <Link 
                                        to='/admin/companies' 
                                        className='px-3 py-3 text-gray-700 rounded-md hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200'
                                    >
                                        Companies
                                    </Link>
                                    <Link 
                                        to='/admin/jobs' 
                                        className='px-3 py-3 text-gray-700 rounded-md hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200'
                                    >
                                        Jobs
                                    </Link>
                                    <Link 
                                        to='/admin/post-job' 
                                        className='px-3 py-3 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors duration-200 font-medium flex items-center gap-2'
                                    >
                                        <Briefcase className='h-4 w-4' />
                                        Post Job
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        to='/' 
                                        className={`px-3 py-3 rounded-md ${isActive('/') ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'} transition-colors duration-200`}
                                    >
                                        Home
                                    </Link>
                                    <Link 
                                        to='/jobs' 
                                        className={`px-3 py-3 rounded-md ${isActive('/jobs') ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'} transition-colors duration-200`}
                                    >
                                        Jobs
                                    </Link>
                                    <Link 
                                        to='/browse' 
                                        className={`px-3 py-3 rounded-md ${isActive('/browse') ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'} transition-colors duration-200`}
                                    >
                                        Browse
                                    </Link>
                                    <div className="px-3 py-3 text-gray-700">
                                        <div className="flex items-center justify-between">
                                            <span>Resources</span>
                                            <ChevronDown className="h-4 w-4" />
                                        </div>
                                        <div className="pl-4 mt-2 space-y-1 border-l-2 border-gray-100">
                                            <Link to="/blog" className="block py-2 text-gray-600 hover:text-purple-600">Blog</Link>
                                            <Link to="/guides" className="block py-2 text-gray-600 hover:text-purple-600">Career Guides</Link>
                                            <Link to="/salary" className="block py-2 text-gray-600 hover:text-purple-600">Salary Calculator</Link>
                                        </div>
                                    </div>
                                </>
                            )}
                        </nav>
                        
                        {/* Mobile Auth Buttons */}
                        {!user ? (
                            <div className='grid grid-cols-2 gap-3 pt-4 border-t border-gray-100'>
                                <Link to='/login' className='w-full'>
                                    <Button variant="outline" className='w-full border-purple-600 text-purple-600 hover:bg-purple-50'>
                                        Login
                                    </Button>
                                </Link>
                                <Link to='/signup' className='w-full'>
                                    <Button className='w-full bg-purple-600 text-white hover:bg-purple-700'>
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className='pt-4 border-t border-gray-100'>
                                <div className='flex items-center gap-3 mb-4'>
                                    <Avatar className='h-10 w-10'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullName} />
                                        <AvatarFallback className="bg-purple-600 text-white">{getInitials(user?.fullName)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium text-gray-800'>{user?.fullName}</h4>
                                        <p className='text-xs text-gray-500'>{user?.email}</p>
                                    </div>
                                </div>
                                
                                <div className='space-y-2'>
                                    {user && user.role === 'student' && (
                                        <>
                                            <Link 
                                                to="/profile" 
                                                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <User2 className='h-5 w-5 text-gray-500' />
                                                <span className="text-gray-700">View Profile</span>
                                            </Link>
                                            <Link 
                                                to="/applications" 
                                                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <Briefcase className='h-5 w-5 text-gray-500' />
                                                <span className="text-gray-700">My Applications</span>
                                            </Link>
                                        </>
                                    )}
                                    <button 
                                        onClick={logoutHandler}
                                        className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-red-50 transition-colors duration-200"
                                    >
                                        <LogOut className='h-5 w-5 text-red-500' />
                                        <span className="text-red-500">Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;