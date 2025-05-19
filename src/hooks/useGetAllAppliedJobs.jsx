import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("No authentication token found");
                    return;
                }
                
                console.log("Fetching applied jobs with token:", token ? "Token exists" : "No token");
                
                const response = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                
                console.log("Applied jobs API response:", response.data);
                
                if (response.data && response.data.application) {
                    dispatch(setAllAppliedJobs(response.data.application));
                } else {
                    console.warn("Received response but no application data found:", response.data);
                }
            } catch (error) {
                console.error("Error fetching applied jobs:", error.response?.data || error.message);
                // Optionally dispatch an error action here
            }
        };
        
        fetchAppliedJobs();
    }, [dispatch]);
    
    return null; // You can return something useful here if needed
};

export default useGetAppliedJobs;