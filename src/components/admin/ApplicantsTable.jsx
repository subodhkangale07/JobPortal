import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const shortListedStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const token = localStorage.getItem('token');
  const { applicants } = useSelector(store => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}`, { status }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      }, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white overflow-x-auto">
      <Table>
        <TableCaption>A list of your recently applied users</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            applicants && applicants?.applications?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullName}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume
                    ? <a className="text-teal-600 underline" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                        {item?.applicant?.profile?.resumeOriginalName}
                      </a>
                    : <span>NA</span>}
                </TableCell>
                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="text-gray-500" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      {
                        shortListedStatus.map((status, index) => (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <span className="text-gray-700">{status}</span>
                          </div>
                        ))
                      }
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
