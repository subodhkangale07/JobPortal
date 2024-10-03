import express from 'express';
import cookieParser from 'cookie-parser'; // to parse cookie from frontend to backend
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
import userRoute from "./route/user.route.js";
import companyRoute from "./route/company.route.js";
import jobRoute from "./route/job.route.js";
import applicationRoute from "./route/application.route.js";


dotenv.config({});
const app = express(); 

app.get("/",(req,res) => {
    return res.status(200).json({
        message:"Im from Backend",
        success:true,
    })
})

// middlewares 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const coresOption = {
    origin: 'http://localhost:5173', // Your frontend origin
    credentials:true
}
app.use(cors(coresOption));

const PORT = process.env.PORT || 3000

//api 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
     connectDb();
    console.log(`App is running on Port no ${PORT}`);
})