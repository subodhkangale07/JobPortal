import React, { useState, useEffect } from 'react';
import Navbar from './shared/navbar';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Mail, Phone, Briefcase, FileText, Download, MapPin, Calendar, Edit3, ChevronRight, Award } from 'lucide-react';
import { Badge } from './ui/badge';
// Removed Progress import since it's not available
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialouge';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAllAppliedJobs';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { allAppliedJobs = [] } = useSelector(store => store.job);
    const [scrolled, setScrolled] = useState(false);


    useEffect(() => {
        console.log("Applied Jobs in Redux:", allAppliedJobs);
    }, [allAppliedJobs]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const parseSkills = (skills) => {
        if (!skills) return [];
        
        // If already an array, clean each item
        if (Array.isArray(skills)) {
          return skills.map(skill => {
            if (typeof skill === 'string') {
              // Remove quotes and brackets
              return skill.replace(/[\[\]"]/g, '');
            }
            return skill;
          });
        }
        
        // Try parsing if it's a JSON string
        try {
          const parsed = JSON.parse(skills);
          if (Array.isArray(parsed)) {
            return parsed.map(skill => {
              if (typeof skill === 'string') {
                // Remove quotes and brackets
                return skill.replace(/[\[\]"]/g, '');
              }
              return skill;
            });
          }
          return [parsed];
        } catch (e) {
          // If parsing fails, split by comma and clean
          return skills.split(',')
            .map(s => s.trim().replace(/[\[\]"]/g, ''))
            .filter(Boolean);
        }
      };

    // Get user initials for avatar fallback
    const getInitials = () => {
        if (!user?.fullName) return 'U';
        return user.fullName.split(' ')
            .map(name => name[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    // Mock data for profile completion
    const profileCompletionScore = calculateProfileCompletion(user);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section with Sticky Header Effect */}
            <div className={`sticky top-0 z-10 transition-all duration-300 ${scrolled ? 'py-2 bg-white shadow-md' : 'py-4 bg-transparent'}`}>
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className={`transition-all duration-300 ${scrolled ? 'h-10 w-10' : 'h-14 w-14'} border-2 border-white shadow-lg bg-purple-600`}>
                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullName || 'Profile'} />
                            <AvatarFallback className="text-white font-bold">{getInitials()}</AvatarFallback>
                        </Avatar>
                        <div className="transition-all duration-300">
                            <h1 className={`font-bold ${scrolled ? 'text-lg' : 'text-xl'} text-gray-800`}>
                                {user?.fullName || 'No Name Provided'}
                            </h1>
                            {!scrolled && (
                                <p className="text-gray-500 text-sm">
                                    {user?.email || 'No Email Available'}
                                </p>
                            )}
                        </div>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                        variant="outline"
                        className="border-purple-200 hover:bg-purple-50 text-purple-700"
                    >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                    </Button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Profile Overview */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-md">
                            {/* Cover Image */}
                            <div className="h-32 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>

                            {/* Profile Info */}
                            <div className="px-6 pb-6">
                                <div className="flex justify-center -mt-12">
                                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg bg-purple-600">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullName || 'Profile'} />
                                        <AvatarFallback className="text-white text-xl font-bold">{getInitials()}</AvatarFallback>
                                    </Avatar>
                                </div>

                                <div className="text-center mt-4">
                                    <h2 className="text-xl font-bold text-gray-800">{user?.fullName || 'No Name Provided'}</h2>
                                    <p className="text-gray-500 text-sm mt-1">{user?.profile?.title || 'Professional Title'}</p>

                                    <p className="mt-4 text-gray-600">
                                        {user?.profile?.bio || 'No Bio Available'}
                                    </p>
                                </div>

                                {/* Contact Details */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <Mail className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium text-sm truncate">{user?.email || 'No Email Available'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-green-100 rounded-full">
                                            <Phone className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-medium text-sm">{user?.phoneNumber || 'No Phone Number Available'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-amber-100 rounded-full">
                                            <MapPin className="h-4 w-4 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Location</p>
                                            <p className="font-medium text-sm">{user?.profile?.location || 'No Location Available'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Completion Card */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h3 className="font-bold text-gray-800 mb-4">Profile Completion</h3>

                            <div className="mb-2 flex justify-between items-center">
                                <span className="text-sm text-gray-600">Overall Completion</span>
                                <span className="text-sm font-medium">{profileCompletionScore}%</span>
                            </div>

                            {/* Custom progress bar since Progress component is not available */}
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                                    style={{ width: `${profileCompletionScore}%` }}
                                ></div>
                            </div>

                            <div className="space-y-3 mt-4">
                                <ProfileCompletionItem
                                    title="Basic Info"
                                    completed={!!user?.fullName && !!user?.email}
                                    onClick={() => setOpen(true)}
                                />
                                <ProfileCompletionItem
                                    title="Contact Details"
                                    completed={!!user?.phoneNumber}
                                    onClick={() => setOpen(true)}
                                />
                                <ProfileCompletionItem
                                    title="Skills"
                                    completed={!!(user?.profile?.skills && user.profile.skills.length > 0)}
                                    onClick={() => setOpen(true)}
                                />
                                <ProfileCompletionItem
                                    title="Resume"
                                    completed={!!user?.profile?.resume}
                                    onClick={() => setOpen(true)}
                                />
                            </div>
                        </div>

                        {/* Resume Card */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-purple-600" />
                                Resume
                            </h3>

                            {user?.profile?.resume ? (
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-purple-100 rounded-lg">
                                                <FileText className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800 truncate max-w-[150px]">
                                                    {user.profile.resumeOriginalName || 'Resume.pdf'}
                                                </p>
                                                <p className="text-xs text-gray-500">PDF Document</p>
                                            </div>
                                        </div>

                                        <a
                                            href={user.profile.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                                        >
                                            <Download className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
                                    <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                                    <p className="text-gray-500">No resume uploaded yet</p>
                                    <Button
                                        variant="outline"
                                        className="mt-3 text-purple-600 border-purple-200 hover:bg-purple-50"
                                        onClick={() => setOpen(true)}
                                    >
                                        Upload Resume
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Skills Card */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <Award className="h-5 w-5 text-purple-600" />
                                    Professional Skills
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                    onClick={() => setOpen(true)}
                                >
                                    <Edit3 className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {user?.profile?.skills ? (
                                    parseSkills(user.profile.skills).map((skill, index) => (
                                        <Badge
                                            key={index}
                                            className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 hover:from-purple-200 hover:to-blue-200 px-3 py-1 rounded-full"
                                        >
                                            {skill}
                                        </Badge>
                                    ))
                                ) : (
                                    <div className="text-center w-full p-6 border-2 border-dashed border-gray-200 rounded-lg">
                                        <Award className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                                        <p className="text-gray-500">No skills added yet</p>
                                        <Button
                                            variant="outline"
                                            className="mt-3 text-purple-600 border-purple-200 hover:bg-purple-50"
                                            onClick={() => setOpen(true)}
                                        >
                                            Add Skills
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Applied Jobs Section */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                                        <Briefcase className="h-5 w-5 text-purple-600" />
                                        Applied Jobs
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">
                                        You have applied to {allAppliedJobs.length} job{allAppliedJobs.length !== 1 ? 's' : ''}
                                    </p>
                                </div>

                                {allAppliedJobs.length > 0 && (
                                    <div className="flex gap-2">
                                        <Badge className="bg-green-100 text-green-700">{getActiveApplicationsCount(allAppliedJobs)} Active</Badge>
                                        <Badge className="bg-amber-100 text-amber-700">{getPendingApplicationsCount(allAppliedJobs)} Pending</Badge>
                                    </div>
                                )}
                            </div>

                            {allAppliedJobs.length > 0 ? (
                                <div className="overflow-hidden rounded-lg border border-gray-100">
                                    <AppliedJobTable />
                                </div>
                            ) : (
                                <div className="text-center p-10 border-2 border-dashed border-gray-200 rounded-lg">
                                    <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                    <h4 className="text-lg font-medium text-gray-700">No applications yet</h4>
                                    <p className="text-gray-500 mt-1 mb-4">Start applying to jobs to see your applications here.</p>
                                    <Button className="bg-purple-600 hover:bg-purple-700">
                                        Find Jobs
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Activity Timeline Card */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-purple-600" />
                                Recent Activity
                            </h3>

                            {allAppliedJobs.length > 0 ? (
                                <div className="space-y-4 mt-2">
                                    {allAppliedJobs.slice(0, 3).map((job, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <Briefcase className="h-5 w-5 text-purple-600" />
                                                </div>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="text-sm font-medium text-gray-800">
                                                    Applied for <span className="text-purple-600">{job.job?.title}</span>
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {formatDate(job.appliedDate || job.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm italic">No recent activity</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

// Helper Components
const ProfileCompletionItem = ({ title, completed, onClick }) => (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={onClick}>
        <div className="flex items-center gap-2">
            <div className={`h-4 w-4 rounded-full ${completed ? 'bg-green-500' : 'bg-gray-200'}`} />
            <span className="text-sm text-gray-700">{title}</span>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-400" />
    </div>
);

// Helper Functions
function calculateProfileCompletion(user) {
    if (!user) return 0;

    const fields = [
        !!user.fullName,
        !!user.email,
        !!user.phoneNumber,
        !!(user.profile?.bio),
        !!(user.profile?.skills && user.profile.skills.length > 0),
        !!(user.profile?.resume),
        !!(user.profile?.location),
        !!(user.profile?.profilePhoto),
    ];

    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
}

function getActiveApplicationsCount(applications) {
    return applications.filter(app => app.status === 'active' || app.status === 'shortlisted').length;
}

function getPendingApplicationsCount(applications) {
    return applications.filter(app => app.status === 'pending' || app.status === 'reviewing').length;
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default Profile;