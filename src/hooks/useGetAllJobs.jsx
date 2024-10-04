import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const {searchedQuery} = useSelector(store => store.job)
  useEffect(() => {
     const token = localStorage.getItem('token');
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {headers:{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
      }},{ withCredentials: true });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };  

    // Call the function here (outside of itself)
    fetchAllJobs();
  }, [dispatch]); // Dependency array includes 'dispatch' as it's used inside the hook
};

export default useGetAllJobs;