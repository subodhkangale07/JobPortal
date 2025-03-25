import express from 'express';
import cookieParser from 'cookie-parser'; // To parse cookies from frontend to backend
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './utils/db.js'; // Database connection
import userRoute from './route/user.route.js';
import companyRoute from './route/company.route.js';
import jobRoute from './route/job.route.js';
import applicationRoute from './route/application.route.js';
import fileUpload from 'express-fileupload'; // For handling file uploads
import bodyParser  from 'body-parser';
import multer   from 'multer';//

dotenv.config({}); // Load environment variables

const app = express();

// Route for testing if server is running
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "I'm from Backend",
        success: true,
    });
});

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies
app.use(bodyParser.json({
  type: ["application/x-www-form-urlencoded", "application/json"], // Support json encoded bodies
}));


// File upload middleware with temp file storage
app.use(fileUpload({
    useTempFiles : true,
    // This Tmp means On Your Local machine file be stored at that directory and will automatically Get Deleted
    tempFileDir : '/tmp/',
}));

// CORS configuration to allow all origins
const allowedOrigins = [
    'http://localhost:5173',
    'https://job-hunt-vert.vercel.app',
    'https://job-portal-three-omega.vercel.app/',
    'https://job-portal-three-omega.vercel.app/jobs'
];

const corsOptions = {
    origin: true, // Allow all origins
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
 // Use the CORS middleware with defined options

// API routes
app.use("/api/v1/user", userRoute); // User-related routes
app.use("/api/v1/company", companyRoute); // Company-related routes
app.use("/api/v1/job", jobRoute); // Job-related routes
app.use("/api/v1/application", applicationRoute); // Application-related routes

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error details
    res.status(500).json({
        message: 'An internal server error occurred',
        success: false,
        error: err.message,
    });
});

// Listen on the specified PORT
const PORT = process.env.PORT || 3000;

// Start the server after connecting to the database
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`App is running on Port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to the database', err);
});
