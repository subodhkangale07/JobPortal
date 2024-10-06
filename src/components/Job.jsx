import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    };

    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 transition-transform transform hover:scale-105">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className="flex items-center gap-3 my-2">
                <Button className="p-2" variant="outline" size="icon">
                    {job?.company?.logo ? (
                        <Avatar>
                            <AvatarImage src={job.company.logo} alt={`${job.company.name} Logo`} />
                        </Avatar>
                    ) : (
                        <div className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full">
                            <span className="text-gray-500">Logo</span>
                        </div>
                    )}
                </Button>
                <div>
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
                <Badge className="text-blue-700 font-bold" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>

            <div className="flex items-center gap-4 mt-4 flex-wrap">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="hover:bg-gray-100 transition duration-200 flex-grow sm:flex-initial"
                >
                    Details
                </Button>
                <Button className="bg-[#7209b7] text-white hover:bg-[#5b2d8d] transition duration-200 flex-grow sm:flex-initial">
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job;
