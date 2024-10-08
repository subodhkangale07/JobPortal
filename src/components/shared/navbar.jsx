import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut, User2, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            toast.error(error.response.data.message);
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className='bg-white shadow-md fixed top-0 left-0 w-full z-50'>
            <div className='flex justify-between items-center mx-auto max-w-7xl h-16 px-4'>
                {/* Brand Name */}
                <h1 className='text-2xl font-bold cursor-pointer' onClick={() => navigate('/')}>
                    Job<span className='text-[#F83002]'>Hunt</span>
                </h1>

                {/* Hamburger Menu */}
                <button onClick={toggleMenu} className='md:hidden p-2 rounded focus:outline-none'>
                    <Menu className='text-gray-700' />
                </button>

                {/* Navigation Links and User Actions */}
                <div className={`flex-col md:flex md:flex-row md:items-center md:gap-8 ${isMenuOpen ? 'flex' : 'hidden md:flex'} w-full md:w-auto`}>
                    <ul className='flex flex-col md:flex-row font-medium items-center gap-5'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li className='hover:text-gray-600 cursor-pointer'>
                                    <Link to='/admin/companies'>Companies</Link>
                                </li>
                                <li className='hover:text-gray-600 cursor-pointer'>
                                    <Link to='/admin/jobs'>Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='hover:text-gray-600 cursor-pointer'>
                                    <Link to='/'>Home</Link>
                                </li>
                                <li className='hover:text-gray-600 cursor-pointer'>
                                    <Link to='/jobs'>Jobs</Link>
                                </li>
                                <li className='hover:text-gray-600 cursor-pointer'>
                                    <Link to='/browse'>Browse</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Authenticated/Unauthenticated User Actions */}
                    {!user ? (
                        <div className='flex flex-col md:flex-row gap-3 mt-4 md:mt-0'>
                            <Link to='/login'>
                                <Button className='bg-black text-white hover:bg-gray-800 transition duration-200'>
                                    Login
                                </Button>
                            </Link>
                            <Link to='/signup'>
                                <Button className='bg-black text-white hover:bg-gray-800 transition duration-200'>
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullName} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80 p-4 rounded-lg shadow-lg'>
                                <div className='flex gap-4 items-center'>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullName} />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium text-gray-800'>{user?.fullName}</h4>
                                        <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col text-gray-600 my-4 space-y-2'>
                                    {user && user.role === 'student' && (
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <User2 className='text-gray-600' />
                                            <Link to="/profile">
                                                <Button variant="link" className='text-gray-600 hover:text-gray-800 transition duration-200'>
                                                    View Profile
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                    <div className='flex items-center gap-2 cursor-pointer'>
                                        <LogOut className='text-gray-600' />
                                        <Button onClick={logoutHandler} variant="link" className='text-gray-600 hover:text-gray-800 transition duration-200'>
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
