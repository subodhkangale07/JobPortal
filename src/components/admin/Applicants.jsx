import React, { useEffect } from 'react';
import Navbar from '../shared/navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }, { withCredentials: true });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Applicants ({applicants?.applications?.length})
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
