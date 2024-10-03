import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className=''>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Safely access allAppliedJobs with optional chaining */}
          {
            !allAppliedJobs?.length ? (
              <span>You haven't applied for any jobs yet.</span>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob?._id}>
                  <TableCell>{appliedJob?.createdAt?.split('T')[0]}</TableCell>
                  <TableCell>{appliedJob?.job?.title}</TableCell>
                  <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                  <TableCell>
                    <Badge className={`${appliedJob?.status === 'rejected' ? 'bg-red-400' : appliedJob?.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                      {appliedJob.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
