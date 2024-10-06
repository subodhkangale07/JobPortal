
import { setAllAdminJobs, setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {headers:{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
      }},{ withCredentials: true });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };  

    // Call the function here (outside of itself)
    fetchAllAdminJobs();
  }, [dispatch]); // Dependency array includes 'dispatch' as it's used inside the hook
};

export default useGetAllAdminJobs;
