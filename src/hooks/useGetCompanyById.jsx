import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant"
import  axios  from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    
    useEffect( () => {
        const fetchSingleCompany = async () => {
            try{
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{headers:{
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }}, {withCredentials:true});
                console.log(res.data.company);
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch(error){
                console.log(error);
            }
        }
        fetchSingleCompany();
    },[companyId,dispatch])
}

export default useGetCompanyById;