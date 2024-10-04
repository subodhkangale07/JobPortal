import { setAllAppliedJobs } from "@/redux/jobSlice";
import { apiConnector } from "@/services/apiConnector";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        //  co
         const cookies = document.cookie;
         console.log("Cookie ", cookies);
         
        const fetchAppliedJosb = async () => {
            try {
                  const url = APPLICATION_API_END_POINT + '/get';
                // const result = await   apiConnector(url,'GET',{

                // })
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                dispatch(setAllAppliedJobs(res.data.application));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJosb();
    },[])
}

export default useGetAppliedJobs