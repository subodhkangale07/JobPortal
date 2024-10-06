import React, { useState } from 'react';
import Navbar from './shared/navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialouge';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAllAppliedJobs';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl mt-20 p-8'>
                <div className='flex justify-between '>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-[100px] w-[100px]">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullName || 'No Name Provided'}</h1>
                            <p>{user?.profile?.bio || 'No Bio Available'}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                        <Pen />
                    </Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email || 'No Email Available'}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber || 'No Phone Number Available'}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-bold'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills && user?.profile?.skills.length > 0
                                ? user.profile.skills.map((skill, index) => <Badge key={index}>{skill}</Badge>)
                                : <span className='text-gray-500'>No Skills Available</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        user?.profile?.resume 
                            ? <a target='_blank' rel='noopener noreferrer' href={user.profile.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user.profile.resumeOriginalName || 'Resume.pdf'}</a> 
                            : <span className='text-gray-500'>No Resume Available</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
