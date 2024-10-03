import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';
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

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        }
    }
    return (
        <div className='bg-white shadow-md top-0 left-0 w-full z-50'>
            <div className='flex justify-between items-center mx-auto max-w-7xl h-16 px-4'>
                {/* <!-- Brand Name --> */}
                <div>
                    <h1 className='text-2xl font-bold'>
                        Job<span className='text-[#F83002]'>Hunt</span>
                    </h1>
                </div>

                {/* <!-- Navigation Links and User Actions --> */}
                <div className='flex gap-12 items-center'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='hover:text-gray-600 cursor-pointer'> <Link to={'/admin/companies'}>Companies</Link></li>
                                    <li className='hover:text-gray-600 cursor-pointer'><Link to={'/admin/jobs'}>Jobs</Link></li>
                                </>
                            ) :
                                <>
                                    <li className='hover:text-gray-600 cursor-pointer'> <Link to={'/'}>Home</Link></li>
                                    <li className='hover:text-gray-600 cursor-pointer'><Link to={'/jobs'}>Jobs</Link></li>
                                    <li className='hover:text-gray-600 cursor-pointer'><Link to={'/browse'}>Browse</Link></li>
                                </>
                        }

                    </ul>

                    {/* Conditional Rendering for Authenticated/Unauthenticated User */}
                    {
                        !user ? (
                            <div className='flex gap-3'>
                                <Link to='/login'>
                                    <Button className='bg-black text-white border-gray-300'>
                                        Login
                                    </Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button className='bg-black text-white border-gray-300'>
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80'>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullName}</h4>
                                            <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col text-gray-600 my-2'>

                                        {
                                            user && user.role === 'student' &&(
                                            <div className='flex items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant="link" className='text-gray-600 hover:text-gray-800'>
                                                    <Link to={"/profile"}>View Profile</Link>
                                                </Button>
                                                </div>
                                                )
                                           
                                        }


                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <LogOut className='text-gray-600' />
                                            <Button onClick={logoutHandler} variant="link" className='text-gray-600 hover:text-gray-800'>
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default Navbar