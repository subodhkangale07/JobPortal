import axios from 'axios';

export const axiosInstance = axios.create();

export const apiConnector = (method, url, bodyData, headers, params) => {
    // Return Response to Calling Function 
    //console.log("BodyData", bodyData);
    console.log("ApiConnector Header ",headers);
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData || null,  // Corrected from 'body' to 'data'
        headers: headers || null,
        params: params || null,
    });
};
